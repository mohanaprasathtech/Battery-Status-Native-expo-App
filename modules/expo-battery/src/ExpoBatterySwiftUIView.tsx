import { requireNativeView } from 'expo';
import { type CommonViewModifierProps } from '@expo/ui/swift-ui';
import { createViewModifierEventListener } from '@expo/ui/swift-ui/modifiers';
import * as React from 'react';

export interface ExpoBatterySwiftUIViewProps extends CommonViewModifierProps {
  title: string;
  children?: React.ReactNode;
}

const NativeExpoBatterySwiftUIView = requireNativeView<ExpoBatterySwiftUIViewProps>(
  'ExpoBattery',
  'ExpoBatterySwiftUIView'
);

export default function ExpoBatterySwiftUIView({
  modifiers,
  ...rest
}: ExpoBatterySwiftUIViewProps) {
  return (
    <NativeExpoBatterySwiftUIView
      modifiers={modifiers}
      {...(modifiers ? createViewModifierEventListener(modifiers) : undefined)}
      {...rest}
    />
  );
}
