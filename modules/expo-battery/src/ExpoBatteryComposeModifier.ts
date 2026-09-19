import { createModifier, type ModifierConfig } from '@expo/ui/jetpack-compose/modifiers';

export const expoBatteryComposeModifier = (params: {
  color?: number;
  width?: number;
  cornerRadius?: number;
}): ModifierConfig => createModifier('expoBatteryComposeModifier', params);
