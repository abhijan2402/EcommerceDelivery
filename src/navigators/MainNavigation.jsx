import React, {useContext, useEffect, useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {AuthContext} from '../Backend/AuthContent';
import RootNavigation from './RootNavigation';
import AuthStack from './AuthNavigation';
import {ToastProvider, useToast} from '../Constants/ToastContext';
import {useApi} from '../Backend/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainNavigation = () => {
  const auth = useContext(AuthContext);
  const {getRequest} = useApi();
  // const showToast = useToast();
  const [loadingLocal, setLoadingLocal] = useState(true);

  if (!auth) {
    console.error('AuthContext not found');
    return null;
  }

  const {user, setUser, loading, setToken} = auth;

  const fetchProfile = async userId => {
    try {
      const response = await getRequest(`api/get-profile/${userId}`, true);
      if (response?.success) {
        const data = response?.data;
        console.log(data, '📦 Updated Profile from API');
        const storedToken = await AsyncStorage.getItem('token');
        setToken(JSON.parse(storedToken));
        setUser(data);
      } else {
        // showToast(`${response?.error} || Failed to fetch profile`, 'error');
      }
    } catch (error) {
      // showToast(`Something went wrong while fetching profile`, 'error');
    }
  };

  useEffect(() => {
    const checkStoredUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('userData');

        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          const userId = parsedUser?.user?.id;

          if (userId) {
            await fetchProfile(userId); // update with latest profile
          } else {
            console.warn('User ID not found in stored userData');
          }
        }
      } catch (err) {
        console.error('❌ Failed to load user from AsyncStorage', err);
      } finally {
        setLoadingLocal(false);
      }
    };

    checkStoredUser();
  }, []);

  if (loading || loadingLocal) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <ToastProvider>{user ? <RootNavigation /> : <AuthStack />}</ToastProvider>
    </View>
  );
};

export default MainNavigation;
