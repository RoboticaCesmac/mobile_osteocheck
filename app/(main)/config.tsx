import AppText from "@/components/appText.component";
import ButtonComponent from "@/components/button.component";
import ConfirmModalComponent from "@/components/confirmModal.component";
import Container from "@/components/container.component";
import { NotificationType } from "@/components/notification.component";
import colors from "@/constants/colors";
import textSize from "@/constants/textSize";
import { AppContext, ScreenName } from "@/context/appContext";
import professionalAPI from "@/services/professional";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useContext, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function ConfigScreen() {
    const appContext = useContext(AppContext);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const router = useRouter();

    const onHandleChangePassword = () => {
        router.push("/passwordChange/emailInput");
    }

    const onHandleLogOut = () => {
        appContext.handleLogout();
    }

    const onHandleClickLogOut = () => {
        setIsLogoutModalOpen(true);
    }

    const onHandleDeleteAccount = async () => {
        try {
            await professionalAPI.deleteById();
            appContext.handleLogout();
        } catch (error: any) {
            appContext.handleSetNotification(NotificationType.Error, error?.response?.data?.message ?? "Erro ao deletar conta.");
        }
    }

    const onHandleClickDeleteAccount = () => {
        setIsDeleteModalOpen(true);
    }

    useFocusEffect(
        useCallback(() => {
            appContext.handleShowHeaderComponent(true, ScreenName.Config);
        }, []),
    );

    return (
        <Container>
            <View style={styles.content}>
                <AppText
                    content="Configurações"
                    textProps={{ style: styles.sectionTitle }}
                />
                <View style={styles.sectionContainer}>

    
                    <TouchableOpacity style={styles.listItem} onPress={onHandleChangePassword}>
                        <View style={styles.listItemLeft}>
                            <Feather name="key" size={20} color={colors.mainBlack} />
                            <AppText content="Alterar Senha" textProps={{ style: styles.listItemText }} />
                        </View>
                        <AntDesign name="right" size={16} color={colors.successBlue} />
                    </TouchableOpacity>
                </View>

                <AppText
                    content="Informações"
                    textProps={{ style: [styles.sectionTitle, { marginTop: 30 }] }}
                />
                <View style={styles.sectionContainer}>
    
                    <View style={styles.listItem}>
                        <View style={styles.listItemLeft}>
                            <Feather name="tag" size={20} color={colors.mainBlack} />
                            <AppText content="Versão" textProps={{ style: styles.listItemText }} />
                        </View>
                        <AppText content="1.0.0" textProps={{ style: styles.listItemText }} />
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.listItem}>
                        <View style={styles.listItemLeft}>
                            <Feather name="mail" size={20} color={colors.mainBlack} />
                            <AppText content="Suporte" textProps={{ style: styles.listItemText }} />
                        </View>
                        <AppText content="roboticacesmac@gmail.com" textProps={{ style: [styles.listItemText, { fontSize: 13 }] }} />
                    </View>
                </View>

                <View style={styles.footer}>
                    <ButtonComponent
                        style={styles.logoutButton}
                        onPress={onHandleClickLogOut}
                    >
                        <AppText
                            content="Sair"
                            textProps={{ style: styles.logoutButtonText }}
                        />
                    </ButtonComponent>

                    <ButtonComponent
                        style={[styles.logoutButton, { marginTop: 15 }]}
                        onPress={onHandleClickDeleteAccount}
                    >
                        <AppText
                            content="Deletar Conta"
                            textProps={{ style: styles.logoutButtonText }}
                        />
                    </ButtonComponent>
                </View>

                <ConfirmModalComponent
                    visible={isLogoutModalOpen}
                    title="Sair da Conta"
                    description="Tem certeza que deseja encerrar sua sessão?"
                    cancelLabel="Cancelar"
                    confirmLabel="Sair"
                    onCancel={() => setIsLogoutModalOpen(false)}
                    onConfirm={onHandleLogOut}
                />

                <ConfirmModalComponent
                    visible={isDeleteModalOpen}
                    title="Deletar Conta"
                    description="Tem certeza que deseja deletar sua conta permanentemente? Esta ação não pode ser desfeita."
                    cancelLabel="Cancelar"
                    confirmLabel="Deletar"
                    onCancel={() => setIsDeleteModalOpen(false)}
                    onConfirm={onHandleDeleteAccount}
                />
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: 30,
        marginTop: -30,
        paddingBottom: 30,
    },
    sectionTitle: {
        color: colors.darkBlue,
        fontSize: textSize.regular,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    sectionContainer: {
        backgroundColor: colors.mainWhite,
        borderRadius: 10,
        borderColor: colors.opaqueBlue,
        borderWidth: 1,
        overflow: 'hidden',
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    listItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    listItemText: {
        color: colors.darkBlue,
        fontSize: 14,
    },
    divider: {
        height: 1,
        backgroundColor: colors.opaqueBlue,
        width: '90%',
        alignSelf: 'center',
        opacity: 0.5,
    },
    footer: {
        marginTop: 50,
    },
    logoutButton: {
        borderColor: colors.errorRed,
        width: '100%',
        justifyContent: 'center',
    },
    logoutButtonText: {
        color: colors.errorRed,
        fontWeight: 'bold',
        fontSize: textSize.regular,
    }
});
