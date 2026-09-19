import { NativeModule, requireNativeModule } from 'expo';

import { ExpoBatteryModuleEvents } from './ExpoBattery.types';
import type { ExpoBatteryModuleSharedObject } from './ExpoBatteryModuleSharedObject';

declare class ExpoBatteryModule extends NativeModule<ExpoBatteryModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
  ExpoBatteryModuleSharedObject: typeof ExpoBatteryModuleSharedObject;
}

export default requireNativeModule<ExpoBatteryModule>('ExpoBattery');
