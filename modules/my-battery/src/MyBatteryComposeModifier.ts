import { createModifier, type ModifierConfig } from '@expo/ui/jetpack-compose/modifiers';

export const myBatteryComposeModifier = (params: {
  color?: number;
  width?: number;
  cornerRadius?: number;
}): ModifierConfig => createModifier('myBatteryComposeModifier', params);
