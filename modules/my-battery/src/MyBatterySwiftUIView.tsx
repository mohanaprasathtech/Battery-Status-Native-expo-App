import { requireNativeView } from 'expo';
import { type CommonViewModifierProps } from '@expo/ui/swift-ui';
import { createViewModifierEventListener } from '@expo/ui/swift-ui/modifiers';
import * as React from 'react';

export interface MyBatterySwiftUIViewProps extends CommonViewModifierProps {
  title: string;
  children?: React.ReactNode;
}

const NativeMyBatterySwiftUIView = requireNativeView<MyBatterySwiftUIViewProps>(
  'MyBattery',
  'MyBatterySwiftUIView'
);

export default function MyBatterySwiftUIView({
  modifiers,
  ...rest
}: MyBatterySwiftUIViewProps) {
  return (
    <NativeMyBatterySwiftUIView
      modifiers={modifiers}
      {...(modifiers ? createViewModifierEventListener(modifiers) : undefined)}
      {...rest}
    />
  );
}
