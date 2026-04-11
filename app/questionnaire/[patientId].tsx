import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView, TextInput, Linking, ActivityIndicator } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import * as Sharing from "expo-sharing";
import { File, Paths } from "expo-file-system/next";
import AppText from "@/components/appText.component";
import ButtonComponent from "@/components/button.component";
import { NotificationType } from "@/components/notification.component";
import colors from "@/constants/colors";
import { AppContext } from "@/context/appContext";
import QuestionnaireAPI from "@/services/questionnaire";
import { Question, QuestionType } from "@/domain/question";
import FullScreenLoading from "@/components/fullScreenLoading.component";
import Container from "@/components/container.component";
import PatientAPI from "@/services/patient";

export default function QuestionnaireScreen() {
    const { patientId } = useLocalSearchParams();
    const router = useRouter();
    const appContext = useContext(AppContext);

    const [loading, setLoading] = useState<boolean>(true);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [question, setQuestion] = useState<Question | null>(null);


    const [selectedOptionIds, setSelectedOptionIds] = useState<number[]>([]);
    const [textAnswer, setTextAnswer] = useState<string>("");
    const [questionnaireId, setQuestionnaireId] = useState<number | null>(null);
    const [pdfLoading, setPdfLoading] = useState<boolean>(false);

    const [isFinished, setIsFinished] = useState<boolean>(false);

    useEffect(() => {
        appContext.handleShowHeaderComponent(false, undefined);
        fetchInitialState();
    }, []);

    const fetchInitialState = async () => {
        try {
            setLoading(true);
            const { data: progressInfo } = await QuestionnaireAPI.getQuestionnaireProgress({
                questionnaireType: "jawAssessment",
                patientId: Number(patientId),
            });

            if (!progressInfo) {
                throw new Error("Não foi possível obter o progresso do questionário.");
            }

            let nextQuestionPayload = {
                questionnaireType: "jawAssessment",
                patientId: Number(patientId),
            };

            if (!progressInfo.isBeggining) {
                nextQuestionPayload = {
                    ...nextQuestionPayload,
                    questionId: progressInfo.questionId,
                    questionOptionsIds: progressInfo.questionOptionsIds,
                } as any;
            }

            const { data: questionData } = await QuestionnaireAPI.nextQuestion(nextQuestionPayload);

            if (questionData === null) {
                try {
                    const patientResponse = await PatientAPI.findById(Number(patientId));
                    if (patientResponse.data && patientResponse.data.questionnaireResponses) {
                        const lastResponse = patientResponse.data.questionnaireResponses[patientResponse.data.questionnaireResponses.length - 1];
                        if (lastResponse) {
                            setQuestionnaireId(lastResponse.id);
                        }
                    }
                } catch (e) {
                    setQuestionnaireId(progressInfo.questionnaireId || null);
                }
                setIsFinished(true);
            } else {
                setQuestionnaireId(progressInfo.questionnaireId || null);
                setQuestion(questionData);
                if (questionData.order === 1 && questionData.group?.order === 3 && questionData.options?.length > 0) {
                    setSelectedOptionIds([questionData.options[0].id]);
                } else if (questionData.order === 0 && questionData.group?.order === 5 && questionData.options?.length > 0) {
                    setSelectedOptionIds([questionData.options[0].id]);
                }
            }

        } catch (error: any) {
            appContext.handleSetNotification(NotificationType.Error, error.message || "Erro ao carregar questionário");
        } finally {
            setLoading(false);
        }
    };

    const handleNext = async () => {
        if (!question) return;

        if (
            (question.type === QuestionType.SINGLE_CHOICE || question.type === QuestionType.MULTIPLE_CHOICE) &&
            question.isRequired &&
            selectedOptionIds.length === 0
        ) {
            appContext.handleSetNotification(NotificationType.Warning, "Por favor, selecione uma opção.");
            return;
        }

        try {
            setSubmitting(true);

            const payload = {
                questionnaireType: "jawAssessment",
                patientId: Number(patientId),
                questionId: question.id,
                questionOptionsIds: selectedOptionIds
            };

            const response = await QuestionnaireAPI.nextQuestion(payload);

            if (response.data === null) {
                setQuestion(null);

                try {
                    const patientResponse = await PatientAPI.findById(Number(patientId));
                    if (patientResponse.data && patientResponse.data.questionnaireResponses) {
                        const lastResponse = patientResponse.data.questionnaireResponses[patientResponse.data.questionnaireResponses.length - 1];
                        if (lastResponse) {
                            setQuestionnaireId(lastResponse.id);
                        }
                    }
                } catch (e) {
                    const { data: progressInfo } = await QuestionnaireAPI.getQuestionnaireProgress({
                        questionnaireType: "jawAssessment",
                        patientId: Number(patientId),
                    });
                    setQuestionnaireId(progressInfo.questionnaireId || null);
                }

                setIsFinished(true);
            } else {
                setQuestion(response.data);
                if (response.data.order === 0 && response.data.group?.order === 5 && response.data.options?.length > 0) {
                    setSelectedOptionIds([response.data.options[0].id]);
                } else if (response.data.order === 1 && response.data.group?.order === 3 && response.data.options?.length > 0) {
                    setSelectedOptionIds([response.data.options[0].id]);
                } else {
                    setSelectedOptionIds([]);
                }
                setTextAnswer("");
            }
        } catch (error: any) {
            appContext.handleSetNotification(NotificationType.Error, error.message || "Erro ao enviar resposta");
        } finally {
            setSubmitting(false);
        }
    };

    const handleGeneratePdf = async () => {
        if (!questionnaireId) {
            appContext.handleSetNotification(NotificationType.Warning, "ID da avaliação não encontrado.");
            return;
        }

        try {
            setPdfLoading(true);
            const blob = await QuestionnaireAPI.generatePdf(questionnaireId);

            const base64Data = await new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const dataUrl = reader.result as string;
                    const base64 = dataUrl.split(',')[1];
                    resolve(base64);
                };
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });

            const pdfFile = new File(Paths.cache, `avaliacao_${questionnaireId}.pdf`);
            const binaryString = atob(base64Data);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            pdfFile.write(bytes);

            await Sharing.shareAsync(pdfFile.uri, {
                mimeType: 'application/pdf',
                dialogTitle: `Avaliação #${questionnaireId}`,
                UTI: 'com.adobe.pdf',
            });
        } catch (error: any) {
            appContext.handleSetNotification(
                NotificationType.Error,
                error.message || "Erro ao gerar PDF"
            );
        } finally {
            setPdfLoading(false);
        }
    };

    const toggleOption = (optionId: number) => {
        if (!question) return;

        if (
            (question.order === 1 && question.group?.order === 3) ||
            (question.order === 0 && question.group?.order === 5)
        ) {
            if (question.options && question.options.length > 0) {
                if (question.type === QuestionType.SINGLE_CHOICE) {
                    return;
                }
                if (optionId === question.options[0].id) {
                    return;
                }
            }
        }

        if (question.type === QuestionType.SINGLE_CHOICE) {
            setSelectedOptionIds([optionId]);
        } else if (question.type === QuestionType.MULTIPLE_CHOICE) {
            if (selectedOptionIds.includes(optionId)) {
                setSelectedOptionIds(selectedOptionIds.filter(id => id !== optionId));
            } else {
                setSelectedOptionIds([...selectedOptionIds, optionId]);
            }
        }
    };

    if (loading) {
        return (
            <Container>
                <FullScreenLoading />
            </Container>
        );
    }

    if (isFinished) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <AntDesign name="left" color={colors.mainBlack} size={24} />
                    </TouchableOpacity>
                    <AppText content="Avaliação" textProps={{ style: styles.headerTitle }} />
                    <View style={{ width: 24 }} />
                </View>

                <View style={styles.finishedContainer}>
                    <AntDesign name="check-circle" size={64} color={colors.successBlue} style={{ marginBottom: 20 }} />
                    <AppText
                        content="Questionário Finalizado"
                        textProps={{ style: { fontSize: 22, fontWeight: "bold", color: colors.darkBlue, marginBottom: 10 } }}
                    />
                    <AppText
                        content="A avaliação deste paciente foi concluída com sucesso."
                        textProps={{ style: { fontSize: 16, color: colors.mainGray, textAlign: 'center', marginBottom: 40 } }}
                    />

                    <View style={styles.finishedButtonsContainer}>
                        <ButtonComponent
                            onPress={handleGeneratePdf}
                            disabled={pdfLoading}
                            style={[styles.primaryFinishedButton, { opacity: pdfLoading ? 0.7 : 1 }]}
                        >
                            {pdfLoading ? (
                                <ActivityIndicator color={colors.mainWhite} />
                            ) : (
                                <>
                                    <Feather name="share" size={20} color={colors.mainWhite} />
                                    <AppText content="Gerar & Compartilhar PDF" textProps={{ style: styles.primaryButtonText }} />
                                </>
                            )}
                        </ButtonComponent>

                        <ButtonComponent
                            onPress={() => router.back()}
                            style={{ backgroundColor: colors.successBlue, width: '100%', borderRadius: 12, height: 50, justifyContent: 'center' }}
                        >
                            <AppText content="Voltar para Detalhes" textProps={{ style: { color: colors.mainWhite, fontWeight: "bold", textAlign: 'center' } }} />
                        </ButtonComponent>

                        <ButtonComponent
                            onPress={() => Linking.openURL("https://educapes.capes.gov.br/handle/capes/1174314")}
                            style={{ backgroundColor: colors.darkBlue, width: '100%', borderRadius: 12, height: 50, justifyContent: 'center' }}
                        >
                            <AppText content="Acessar E-book Guia" textProps={{ style: { color: colors.mainWhite, fontWeight: "bold", textAlign: 'center' } }} />
                        </ButtonComponent>
                    </View>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <AntDesign name="left" color={colors.mainBlack} size={24} />
                </TouchableOpacity>
                <AppText content="Avaliação" textProps={{ style: styles.headerTitle }} />
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {question && (
                    <View style={styles.questionCard}>
                        <AppText
                            content={question.text}
                            textProps={{ style: styles.questionText }}
                        />

                        {question.helpText ? (
                            <AppText
                                content={question.helpText}
                                textProps={{ style: styles.helpText }}
                            />
                        ) : null}

                        <View style={styles.optionsContainer}>
                            {(question.type === QuestionType.SINGLE_CHOICE || question.type === QuestionType.MULTIPLE_CHOICE) &&
                                question.options && question.options.map(option => {
                                    const isSelected = selectedOptionIds.includes(option.id);
                                    return (
                                        <TouchableOpacity
                                            key={option.id}
                                            style={[
                                                styles.optionButton,
                                                isSelected && styles.optionButtonSelected
                                            ]}
                                            onPress={() => toggleOption(option.id)}
                                            activeOpacity={0.7}
                                        >
                                            <View style={[
                                                styles.radioOuter,
                                                question.type === QuestionType.MULTIPLE_CHOICE && styles.checkboxOuter,
                                                isSelected && styles.radioOuterSelected
                                            ]}>
                                                {isSelected && (
                                                    <View style={[
                                                        styles.radioInner,
                                                        question.type === QuestionType.MULTIPLE_CHOICE && styles.checkboxInner
                                                    ]} />
                                                )}
                                            </View>
                                            <AppText
                                                content={option.text}
                                                textProps={{
                                                    style: [
                                                        styles.optionText,
                                                        isSelected && styles.optionTextSelected
                                                    ]
                                                }}
                                            />
                                        </TouchableOpacity>
                                    );
                                })}

                            {(question.type === QuestionType.TEXT || question.type === QuestionType.NUMBER) && (
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Digite sua resposta..."
                                    value={textAnswer}
                                    onChangeText={setTextAnswer}
                                    keyboardType={question.type === QuestionType.NUMBER ? "numeric" : "default"}
                                />
                            )}
                        </View>
                    </View>
                )}
            </ScrollView>

            <View style={styles.footer}>
                <ButtonComponent
                    onPress={handleNext}
                    disabled={submitting}
                    style={{ backgroundColor: colors.successBlue, borderRadius: 8, opacity: submitting ? 0.7 : 1 }}
                >
                    <AppText
                        content={submitting ? "Carregando..." : "Próxima Pergunta"}
                        textProps={{ style: { color: colors.mainWhite, fontWeight: "bold", fontSize: 16 } }}
                    />
                </ButtonComponent>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.transparentWhite,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
        backgroundColor: colors.mainWhite,
        borderBottomWidth: 1,
        borderBottomColor: colors.darkerGray,
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.darkBlue,
    },
    content: {
        padding: 20,
        paddingBottom: 40,
    },
    questionCard: {
        backgroundColor: colors.mainWhite,
        borderRadius: 12,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 20,
    },
    questionText: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.darkBlue,
        marginBottom: 8,
    },
    helpText: {
        fontSize: 14,
        color: colors.mainGray,
        marginBottom: 20,
    },
    optionsContainer: {
        marginTop: 10,
        gap: 12,
    },
    optionButton: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.darkerGray,
        backgroundColor: colors.mainWhite,
    },
    optionButtonSelected: {
        borderColor: colors.successBlue,
        backgroundColor: "#EAF2FF",
    },
    optionText: {
        fontSize: 16,
        color: colors.mainBlack,
        marginLeft: 12,
        flex: 1,
    },
    optionTextSelected: {
        fontWeight: "bold",
        color: colors.darkBlue,
    },
    radioOuter: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.mainGray,
        justifyContent: "center",
        alignItems: "center",
    },
    checkboxOuter: {
        borderRadius: 4,
    },
    radioOuterSelected: {
        borderColor: colors.successBlue,
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: colors.successBlue,
    },
    checkboxInner: {
        borderRadius: 2,
    },
    textInput: {
        borderWidth: 1,
        borderColor: colors.darkerGray,
        borderRadius: 8,
        padding: 16,
        fontSize: 16,
        backgroundColor: colors.mainWhite,
        minHeight: 100,
        textAlignVertical: "top",
    },
    footer: {
        padding: 20,
        paddingBottom: 40,
        backgroundColor: colors.mainWhite,
        borderTopWidth: 1,
        borderTopColor: colors.darkerGray,
    },
    finishedContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 30,
    },
    finishedButtonsContainer: {
        width: "100%",
        gap: 15,
    },
    primaryFinishedButton: {
        backgroundColor: colors.successBlue,
        width: "100%",
        borderRadius: 12,
        height: 56,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        elevation: 4,
        shadowColor: colors.successBlue,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    primaryButtonText: {
        color: colors.mainWhite,
        fontWeight: "bold",
        fontSize: 18,
    }
});
