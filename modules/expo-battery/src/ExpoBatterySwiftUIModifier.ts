import { createModifier, type ModifierConfig } from '@expo/ui/swift-ui/modifiers';

export const expoBatterySwiftUIModifier = (params: {
  color?: string;
  width?: number;
  cornerRadius?: number;
}): ModifierConfig => createModifier('expoBatterySwiftUIModifier', params);
