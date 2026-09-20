import * as React from 'react';

import { MyBatteryViewProps } from './MyBattery.types';

export default function MyBatteryView(props: MyBatteryViewProps) {
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
      <span>MyBattery - native view</span>
      <span>Tap the view to emit a view event</span>
    </div>
  );
}
