import { registerWebModule, NativeModule } from 'expo';

import { MyBatteryModuleEvents } from './MyBattery.types';

class MyBatteryModule extends NativeModule<MyBatteryModuleEvents> {
  PI = Math.PI;

  hello() {
    return 'Hello world! 👋';
  }

  getBatteryLevel(): number {
    // Browsers only expose the battery asynchronously (navigator.getBattery()),
    // and not in every browser, so the synchronous web version reports "unknown".
    return -1;
  }

  isPluggedIn(): boolean {
    return false;
  }

  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
}

export default registerWebModule(MyBatteryModule, 'MyBatteryModule');
