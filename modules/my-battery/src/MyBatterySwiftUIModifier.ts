import { createModifier, type ModifierConfig } from '@expo/ui/swift-ui/modifiers';

export const myBatterySwiftUIModifier = (params: {
  color?: string;
  width?: number;
  cornerRadius?: number;
}): ModifierConfig => createModifier('myBatterySwiftUIModifier', params);
