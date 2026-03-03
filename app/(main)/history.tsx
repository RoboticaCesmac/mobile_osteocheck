import AppText from "@/components/appText.component";
import AvatarComponent from "@/components/avatar.component";
import Container from "@/components/container.component";
import SearchInputComponent from "@/components/searchInput.component";
import colors from "@/constants/colors";
import textSize from "@/constants/textSize";
import { AppContext, ScreenName } from "@/context/appContext";
import { Patient } from "@/domain/patient";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useCallback, useContext, useMemo, useState } from "react";
import {
    FlatList,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";

const MOCK_PATIENTS: Patient[] = [
    {
        id: 1,
        name: "Carlos Andrade",
        cpf: "123.456.789-00",
        dateOfBirth: new Date("1985-05-10"),
        gender: "m" as any,
        createdAt: new Date("2025-10-15"),
        updatedAt: new Date("2025-10-15"),
        deletedAt: null as any,
    },
    {
        id: 2,
        name: "Ana Souza",
        cpf: "987.654.321-00",
        dateOfBirth: new Date("1990-08-22"),
        gender: "f" as any,
        createdAt: new Date("2025-10-15"),
        updatedAt: new Date("2025-10-15"),
        deletedAt: null as any,
    },
    {
        id: 3,
        name: "Roberto Lima",
        cpf: "111.222.333-44",
        dateOfBirth: new Date("1978-03-17"),
        gender: "m" as any,
        createdAt: new Date("2025-10-15"),
        updatedAt: new Date("2025-10-15"),
        deletedAt: null as any,
    },
    {
        id: 4,
        name: "Fernanda Costa",
        cpf: "555.666.777-88",
        dateOfBirth: new Date("1995-12-01"),
        gender: "f" as any,
        createdAt: new Date("2025-10-15"),
        updatedAt: new Date("2025-10-15"),
        deletedAt: null as any,
    },
    {
        id: 5,
        name: "Marcos Oliveira",
        cpf: "999.000.111-22",
        dateOfBirth: new Date("1982-07-30"),
        gender: "m" as any,
        createdAt: new Date("2025-10-15"),
        updatedAt: new Date("2025-10-15"),
        deletedAt: null as any,
    },
];

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
    patient: Patient;
    index: number;
}

function PatientCard({ patient, index }: PatientCardProps) {
    return (
        <View style={styles.card}>
            <View style={styles.cardLeft}>
                <AvatarComponent backgroundColor={colors.successBlue} padding={12}>
                    <AppText
                        content={getInitials(patient.name)}
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
                        content={patient.name}
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
                            content={formatDate(patient.createdAt)}
                            textProps={{ style: styles.cardDate }}
                        />
                    </View>
                </View>
            </View>

            <View style={styles.cardActions}>
                <TouchableOpacity style={styles.actionButton}>
                    <Feather name="eye" size={20} color={colors.darkBlue} />
                </TouchableOpacity>
                <View style={styles.actionDivider} />
                <TouchableOpacity style={styles.actionButton}>
                    <Feather name="download" size={20} color={colors.darkBlue} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default function HistoricoScreen() {
    const appContext = useContext(AppContext);
    const [search, setSearch] = useState("");

    useFocusEffect(
        useCallback(() => {
            appContext.handleShowHeaderComponent(true, ScreenName.History);
        }, []),
    );

    const filteredPatients = useMemo(() => {
        if (!search.trim()) return MOCK_PATIENTS;
        return MOCK_PATIENTS.filter((p) =>
            p.name.toLowerCase().includes(search.toLowerCase()),
        );
    }, [search]);

    return (
        <Container>
            <View style={styles.content}>
                <SearchInputComponent value={search} onChangeText={setSearch} />

                <FlatList
                    data={filteredPatients}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item, index }) => (
                        <PatientCard patient={item} index={index} />
                    )}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Feather name="users" size={40} color={colors.opaqueBlue} />
                            <AppText
                                content="Nenhum paciente encontrado."
                                textProps={{ style: styles.emptyText }}
                            />
                        </View>
                    }
                    ListFooterComponent={
                        filteredPatients.length > 0 ? (
                            <TouchableOpacity style={styles.loadMoreButton}>
                                <AppText
                                    content="Ver mais"
                                    textProps={{ style: styles.loadMoreText }}
                                />
                            </TouchableOpacity>
                        ) : null
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
