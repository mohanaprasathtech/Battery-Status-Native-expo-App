import { SymbolView } from 'expo-symbols';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const BODY_WIDTH = 260;
const BODY_HEIGHT = 124;
const BORDER = 7;
const RADIUS = 28;
const TRACK_PADDING = 8;

const LOW = '#FF453A';
const MEDIUM = '#FF9F0A';
const HIGH = '#30D158';
const UNKNOWN = '#8E8E93';

/** Below this, an unplugged battery pulses to draw the eye. */
const LOW_THRESHOLD = 20;

export function batteryColor(level: number) {
  if (level < 0) return UNKNOWN;
  if (level <= LOW_THRESHOLD) return LOW;
  if (level <= 50) return MEDIUM;
  return HIGH;
}

export type BatteryGaugeProps = {
  /** 0-100, or -1 when unknown. */
  level: number;
  pluggedIn: boolean;
};

export function BatteryGauge({ level, pluggedIn }: BatteryGaugeProps) {
  const theme = useTheme();

  const known = level >= 0;
  const percent = known ? Math.min(100, Math.max(0, level)) : 0;
  const color = batteryColor(level);
  const isLow = known && !pluggedIn && level <= LOW_THRESHOLD;
  // Charging or critically low: breathe. Otherwise hold steady.
  const shouldPulse = pluggedIn || isLow;

  const fill = useSharedValue(0);
  const pulse = useSharedValue(0);

  useEffect(() => {
    fill.value = withTiming(percent, {
      duration: 900,
      easing: Easing.out(Easing.cubic),
    });
  }, [percent, fill]);

  useEffect(() => {
    if (shouldPulse) {
      pulse.value = withRepeat(
        withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.quad) }),
        -1,
        true
      );
    } else {
      cancelAnimation(pulse);
      pulse.value = withTiming(0, { duration: 250 });
    }

    return () => cancelAnimation(pulse);
  }, [shouldPulse, pulse]);

  const fillStyle = useAnimatedStyle(() => ({
    width: `${fill.value}%`,
    opacity: 1 - pulse.value * 0.4,
  }));

  const boltStyle = useAnimatedStyle(() => ({
    opacity: 0.45 + pulse.value * 0.55,
    transform: [{ scale: 0.92 + pulse.value * 0.16 }],
  }));

  return (
    <Animated.View entering={FadeIn.duration(400)} style={styles.wrapper}>
      <View style={[styles.body, { borderColor: theme.text }]}>
        <View style={[styles.track, { backgroundColor: theme.backgroundElement }]}>
          <Animated.View style={[styles.fill, { backgroundColor: color }, fillStyle]} />
        </View>

        {pluggedIn && (
          <Animated.View style={[styles.bolt, boltStyle]} pointerEvents="none">
            <SymbolView
              name={{ ios: 'bolt.fill', android: 'bolt', web: 'bolt' }}
              size={52}
              tintColor={theme.text}
            />
          </Animated.View>
        )}
      </View>

      <View style={[styles.cap, { backgroundColor: theme.text }]} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  body: {
    width: BODY_WIDTH,
    height: BODY_HEIGHT,
    borderWidth: BORDER,
    borderRadius: RADIUS,
    padding: TRACK_PADDING,
    justifyContent: 'center',
  },
  track: {
    flex: 1,
    borderRadius: RADIUS - BORDER - TRACK_PADDING / 2,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  fill: {
    height: '100%',
    borderRadius: RADIUS - BORDER - TRACK_PADDING / 2,
  },
  bolt: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cap: {
    width: 12,
    height: 44,
    marginLeft: Spacing.half,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
});
