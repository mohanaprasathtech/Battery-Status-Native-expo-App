import { SharedObject, useReleasingSharedObject } from 'expo-modules-core';

import MyBatteryModule from './MyBatteryModule';

export declare class MyBatteryModuleSharedObject extends SharedObject {
  count: number;
}

/**
 * Creates a new MyBatteryModuleSharedObject instance.
 * You are responsible for releasing it from memory by calling `release()` when done.
 */
export function createMyBatteryModuleSharedObject(): MyBatteryModuleSharedObject {
  return new MyBatteryModule.MyBatteryModuleSharedObject();
}

/**
 * A hook that creates a MyBatteryModuleSharedObject instance and automatically
 * releases it when the component unmounts.
 */
export function useMyBatteryModuleSharedObject(): MyBatteryModuleSharedObject {
  return useReleasingSharedObject(() => new MyBatteryModule.MyBatteryModuleSharedObject(), []);
}
