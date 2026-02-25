import AppText from "@/components/appText.component";
import Container from "@/components/container.component";
import colors from "@/constants/colors";
import textSize from "@/constants/textSize";
import { AppContext, ScreenName } from "@/context/appContext";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useCallback, useContext } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import ButtonComponent from "@/components/button.component";

export default function ConfigScreen() {
    const appContext = useContext(AppContext);

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
                    <TouchableOpacity style={styles.listItem}>
                        <View style={styles.listItemLeft}>
                            <Feather name="mail" size={20} color={colors.mainBlack} />
                            <AppText content="Alterar E-mail" textProps={{ style: styles.listItemText }} />
                        </View>
                        <AntDesign name="right" size={16} color={colors.successBlue} />
                    </TouchableOpacity>
                    <View style={styles.divider} />
                    <TouchableOpacity style={styles.listItem}>
                        <View style={styles.listItemLeft}>
                            <Feather name="key" size={20} color={colors.mainBlack} />
                            <AppText content="Alterar Senha" textProps={{ style: styles.listItemText }} />
                        </View>
                        <AntDesign name="right" size={16} color={colors.successBlue} />
                    </TouchableOpacity>
                    <View style={styles.divider} />
                    <TouchableOpacity style={styles.listItem}>
                        <View style={styles.listItemLeft}>
                            <Feather name="settings" size={20} color={colors.mainBlack} />
                            <AppText content="Alterar Meus Dados" textProps={{ style: styles.listItemText }} />
                        </View>
                        <AntDesign name="right" size={16} color={colors.successBlue} />
                    </TouchableOpacity>
                </View>

                <AppText
                    content="Informações"
                    textProps={{ style: [styles.sectionTitle, { marginTop: 30 }] }}
                />
                <View style={styles.sectionContainer}>
                    <TouchableOpacity style={styles.listItem}>
                        <View style={styles.listItemLeft}>
                            <Feather name="info" size={20} color={colors.mainBlack} />
                            <AppText content="Sobre o Aplicativo" textProps={{ style: styles.listItemText }} />
                        </View>
                        <AntDesign name="right" size={16} color={colors.successBlue} />
                    </TouchableOpacity>
                    <View style={styles.divider} />
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
                        <AppText content="osteocheck@cesmac.edu.br" textProps={{ style: [styles.listItemText, { fontSize: 13 }] }} />
                    </View>
                </View>

                <View style={styles.footer}>
                    <ButtonComponent
                        style={styles.logoutButton}
                    >
                        <AppText
                            content="Sair"
                            textProps={{ style: styles.logoutButtonText }}
                        />
                    </ButtonComponent>
                </View>
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
