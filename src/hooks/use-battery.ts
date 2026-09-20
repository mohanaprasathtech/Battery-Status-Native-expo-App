import { useEffect, useState } from 'react';
import { AppState } from 'react-native';

import MyBatteryModule from '../../modules/my-battery/src/MyBatteryModule';

export type BatteryReading = {
  /** 0-100, or -1 when the platform cannot report it (web, iOS Simulator). */
  level: number;
  pluggedIn: boolean;
};

function read(): BatteryReading {
  return {
    level: MyBatteryModule.getBatteryLevel(),
    pluggedIn: MyBatteryModule.isPluggedIn(),
  };
}

/**
 * Polls the native module so the UI follows the real battery.
 * Also re-reads whenever the app comes back to the foreground, since the
 * level will usually have moved while we were not running.
 */
export function useBattery(intervalMs = 2000): BatteryReading {
  const [reading, setReading] = useState<BatteryReading>(read);

  useEffect(() => {
    const tick = () => setReading(read());

    tick();
    const interval = setInterval(tick, intervalMs);
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') tick();
    });

    return () => {
      clearInterval(interval);
      subscription.remove();
    };
  }, [intervalMs]);

  return reading;
}
