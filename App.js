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
import { PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';

const App =  () => {

return (
    <PaperProvider>
    <AuthProvider>
        <Navigation />
    </AuthProvider>
    </PaperProvider>
);
}

export default App;
AppRegistry.registerComponent(appName, () => Main);