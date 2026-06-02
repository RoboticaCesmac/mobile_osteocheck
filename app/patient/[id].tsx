import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useContext, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator } from "react-native";
import { AntDesign, Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { File, Paths } from "expo-file-system/next";
import * as Sharing from "expo-sharing";
import AppText from "@/components/appText.component";
import AvatarComponent from "@/components/avatar.component";
import ButtonComponent from "@/components/button.component";
import { NotificationType } from "@/components/notification.component";
import colors from "@/constants/colors";
import textSize from "@/constants/textSize";
import { AppContext } from "@/context/appContext";
import { Patient } from "@/domain/patient";
import PatientAPI from "@/services/patient";
import QuestionnaireAPI from "@/services/questionnaire";
import osteocheckBlueBgLogo from "@/assets/images/osteocheck-blue-bg-logo.png";
import FullScreenLoading from "@/components/fullScreenLoading.component";
import Container from "@/components/container.component";
import { translateQuestionnaireResponseStatus } from "@/helper/translateQuestionnaireResponseStatus";

function getInitials(name: string): string {
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

function formatDate(date: string | Date): string {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
}

export default function PatientDetailsScreen() {
    const [patient, setPatient] = useState<Patient | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [pdfLoading, setPdfLoading] = useState<number | null>(null);

    const { id } = useLocalSearchParams();
    const router = useRouter();
    const appContext = useContext(AppContext);

    useFocusEffect(
        useCallback(() => {
            appContext.handleShowHeaderComponent(false, undefined);
            if (id) {
                fetchPatient();
            }
        }, [id])
    );

    const fetchPatient = async () => {
        try {
            setLoading(true);
            const response = await PatientAPI.findById(Number(id));
            if (response && response.data) {
                setPatient(response.data);
            } else {
                appContext.handleSetNotification(NotificationType.Error, "Paciente não encontrado");
            }
        } catch (error: any) {
            appContext.handleSetNotification(NotificationType.Error, error.message || "Erro ao buscar paciente");
        } finally {
            setLoading(false);
        }
    };

    const handlePdf = async (responseId: number) => {
        try {
            setPdfLoading(responseId);
            const blob = await QuestionnaireAPI.generatePdf(responseId);

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

            const pdfFile = new File(Paths.cache, `avaliacao_${responseId}.pdf`);
            const binaryString = atob(base64Data);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            pdfFile.write(bytes);

            await Sharing.shareAsync(pdfFile.uri, {
                mimeType: 'application/pdf',
                dialogTitle: `Avaliação #${responseId}`,
                UTI: 'com.adobe.pdf',
            });
        } catch (error: any) {
            appContext.handleSetNotification(
                NotificationType.Error,
                "Erro ao gerar PDF. Verifique se o questionário foi finalizado"
            );
        } finally {
            setPdfLoading(null);
        }
    };

    if (loading) {
        return (
            <Container>
                <FullScreenLoading />
            </Container>
        );
    }

    if (!patient) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <AppText content="Paciente não encontrado." />
                <ButtonComponent onPress={() => router.back()} style={{ backgroundColor: colors.successBlue, marginTop: 20, paddingHorizontal: 20 }}>
                    <AppText content="Voltar" textProps={{ style: { color: colors.mainWhite } }} />
                </ButtonComponent>
            </View>
        );
    }

    const patientInitials = getInitials(patient.name);
    const formattedGender = patient.gender === "m" ? "Masculino" : "Feminino";
    const formattedDate = patient.dateOfBirth ? formatDate(patient.dateOfBirth) : "--/--/----";

    return (
        <View style={styles.container}>
            <View style={styles.headerComponent}>
                <View style={styles.headerTopRow}>
                    <View style={styles.headerLeft}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <AntDesign name="left" color={colors.mainWhite} size={20} />
                        </TouchableOpacity>
                        <AppText
                            content="Pacientes"
                            textProps={{
                                style: { color: colors.mainWhite, fontSize: textSize.small, fontWeight: "bold" },
                            }}
                        />
                    </View>
                    <Image source={osteocheckBlueBgLogo} style={styles.logo} />
                </View>

                <View style={styles.headerAvatarSection}>
                    <View style={styles.avatarBorder}>
                        <View style={styles.avatarInner}>
                            <AppText content={patientInitials} textProps={{ style: { color: colors.mainWhite, fontSize: 18, margin: 'auto', fontWeight: "bold" } }} />
                        </View>
                    </View>
                    <AppText
                        content={`${patient.name}#${patient.identifier.toUpperCase()}`}
                        textProps={{
                            style: { color: colors.mainWhite, fontSize: 18, fontWeight: "bold", marginTop: 12 },
                        }}
                    />
                </View>
            </View>

            <ScrollView
                style={styles.content}
                contentContainerStyle={{ paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.cardSection}>
                    <View style={styles.cardHeader}>
                        <Ionicons name="person-circle-outline" size={24} color={colors.mainGray} />
                        <AppText
                            content="Dados Pessoais"
                            textProps={{ style: { color: colors.darkBlue, fontWeight: "bold", fontSize: 16 } }}
                        />
                    </View>
                    <View style={styles.separator} />

                    <View style={styles.infoRow}>
                        <AppText content="Data de Nascimento" textProps={{ style: styles.infoLabel }} />
                        <AppText content={formattedDate} textProps={{ style: styles.infoValue }} />
                    </View>
                    <View style={styles.infoRow}>
                        <AppText content="Sexo" textProps={{ style: styles.infoLabel }} />
                        <AppText content={formattedGender} textProps={{ style: styles.infoValue }} />
                    </View>
                    <View style={styles.infoRow}>
                        <AppText content="Identificador" textProps={{ style: styles.infoLabel }} />
                        <AppText content={patient.identifier} textProps={{ style: styles.infoValue }} />
                    </View>
                </View>

                <AppText
                    content="Histórico de Avaliação"
                    textProps={{ style: { color: colors.mainBlack, fontWeight: "bold", fontSize: 16, marginBottom: 12, marginLeft: 4 } }}
                />

                {(!patient.questionnaireResponses || patient.questionnaireResponses.length === 0) ? (
                    <AppText
                        content="Nenhuma avaliação encontrada."
                        textProps={{ style: { color: colors.mainGray, fontSize: 14, marginLeft: 4, fontStyle: "italic" } }}
                    />
                ) : (
                    patient.questionnaireResponses.map((response) => (
                        <View key={response.id} style={[styles.cardSection, { paddingVertical: 18 }]}>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
                                <AvatarComponent backgroundColor={colors.successBlue} padding={14}>
                                    <AppText
                                        content={patientInitials}
                                        textProps={{
                                            style: { color: colors.mainWhite, fontWeight: "bold", fontSize: textSize.small },
                                        }}
                                    />
                                </AvatarComponent>

                                <View style={{ flex: 1, gap: 3 }}>
                                    <AppText
                                        content={patient.name}
                                        textProps={{ style: { color: colors.darkBlue, fontWeight: "bold", fontSize: textSize.small } }}
                                    />
                                    <AppText
                                        content={`Avaliação #${response.id}`}
                                        textProps={{ style: { color: colors.mainBlack, fontSize: 12 } }}
                                    />
                                    <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 2 }}>
                                        <MaterialCommunityIcons name="calendar-outline" size={12} color={colors.mainGray} />
                                        <AppText
                                            content={formatDate(response.createdAt)}
                                            textProps={{ style: { color: colors.mainGray, fontSize: 12 } }}
                                        />
                                    </View>
                                    <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 2 }}>
                                        <MaterialCommunityIcons name="list-status" size={12} color={colors.mainGray} />
                                        <AppText
                                            content={`Status: ${translateQuestionnaireResponseStatus(response.status)}`}
                                            textProps={{ style: { color: colors.mainGray, fontSize: 12 } }}
                                        />
                                    </View>
                                </View>

                                <TouchableOpacity
                                    style={styles.actionButton}
                                    onPress={() => handlePdf(response.id)}
                                    disabled={pdfLoading === response.id}
                                >
                                    {pdfLoading === response.id ? (
                                        <ActivityIndicator size={20} color={colors.darkBlue} />
                                    ) : (
                                        <Feather name="download" size={24} color={colors.darkBlue} />
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                )}

            </ScrollView>

            <View style={styles.footer}>
                <ButtonComponent
                    style={[styles.button, { backgroundColor: colors.successBlue, borderColor: colors.successBlue }]}
                    onPress={() => router.push({
                        pathname: "/questionnaire/[patientId]",
                        params: { patientId: String(patient.id) }
                    })}
                >
                    <AppText content="Iniciar/Continuar avaliação" textProps={{ style: { color: colors.mainWhite, fontWeight: "bold" } }} />
                </ButtonComponent>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.mainWhite,
    },
    headerComponent: {
        backgroundColor: colors.darkBlue,
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 40,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        marginBottom: 20,
    },
    headerTopRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
    },
    logo: {
        width: 90,
        height: 30,
        resizeMode: "contain",
    },
    headerAvatarSection: {
        alignItems: "center",
        marginTop: 30,
    },
    avatarBorder: {
        width: 86,
        height: 86,
        borderRadius: 43,
        backgroundColor: colors.mainWhite,
        justifyContent: "center",
        alignItems: "center",
    },
    avatarInner: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: colors.successBlue,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    cardSection: {
        backgroundColor: colors.mainWhite,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: colors.transparentWhite,
        paddingVertical: 16,
        paddingHorizontal: 16,
        marginBottom: 24,
        elevation: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 12,
    },
    separator: {
        height: 1,
        backgroundColor: colors.opaqueBlue,
        marginBottom: 16,
        opacity: 0.5,
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    infoLabel: {
        color: colors.mainGray,
        fontSize: 12,
    },
    infoValue: {
        color: colors.mainBlack,
        fontWeight: "bold",
        fontSize: 12,
    },
    footer: {
        paddingHorizontal: 20,
        paddingBottom: 65,
        paddingTop: 10,
        gap: 12,
    },
    button: {
        borderRadius: 30,
    },
    actionButton: {
        padding: 6,
        marginLeft: 4,
    },
});
