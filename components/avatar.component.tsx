import colors from '@/constants/colors';
import * as React from 'react';
import { View } from 'react-native';

interface AvatarComponentProps {
  children: React.ReactElement;
  padding?: number;
  backgroundColor?: string;
}

export default function AvatarComponent({ backgroundColor, padding, children }: AvatarComponentProps) {
  return (
    <View style={{ backgroundColor: backgroundColor ?? colors.mainWhite, padding: padding ?? 10, borderRadius: '100%' }}>
      { children }
    </View>
  )
}
