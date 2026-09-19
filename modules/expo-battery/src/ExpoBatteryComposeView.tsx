import { requireNativeView } from 'expo';
import { type PrimitiveBaseProps } from '@expo/ui/jetpack-compose';
import { createViewModifierEventListener } from '@expo/ui/jetpack-compose/modifiers';
import * as React from 'react';

export interface ExpoBatteryComposeViewProps extends PrimitiveBaseProps {
  title: string;
  children?: React.ReactNode;
}

const NativeExpoBatteryComposeView = requireNativeView<ExpoBatteryComposeViewProps>(
  'ExpoBattery',
  'ExpoBatteryComposeView'
);

export default function ExpoBatteryComposeView({
  modifiers,
  ...rest
}: ExpoBatteryComposeViewProps) {
  return (
    <NativeExpoBatteryComposeView
      modifiers={modifiers}
      {...(modifiers ? createViewModifierEventListener(modifiers) : undefined)}
      {...rest}
    />
  );
}
