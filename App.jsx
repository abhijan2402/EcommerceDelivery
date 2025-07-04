import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigation from './src/navigators/MainNavigation';
import {AuthProvider} from './src/Backend/AuthContent';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {LanguageProvider} from './src/localization/LanguageContext';

const App = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
          <NavigationContainer>
            <MainNavigation />
          </NavigationContainer>
        </SafeAreaView>
      </AuthProvider>
    </LanguageProvider>
  );
};

export default App;
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff', // Match your app's background
  },
});
