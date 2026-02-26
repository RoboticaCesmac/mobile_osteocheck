import { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import AppText from '@/components/appText.component';
import Colors from '@/constants/colors';
import TextSize from '@/constants/textSize';
import ZIndex from '@/constants/zIndex';

export enum NotificationType {
  Error = 0,
  Warning,
  Success,
}

interface AnimatedNotificationProps {
  notification?: {
    message: string;
  };
  isOpen: boolean;
  onClose: () => void;
  notificationType?: NotificationType;
}

export default function AnimatedNotification({
  notification,
  isOpen,
  onClose,
  notificationType = NotificationType.Success,
}: AnimatedNotificationProps) {
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isOpen && notification?.message) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: false,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();

      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(slideAnim, {
            toValue: -100,
            duration: 400,
            useNativeDriver: false,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }),
        ]).start(() => {
          onClose();
        });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, notification?.message, slideAnim, opacityAnim, onClose]);

  const getBackgroundColor = () => {
    return {
      [NotificationType.Success]: Colors.mainGreen,
      [NotificationType.Error]: Colors.errorRed,
      [NotificationType.Warning]: Colors.opaqueYellow,
    }[notificationType];
  };

  if (!isOpen) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: getBackgroundColor(),
          transform: [{ translateY: slideAnim }],
          opacity: opacityAnim,
        },
      ]}
    >
      <AppText
        content={notification?.message || ''}
        textProps={{
          style: styles.text,
        }}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: ZIndex.aboveAll,
    left: 0,
    right: 0,
    top: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    width: '100%',
    height: 100,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  text: {
    textAlign: 'center',
    fontSize: TextSize.small,
    color: Colors.mainWhite,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
});