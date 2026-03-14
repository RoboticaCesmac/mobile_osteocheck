import AppText from "@/components/appText.component";
import AvatarComponent from "@/components/avatar.component";
import Container from "@/components/container.component";
import SearchInputComponent from "@/components/searchInput.component";
import colors from "@/constants/colors";
import textSize from "@/constants/textSize";
import { AppContext, ScreenName } from "@/context/appContext";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useCallback, useContext, useMemo, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import professionalApi from "@/services/professional";
import { QuestionnaireResponse } from "@/domain/questionnaireResponse";
import QuestionnaireAPI from "@/services/questionnaire";
import { File, Paths } from "expo-file-system/next";
import * as Sharing from "expo-sharing";
import { NotificationType } from "@/components/notification.component";

function getInitials(name: string): string {
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

function formatDate(date: Date): string {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
}

interface PatientCardProps {
    response: QuestionnaireResponse;
    index: number;
    pdfLoading: number | null;
    onHandlePdf: (id: number) => void;
}

function PatientCard({ response, index, pdfLoading, onHandlePdf }: PatientCardProps) {
    const patientName = response.patient?.name || "Paciente Desconhecido";
    return (
        <View style={styles.card}>
            <View style={styles.cardLeft}>
                <AvatarComponent backgroundColor={colors.successBlue} padding={12}>
                    <AppText
                        content={getInitials(patientName)}
                        textProps={{
                            style: {
                                color: colors.mainWhite,
                                fontWeight: "bold",
                                fontSize: textSize.small,
                            },
                        }}
                    />
                </AvatarComponent>

                <View style={styles.cardInfo}>
                    <AppText
                        content={patientName}
                        textProps={{ style: styles.cardName }}
                    />
                    <AppText
                        content={`Avaliação #  ${5799 + index}`}
                        textProps={{ style: styles.cardSubtitle }}
                    />
                    <View style={styles.cardDateRow}>
                        <MaterialCommunityIcons
                            name="calendar-outline"
                            size={12}
                            color={colors.mainGray}
                        />
                        <AppText
                            content={formatDate(response.createdAt)}
                            textProps={{ style: styles.cardDate }}
                        />
                    </View>
                </View>
            </View>

            <View style={styles.cardActions}>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => onHandlePdf(response.id)}
                    disabled={pdfLoading === response.id}
                >
                    {pdfLoading === response.id ? (
                        <ActivityIndicator size={20} color={colors.darkBlue} />
                    ) : (
                        <Feather name="download" size={20} color={colors.darkBlue} />
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default function HistoricoScreen() {
    const appContext = useContext(AppContext);
    const [search, setSearch] = useState("");
    const [responses, setResponses] = useState<QuestionnaireResponse[]>([]);
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [pdfLoading, setPdfLoading] = useState<number | null>(null);

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
                error.message || "Erro ao gerar PDF"
            );
        } finally {
            setPdfLoading(null);
        }
    };

    const fetchResponses = useCallback(async (pageNumber: number, shouldReset: boolean = false) => {
        if (loading || (!hasMore && !shouldReset)) return;

        try {
            setLoading(true);
            const response = await professionalApi.getLastQuestionnaireResponses({ page: pageNumber, limit });

            if (response && response.data) {
                if (shouldReset) {
                    setResponses(response.data);
                } else {
                    setResponses(prev => [...prev, ...response.data]);
                }
                setHasMore(response.meta.page < response.meta.totalPages);
                setPage(response.meta.page);
            }
        } catch (error) {
            console.error("Error fetching questionnaire responses:", error);
        } finally {
            setLoading(false);
        }
    }, [limit, hasMore, loading]);

    useFocusEffect(
        useCallback(() => {
            appContext.handleShowHeaderComponent(true, ScreenName.History);
            fetchResponses(1, true);
        }, []),
    );

    const filteredResponses = useMemo(() => {
        if (!search.trim()) return responses;
        return responses.filter((r) =>
            r.patient?.name.toLowerCase().includes(search.toLowerCase()),
        );
    }, [search, responses]);

    const handleLoadMore = () => {
        if (hasMore && !loading) {
            fetchResponses(page + 1);
        }
    };

    return (
        <Container>
            <View style={styles.content}>
                <SearchInputComponent value={search} onChangeText={setSearch} />

                <FlatList
                    data={filteredResponses}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item, index }) => (
                        <PatientCard
                            response={item}
                            index={index}
                            pdfLoading={pdfLoading}
                            onHandlePdf={handlePdf}
                        />
                    )}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            {loading ? (
                                <ActivityIndicator size="large" color={colors.darkBlue} />
                            ) : (
                                <>
                                    <Feather name="users" size={40} color={colors.opaqueBlue} />
                                    <AppText
                                        content="Nenhum paciente encontrado."
                                        textProps={{ style: styles.emptyText }}
                                    />
                                </>
                            )}
                        </View>
                    }
                    ListFooterComponent={
                        <View>
                            {loading && responses.length > 0 && (
                                <ActivityIndicator size="small" color={colors.darkBlue} style={{ marginTop: 10 }} />
                            )}
                            {hasMore && responses.length > 0 && !loading && (
                                <TouchableOpacity style={styles.loadMoreButton} onPress={handleLoadMore}>
                                    <AppText
                                        content="Ver mais"
                                        textProps={{ style: styles.loadMoreText }}
                                    />
                                </TouchableOpacity>
                            )}
                        </View>
                    }
                />
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        paddingHorizontal: 20,
        marginTop: -30,
    },
    listContent: {
        paddingBlock: 20,
        gap: 12,
    },
    card: {
        backgroundColor: colors.mainWhite,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: colors.opaqueBlue,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 14,
        paddingHorizontal: 14,
    },
    cardLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        flex: 1,
    },
    cardInfo: {
        flex: 1,
        gap: 2,
    },
    cardName: {
        color: colors.darkBlue,
        fontWeight: "bold",
        fontSize: textSize.small,
    },
    cardSubtitle: {
        color: colors.mainGray,
        fontSize: 12,
    },
    cardDateRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        marginTop: 2,
    },
    cardDate: {
        color: colors.mainGray,
        fontSize: 12,
    },
    cardActions: {
        flexDirection: "column",
        alignItems: "center",
        borderLeftWidth: 1,
        borderLeftColor: colors.opaqueBlue,
        paddingLeft: 12,
        gap: 4,
    },
    actionButton: {
        padding: 6,
    },
    actionDivider: {
        height: 1,
        width: "100%",
        backgroundColor: colors.opaqueBlue,
    },
    loadMoreButton: {
        alignItems: "center",
        marginTop: 8,
        paddingVertical: 10,
    },
    loadMoreText: {
        color: colors.mainGray,
        fontSize: textSize.small,
    },
    emptyContainer: {
        alignItems: "center",
        marginTop: 60,
        gap: 16,
    },
    emptyText: {
        color: colors.mainGray,
        fontSize: textSize.small,
    },
});
