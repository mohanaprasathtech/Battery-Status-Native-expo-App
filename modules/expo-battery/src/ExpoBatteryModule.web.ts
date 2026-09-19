import { registerWebModule, NativeModule } from 'expo';

import { ExpoBatteryModuleEvents } from './ExpoBattery.types';

class ExpoBatteryModule extends NativeModule<ExpoBatteryModuleEvents> {
  PI = Math.PI;

  hello() {
    return 'Hello world! 👋';
  }

  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
}

export default registerWebModule(ExpoBatteryModule, 'ExpoBatteryModule');
