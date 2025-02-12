/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fffcf7';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff8f8', // Default Background Color
    tint: tintColorLight,
    icon: '#f41747', // Secondary Color
    tabIconDefault: '#f41747', // Secondary Color
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#f41747', // Secondary Color
    tabIconDefault: '#f41747', // Secondary Color
    tabIconSelected: tintColorDark,
  },
};