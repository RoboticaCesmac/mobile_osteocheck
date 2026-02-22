import * as React from 'react';
import { Badge, BadgeProps } from 'react-native-paper';

interface BadgeComponentProps extends BadgeProps {
  content?: number | string;
}

export default function BadgeComponent({ content, ...props }: BadgeComponentProps) {
  return (
    <Badge
      {...props}
    >
      { content }
    </Badge>
  )
}