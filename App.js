import React, { useContext, useState } from 'react';
import {
SafeAreaView,
ScrollView,
StatusBar,
StyleSheet,
Text,
useColorScheme,
View,
TextInput,
TouchableOpacity,
} from 'react-native';
import {
Colors,
DebugInstructions,
Header,
LearnMoreLinks,
ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


import { AuthContext, AuthProvider } from './context/AuthContext';
import Navigation from './Navigation';
import { AppRegistry } from 'react-native';
import { PaperProvider,  MD3LightTheme as DefaultTheme } from 'react-native-paper';
import { name as appName } from './app.json';

const customTheme = {
    ...DefaultTheme,
    dark: true,
    roundness: 4,
    colors: {
      ...DefaultTheme.colors,
      primary: "#FF0000",
      primaryContainer: "#7FAF73",
      secondary: "#00FF00",
      secondaryContainer: "#FFFF00",
      tertiary: "#800080",
      tertiaryContainer: "#FFA500",
      surface: "#FFC0CB",
      surfaceVariant: "#008080",
      surfaceDisabled: "#808080",
      background: "#FFFFFF",
      error: "#A52A2A",
      errorContainer: "#808080",
      onPrimary: "#00FFFF",
      onPrimaryContainer: "#FFFFFF",
      onSecondary: "#00FF00",
      onSecondaryContainer: "#808000",
      onTertiary: "#800000",
      onTertiaryContainer: "#000080",
      onSurface: "#C0C0C0",
      onSurfaceVariant: "#FFD700",
      onSurfaceDisabled: "#808080",
      onError: "#4B0082",
      onErrorContainer: "#FF7F50",
      onBackground: "#F5F5DC",
      outline: "#CD853F",
      outlineVariant: "#708090",
      inverseSurface: "#7FFFD4",
      inverseOnSurface: "#BDB76B",
      inversePrimary: "#DA70D6",
      shadow: "#E6E6FA",
      scrim: "#D8BFD8",
      backdrop: "#808080",
    },
  };

const App =  () => {

return (
    <PaperProvider theme={customTheme}>
    <AuthProvider>
        <Navigation />
    </AuthProvider>
    </PaperProvider>
);
}

export default App;
AppRegistry.registerComponent(appName, () => Main);