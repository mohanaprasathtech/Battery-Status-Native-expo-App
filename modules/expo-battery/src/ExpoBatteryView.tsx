import { requireNativeView } from 'expo';
import * as React from 'react';

import { ExpoBatteryViewProps } from './ExpoBattery.types';

const NativeView: React.ComponentType<ExpoBatteryViewProps> = requireNativeView('ExpoBattery');

export default function ExpoBatteryView(props: ExpoBatteryViewProps) {
  return <NativeView {...props} />;
}
