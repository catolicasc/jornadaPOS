/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
  primary: "#FF4924", // Cor principal (laranja/vermelho)
  black: "#060606", // Preto para fundos
  gray: "#CACACA", // Cinza para textos secundários
  darkGray: "#333333", // Cinza escuro para elementos
  lightGray: "#E5E5E5", // Cinza claro para divisores
  primaryLight: "#FF7A5E", // Versão mais clara da cor principal
  primaryDark: "#CC3A1D", // Versão mais escura da cor principal
  overlay: "rgba(6, 6, 6, 0.8)", // Overlay para modais
};
