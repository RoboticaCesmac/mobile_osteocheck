import React from 'react';
import { Modal, StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import colors from '@/constants/colors';
import AppText from './appText.component';

interface ConfirmModalProps {
    visible: boolean;
    title: string;
    description: string;
    cancelLabel?: string;
    confirmLabel?: string;
    onCancel: () => void;
    onConfirm: () => void;
}

const { width, height } = Dimensions.get('screen');

export default function ConfirmModalComponent({
    visible,
    title,
    description,
    cancelLabel = 'Cancelar',
    confirmLabel = 'Confirmar',
    onCancel,
    onConfirm,
}: ConfirmModalProps) {
    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            onRequestClose={onCancel}
            statusBarTranslucent
        >
            <View style={styles.overlay}>
                <BlurView
                    intensity={80}
                    tint="dark"
                    style={StyleSheet.absoluteFill}
                />
                <View style={styles.modalContent}>
                    <AppText
                        content={title}
                        textProps={{ style: styles.title }}
                    />
                    <AppText
                        content={description}
                        textProps={{ style: styles.description }}
                    />
                    <View style={styles.actions}>
                        <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
                            <AppText
                                content={cancelLabel}
                                textProps={{ style: styles.cancelText }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onConfirm} style={styles.confirmButton}>
                            <AppText
                                content={confirmLabel}
                                textProps={{ style: styles.confirmText }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        width,
        height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    modalContent: {
        width: width * 0.85,
        backgroundColor: colors.mainWhite,
        borderRadius: 24,
        padding: 30,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.darkBlue,
        marginBottom: 15,
    },
    description: {
        fontSize: 15,
        color: colors.mainGray,
        lineHeight: 22,
        marginBottom: 30,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 20,
    },
    cancelButton: {
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    cancelText: {
        fontSize: 16,
        color: colors.mainGray,
    },
    confirmButton: {
        backgroundColor: colors.errorRed,
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 25,
        minWidth: 80,
        alignItems: 'center',
    },
    confirmText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.mainWhite,
    },
});
