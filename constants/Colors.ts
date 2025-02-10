/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#000',
    background: '#fff',
    tint: '#2f95dc',
    icon: '#999',
    error: '#ff4444',
    disabled: '#cccccc',
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: '#fff',
    icon: '#666',
    error: '#ff6b6b',
    disabled: '#666666',
  },
} as const;

export type ColorScheme = keyof typeof Colors;
