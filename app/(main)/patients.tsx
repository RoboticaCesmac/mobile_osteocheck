import AppText from "@/components/appText.component";
import AvatarComponent from "@/components/avatar.component";
import Container from "@/components/container.component";
import SearchInputComponent from "@/components/searchInput.component";
import colors from "@/constants/colors";
import textSize from "@/constants/textSize";
import { AppContext, ScreenName } from "@/context/appContext";
import { Patient } from "@/domain/patient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useCallback, useContext, useMemo, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

const MOCK_PATIENTS: Patient[] = [
    {
        id: 1,
        name: "Leila Jacques",
        cpf: "111.222.333-44",
        dateOfBirth: new Date("1985-04-12"),
        gender: "f" as any,
        createdAt: new Date("2025-10-18"),
        updatedAt: new Date("2025-10-18"),
        deletedAt: null as any,
    },
    {
        id: 2,
        name: "Carlos Andrade",
        cpf: "123.456.789-00",
        dateOfBirth: new Date("1980-09-05"),
        gender: "m" as any,
        createdAt: new Date("2025-10-15"),
        updatedAt: new Date("2025-10-15"),
        deletedAt: null as any,
    },
    {
        id: 3,
        name: "Maria Souza",
        cpf: "987.654.321-11",
        dateOfBirth: new Date("1995-02-28"),
        gender: "f" as any,
        createdAt: new Date("2025-10-10"),
        updatedAt: new Date("2025-10-10"),
        deletedAt: null as any,
    },
];

const AVATAR_COLORS: Record<string, string> = {
    LJ: colors.successBlue,
    CA: colors.successBlue,
    MS: "#E6A817",
};

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
    const initials = getInitials(patient.name);
    const avatarColor = AVATAR_COLORS[initials] ?? colors.successBlue;

    return (
        <TouchableOpacity style={styles.card} activeOpacity={0.75}>
            <AvatarComponent backgroundColor={avatarColor} padding={14}>
                <AppText
                    content={initials}
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
                    content={`Avaliação #  ${5821 - index}`}
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
        </TouchableOpacity>
    );
}

export default function PacientesScreen() {
    const appContext = useContext(AppContext);
    const [search, setSearch] = useState("");

    useFocusEffect(
        useCallback(() => {
            appContext.handleShowHeaderComponent(true, ScreenName.Patients);
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
        paddingVertical: 18,
        paddingHorizontal: 16,
        gap: 14,
    },
    cardInfo: {
        flex: 1,
        gap: 3,
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
});
