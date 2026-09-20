import { NativeModule, requireNativeModule } from 'expo';

import { MyBatteryModuleEvents } from './MyBattery.types';
import type { MyBatteryModuleSharedObject } from './MyBatteryModuleSharedObject';

declare class MyBatteryModule extends NativeModule<MyBatteryModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
  getBatteryLevel(): number;
  isPluggedIn(): boolean;
  MyBatteryModuleSharedObject: typeof MyBatteryModuleSharedObject;
}

export default requireNativeModule<MyBatteryModule>('MyBattery');
