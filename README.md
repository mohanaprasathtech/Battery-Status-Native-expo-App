# NativeBatteryDemo 🔋

A minimal [Expo](https://expo.dev) app that reads the **real battery level and charging state**
straight from the phone's operating system — through a **custom native module written from
scratch** in Swift (iOS) and Kotlin (Android).

There is no `expo-battery` dependency here. The native code is in this repo, under
[`modules/my-battery/`](modules/my-battery).

---

## Demo

![NativeBatteryDemo running on Android](docs/demo.gif)

Splash screen → the battery screen. The gauge fills to the real level, the number and status
update live, and a ⚡ bolt appears and pulses while the device is charging.

▶️ **Full-quality recording:** [`docs/demo.mov`](docs/demo.mov) *(click to download — GitHub
does not play `.mov` files inline, which is why the GIF above exists)*

---

## What the app does

One screen, split exactly in half:

```
┌────────────────────────────┐
│                            │
│      ┌──────────────┐      │
│      │████████░░░░░ │▐     │  ← top 50%: animated battery
│      └──────────────┘      │     fill slides · ⚡ pulses when charging
│                            │
├────────────────────────────┤
│  ┌──────────────────────┐  │
│  │   BATTERY LEVEL      │  │
│  │        87%           │  │  ← bottom 50%: live readings
│  └──────────────────────┘  │
│  ┌──────────────────────┐  │
│  │   BATTERY STATUS     │  │
│  │     Plugged in       │  │
│  └──────────────────────┘  │
└────────────────────────────┘
```

| Behaviour | Detail |
|---|---|
| Fill animation | `withTiming`, 900 ms, eased — the bar glides instead of jumping |
| Charging bolt | Appears only when plugged in, breathes on an infinite `withRepeat` loop |
| Low-battery pulse | Under 20 % and unplugged, the fill pulses to draw the eye |
| Colour by level | 🔴 ≤ 20 % · 🟠 ≤ 50 % · 🟢 above |
| Live updates | Polls the native module every 2 s, plus an extra read whenever the app returns to the foreground |
| Dark mode | Follows the system theme automatically |
| Unknown state | Shows `—` / `Unknown` where the platform can't report (web, iOS Simulator) |

Built with plain `View`s and `react-native-reanimated` — **no SVG or charting library**.

---

## The native module

[`modules/my-battery/`](modules/my-battery) is a local Expo module. The same API is implemented
three times, once per platform:

| Platform | File | How it reads the battery |
|---|---|---|
| 🤖 Android | [`android/.../MyBatteryModule.kt`](modules/my-battery/android/src/main/java/expo/modules/mybattery/MyBatteryModule.kt) | `BatteryManager.BATTERY_PROPERTY_CAPACITY` + the sticky `ACTION_BATTERY_CHANGED` intent |
| 🍎 iOS | [`ios/MyBatteryModule.swift`](modules/my-battery/ios/MyBatteryModule.swift) | `UIDevice.current.batteryLevel` / `.batteryState` |
| 🌐 Web | [`src/MyBatteryModule.web.ts`](modules/my-battery/src/MyBatteryModule.web.ts) | Stub — reports "unknown" (browsers only expose battery asynchronously, and not everywhere) |

### API

```ts
import MyBatteryModule from './modules/my-battery/src/MyBatteryModule';

MyBatteryModule.getBatteryLevel(); // number  — 0-100, or -1 when unknown
MyBatteryModule.isPluggedIn();     // boolean — true while charging / plugged in
```

Both are **synchronous** — they return a snapshot, so the app polls them from
[`src/hooks/use-battery.ts`](src/hooks/use-battery.ts).

### How a call travels

```
src/app/index.tsx
   └─ useBattery()                         src/hooks/use-battery.ts
        └─ MyBatteryModule.getBatteryLevel()
             └─ requireNativeModule('MyBattery')      ← crosses the JS ↔ native bridge
                  ├─ 🤖 Name("MyBattery")  MyBatteryModule.kt
                  └─ 🍎 Name("MyBattery")  MyBatteryModule.swift
```

The string in `requireNativeModule()` **must match** `Name(...)` in both native files. That is the
entire binding — everything else is ordinary code.

> The module also still carries the scaffolding `create-expo-module` generates — `hello()`,
> `setValueAsync()`, an `onChange` event, a shared object, and example views for SwiftUI and
> Jetpack Compose. None of it is used by the app; it is left in as a reference.

---

## Project structure

```
NativeBatteryDemo/
├── src/
│   ├── app/                      # screens — file name = route (Expo Router)
│   │   ├── _layout.tsx           #   wrapper: theme provider, splash, tab bar
│   │   └── index.tsx             #   the battery screen ("/")
│   ├── components/
│   │   ├── battery-gauge.tsx     #   the animated battery
│   │   ├── themed-text.tsx       #   text that follows light/dark mode
│   │   ├── themed-view.tsx       #   box that follows light/dark mode
│   │   ├── app-tabs.tsx          #   bottom tab bar   (.web.tsx = browser version)
│   │   ├── animated-icon.tsx     #   splash animation (.web.tsx = browser version)
│   │   └── external-link.tsx
│   ├── hooks/
│   │   ├── use-battery.ts        #   polls the native module
│   │   ├── use-theme.ts          #   resolves the active colour set
│   │   └── use-color-scheme.ts   #   (.web.ts = browser version)
│   ├── constants/theme.ts        # colours, spacing, fonts — single source of truth
│   └── global.css                # web-only styling
│
├── modules/my-battery/           # the custom native module
│   ├── expo-module.config.json   #   tells Expo which native classes to link
│   ├── src/                      #   TypeScript side
│   ├── ios/                      #   Swift side
│   └── android/                  #   Kotlin side
│
├── assets/images/                # icons, splash, tab icons
├── docs/                         # demo.gif + demo.mov
├── app.json                      # app name, icons, splash, plugins
├── package.json                  # dependencies + scripts
└── tsconfig.json                 # strict mode, "@/*" → "./src/*"
```

**File naming conventions used throughout:**

- `_layout.tsx` — a wrapper, not a screen (the leading `_` excludes it from routing)
- `*.web.tsx` / `*.web.ts` — automatically used instead of the base file when running in a browser
- `@2x` / `@3x` images — higher-density variants, picked automatically by the bundler

---

## Running it

### ⚠️ Expo Go will not work

This app contains custom native code. Expo Go is a pre-built binary and cannot load it — you
need a **development build**, which compiles the Swift/Kotlin into the app itself.

### Prerequisites

| | |
|---|---|
| Node.js | 18+ |
| JDK | 17+ (Android) |
| Android SDK | platform **36**, build-tools **36.0.0**, NDK **27.1.12297006** |
| Xcode | for iOS; the module targets **iOS 16.4+** |

`ANDROID_HOME` must be set **in the profile your shell actually reads** — `~/.zshrc` for zsh
(the macOS default), not `~/.bash_profile`:

```bash
export ANDROID_HOME="$HOME/Library/Android/sdk"
export PATH="$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator"
```

### Install and run

```bash
npm install

npx expo run:android     # builds, installs and launches a development build
npx expo run:ios         # same, for iOS
```

The first build takes 5–15 minutes. Afterwards you get a **new app icon** on the device — use
that one, not Expo Go.

For day-to-day JS work, the dev build connects to the normal dev server:

```bash
npm start
```

> **iOS Simulator has no battery**, so it reports `—` / `Unknown`. Use a real device to see real
> values.

---

## Things worth knowing

**Native changes need a rebuild.** Editing `.tsx` hot-reloads instantly. Editing `.kt`, `.swift`,
`app.json`, `build.gradle` or `expo-module.config.json` does not — that code lives inside the
compiled app, so you have to run `npx expo run:android` again. Reloading will not help.

**Adding a native function means touching three files.** The TypeScript declaration
(`MyBatteryModule.ts`), the Kotlin implementation, and the Swift implementation — with the
function name spelled identically in all three. Miss one and you get
`undefined is not a function` at runtime, because the TypeScript `declare` block is a promise
that is never verified.

**The module name is a global namespace.** This module was originally called `ExpoBattery` —
the exact name Expo's own `expo-battery` package registers. When that happens, Expo silently
hands you *its* module instead of yours, and the failure looks like a missing function rather
than a naming conflict. It was renamed to `MyBattery` (and the Android package to
`expo.modules.mybattery`, which also collided) to avoid this.

**Useful debugging one-liner.** When a native module misbehaves, print what you are actually
talking to:

```ts
console.log(Object.keys(MyBatteryModule));
```

---

## Tech stack

Expo SDK 57 · React Native 0.86 · React 19 · TypeScript 6 (strict) ·
Expo Router (file-based routing, typed routes) · React Native Reanimated 4 ·
Expo Modules API (Swift + Kotlin)

---

## Licence

MIT — see [LICENSE](LICENSE).
