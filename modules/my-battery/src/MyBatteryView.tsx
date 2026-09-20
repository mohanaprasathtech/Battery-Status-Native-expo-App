import { requireNativeView } from 'expo';
import * as React from 'react';

import { MyBatteryViewProps } from './MyBattery.types';

const NativeView: React.ComponentType<MyBatteryViewProps> = requireNativeView('MyBattery');

export default function MyBatteryView(props: MyBatteryViewProps) {
  return <NativeView {...props} />;
}
