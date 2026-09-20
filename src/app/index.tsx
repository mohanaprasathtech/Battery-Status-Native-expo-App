import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BatteryGauge, batteryColor } from '@/components/battery-gauge';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useBattery } from '@/hooks/use-battery';

export default function HomeScreen() {
  const { level, pluggedIn } = useBattery();
  const known = level >= 0;

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Top half — the animated battery */}
        <ThemedView style={styles.half}>
          <BatteryGauge level={level} pluggedIn={pluggedIn} />
        </ThemedView>

        {/* Bottom half — the readings */}
        <ThemedView style={styles.half}>
          <ThemedView type="backgroundElement" style={styles.card}>
            <ThemedText type="small" themeColor="textSecondary" style={styles.label}>
              Battery level
            </ThemedText>
            <ThemedText style={[styles.value, { color: batteryColor(level) }]}>
              {known ? `${level}%` : '—'}
            </ThemedText>
          </ThemedView>

          <ThemedView type="backgroundElement" style={styles.card}>
            <ThemedText type="small" themeColor="textSecondary" style={styles.label}>
              Battery status
            </ThemedText>
            <ThemedText style={styles.value}>{pluggedIn ? 'Plugged in' : 'Unplugged'}</ThemedText>
          </ThemedView>
        </ThemedView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  safeArea: {
    flex: 1,
    width: '100%',
    maxWidth: MaxContentWidth,
    paddingHorizontal: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.three,
  },
  /** Two equal halves: the gauge on top, the numbers underneath. */
  half: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.three,
  },
  card: {
    alignSelf: 'stretch',
    alignItems: 'center',
    gap: Spacing.one,
    paddingVertical: Spacing.four,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.four,
  },
  label: {
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  value: {
    fontSize: 40,
    lineHeight: 48,
    fontWeight: '700',
  },
});
