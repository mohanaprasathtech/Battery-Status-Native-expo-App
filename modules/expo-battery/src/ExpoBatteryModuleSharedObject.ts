import { SharedObject, useReleasingSharedObject } from 'expo-modules-core';

import ExpoBatteryModule from './ExpoBatteryModule';

export declare class ExpoBatteryModuleSharedObject extends SharedObject {
  count: number;
}

/**
 * Creates a new ExpoBatteryModuleSharedObject instance.
 * You are responsible for releasing it from memory by calling `release()` when done.
 */
export function createExpoBatteryModuleSharedObject(): ExpoBatteryModuleSharedObject {
  return new ExpoBatteryModule.ExpoBatteryModuleSharedObject();
}

/**
 * A hook that creates a ExpoBatteryModuleSharedObject instance and automatically
 * releases it when the component unmounts.
 */
export function useExpoBatteryModuleSharedObject(): ExpoBatteryModuleSharedObject {
  return useReleasingSharedObject(() => new ExpoBatteryModule.ExpoBatteryModuleSharedObject(), []);
}
