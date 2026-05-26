import AppText from "@/components/appText.component";
import AvatarComponent from "@/components/avatar.component";
import Container from "@/components/container.component";
import SearchInputComponent from "@/components/searchInput.component";
import colors from "@/constants/colors";
import textSize from "@/constants/textSize";
import { AppContext, ScreenName } from "@/context/appContext";
import { Patient } from "@/domain/patient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import ProfessionalAPI from "@/services/professional";
import { NotificationType } from "@/components/notification.component";
import FullScreenLoading from "@/components/fullScreenLoading.component";

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

function PatientCard({ patient }: PatientCardProps) {
    const router = useRouter();
    const initials = getInitials(patient.name);
    const avatarColor = AVATAR_COLORS[initials] ?? colors.successBlue;

    return (
        <TouchableOpacity style={styles.card} activeOpacity={0.75} onPress={() => router.push({ pathname: "/patient/[id]", params: { id: patient.id } } as any)}>
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
                    content={`Identificador: #${patient.identifier.toUpperCase()}`}
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

export default function PatientsScreen() {
    const [search, setSearch] = useState("");
    const [patients, setPatients] = useState<Patient[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const appContext = useContext(AppContext);

    useFocusEffect(
        useCallback(() => {
            appContext.handleShowHeaderComponent(true, ScreenName.Patients);
            getProfessionalPatients();
        }, []),
    );

    const getProfessionalPatients = async () => {
        try {
            setLoading(true);
            const response = await ProfessionalAPI.getProfessionalPatients();
            if (response) {
                setPatients(response.data.patients);
            }
        } catch (error: any) {
            console.log(error);
            appContext.handleSetNotification(NotificationType.Error, error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Container>
                <FullScreenLoading />
            </Container>
        );
    }

    return (
        <Container>
            <View style={styles.content}>
                <SearchInputComponent value={search} onChangeText={setSearch} />
                <FlatList
                    scrollEnabled={false}
                    data={patients}
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
