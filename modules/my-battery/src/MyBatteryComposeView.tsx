import { requireNativeView } from 'expo';
import { type PrimitiveBaseProps } from '@expo/ui/jetpack-compose';
import { createViewModifierEventListener } from '@expo/ui/jetpack-compose/modifiers';
import * as React from 'react';

export interface MyBatteryComposeViewProps extends PrimitiveBaseProps {
  title: string;
  children?: React.ReactNode;
}

const NativeMyBatteryComposeView = requireNativeView<MyBatteryComposeViewProps>(
  'MyBattery',
  'MyBatteryComposeView'
);

export default function MyBatteryComposeView({
  modifiers,
  ...rest
}: MyBatteryComposeViewProps) {
  return (
    <NativeMyBatteryComposeView
      modifiers={modifiers}
      {...(modifiers ? createViewModifierEventListener(modifiers) : undefined)}
      {...rest}
    />
  );
}
