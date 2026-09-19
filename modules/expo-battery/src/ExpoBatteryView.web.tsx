import * as React from 'react';

import { ExpoBatteryViewProps } from './ExpoBattery.types';

export default function ExpoBatteryView(props: ExpoBatteryViewProps) {
  return (
    <div
      style={{
        backgroundColor: '#aabbcc',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={() => props.onTap({ nativeEvent: {} })}>
      <span>ExpoBattery - native view</span>
      <span>Tap the view to emit a view event</span>
    </div>
  );
}
