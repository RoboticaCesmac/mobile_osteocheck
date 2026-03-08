import React, { useState, useContext, useCallback } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import AppText from "@/components/appText.component";
import InputComponent from "@/components/input.component";
import ButtonComponent from "@/components/button.component";
import DropdownComponent from "@/components/dropdown.component";
import DateSelectionComponent from "@/components/dateSelection.component";
import Container from "@/components/container.component";
import colors from "@/constants/colors";
import textSize from "@/constants/textSize";
import { AppContext } from "@/context/appContext";
import { NotificationType } from "@/components/notification.component";
import PatientAPI from "@/services/patient";
import AuthAPI from "@/services/auth";
import { PatientsGender } from "@/domain/patient";
import { AntDesign } from "@expo/vector-icons";

const formatCPF = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    if (numericValue.length <= 3) return numericValue;
    if (numericValue.length <= 6) return `${numericValue.slice(0, 3)}.${numericValue.slice(3)}`;
    if (numericValue.length <= 9) return `${numericValue.slice(0, 3)}.${numericValue.slice(3, 6)}.${numericValue.slice(6)}`;
    return `${numericValue.slice(0, 3)}.${numericValue.slice(3, 6)}.${numericValue.slice(6, 9)}-${numericValue.slice(9, 11)}`;
};

export default function CreatePatientScreen() {
    const [initials, setInitials] = useState("");
    const [cpf, setCpf] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date(0));
    const [gender, setGender] = useState<number[]>([]);
    const [loading, setLoading] = useState(false);
    const [initialsError, setInitialsError] = useState<string[]>();
    const [cpfError, setCpfError] = useState<string[]>();
    const [dateError, setDateError] = useState<string>();
    const [genderError, setGenderError] = useState<string[]>();

    const router = useRouter();
    const appContext = useContext(AppContext);

    useFocusEffect(
        useCallback(() => {
            appContext.handleShowHeaderComponent(true, "Cadastrar Paciente" as any);
        }, [])
    );

    const genderOptions = [
        { label: "Masculino", value: "m".charCodeAt(0) },
        { label: "Feminino", value: "f".charCodeAt(0) },
    ];

    const handleCpfChange = (text: string) => {
        setCpf(formatCPF(text));
    };

    const handleCreatePatient = async () => {
        setInitialsError(undefined);
        setCpfError(undefined);
        setDateError(undefined);
        setGenderError(undefined);

        let hasError = false;

        if (!initials.trim()) {
            setInitialsError(["A identificação é obrigatória."]);
            hasError = true;
        }

        if (!cpf.trim() || cpf.length !== 14) {
            setCpfError(["CPF inválido."]);
            hasError = true;
        }

        if (dateOfBirth.getTime() === new Date(0).getTime() || isNaN(dateOfBirth.getTime())) {
            setDateError("A data de nascimento é obrigatória.");
            hasError = true;
        }

        if (gender.length === 0) {
            setGenderError(["O sexo é obrigatório."]);
            hasError = true;
        }

        if (hasError) return;

        try {
            setLoading(true);

            const profileResponse = await AuthAPI.profile();
            const professionalId = profileResponse.data.id;

            const selectedGenderValue = String.fromCharCode(gender[0]) as PatientsGender;

            const response = await PatientAPI.create({
                professionalId,
                name: initials,
                cpf: cpf.replace(/\D/g, ""),
                dateOfBirth,
                gender: selectedGenderValue,
            });

            if (response && response.data) {
                appContext.handleSetNotification(NotificationType.Success, "Paciente cadastrado com sucesso.");
                router.replace(`/patient/${response.data.id}`);
            }
        } catch (error: any) {
            appContext.handleSetNotification(NotificationType.Error, error.message || "Erro ao cadastrar paciente.");
            if (error?.response?.data?.errors) {
                setInitialsError(error.response.data.errors.name);
                setCpfError(error.response.data.errors.cpf);
                setGenderError(error.response.data.errors.gender);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <View style={styles.formContainer}>
                <AppText
                    content="Cadastrar Paciente"
                    textProps={{
                        style: {
                            color: colors.darkBlue,
                            fontSize: textSize.big,
                            fontWeight: "bold",
                            marginBottom: 20,
                        },
                    }}
                />

                <View style={styles.inputGroup}>
                    <AppText
                        content="Identificação"
                        textProps={{ style: styles.label }}
                    />
                    <InputComponent
                        placeholder=" Nome"
                        value={initials}
                        onChangeText={setInitials}
                        errorText={initialsError}
                        maxLength={100}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <AppText
                        content="CPF"
                        textProps={{ style: styles.label }}
                    />
                    <InputComponent
                        placeholder="XXX.XXX.XXX-XX"
                        value={cpf}
                        onChangeText={handleCpfChange}
                        errorText={cpfError}
                        keyboardType="numeric"
                        maxLength={14}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <AppText
                        content="Data de Nascimento"
                        textProps={{ style: styles.label }}
                    />
                    <DateSelectionComponent
                        date={dateOfBirth}
                        setDate={setDateOfBirth}
                        errorMessage={dateError}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <AppText
                        content="Sexo"
                        textProps={{ style: styles.label }}
                    />
                    <DropdownComponent
                        scrollEnabled={false}
                        placeholder="Selecione..."
                        listItems={genderOptions}
                        selectedItems={gender}
                        setSelectedItems={(items) => {
                            if (typeof items === 'function') {
                                const newItems = items(gender);
                                setGender(newItems.length > 0 ? [newItems[newItems.length - 1]] : []);
                            } else {
                                setGender(items.length > 0 ? [items[items.length - 1]] : []);
                            }
                        }}
                        errorText={genderError}
                    />
                </View>

                <AppText
                    content="O OsteoCheck tem caráter educativo e de apoio clínico, em conformidade com a LGPD (Lei nº 13.709/2018) e o Código de Ética das profissões de saúde."
                    textProps={{ style: styles.disclaimer }}
                />
            </View>

            <View style={styles.footerContainer}>
                <ButtonComponent
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <AntDesign name="arrow-left" size={24} color={colors.successBlue} />
                </ButtonComponent>

                <ButtonComponent
                    style={styles.nextButton}
                    onPress={handleCreatePatient}
                    loading={loading}
                >
                    <AppText
                        content="Cadastrar"
                        textProps={{ style: { color: colors.mainWhite, fontWeight: "bold" } }}
                    />
                </ButtonComponent>
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    formContainer: {
        paddingHorizontal: 20,
        marginTop: -20
    },
    label: {
        color: colors.mainBlack,
        marginBottom: 8,
        fontSize: textSize.small,
    },
    disclaimer: {
        fontSize: 10,
        color: colors.mainGray,
        marginTop: 10,
        textAlign: "justify",
    },
    inputGroup: {
        marginBottom: 15,
    },
    footerContainer: {
        marginTop: 40,
        marginBottom: 100,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    backButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: colors.successBlue,
        backgroundColor: colors.mainWhite,
        justifyContent: "center",
        alignItems: "center",
    },
    nextButton: {
        backgroundColor: colors.successBlue,
        paddingHorizontal: 40,
        height: 50,
        borderRadius: 25,
        borderWidth: 0,
        flex: 1,
        marginLeft: 20,
    },
});
