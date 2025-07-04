import React, {useContext, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Home from '../Screens/Main/Home';
import Profile from '../Screens/Main/Account';
import Order from '../Screens/Main/Order';
import Analytics from '../Screens/Main/MyRequest';
import MyBids from '../Screens/Main/MyBids';
import Bids from '../Screens/Main/Bids';
import MainCart from '../Screens/Main/Cart/MainCart';
import {COLOR} from '../Constants/Colors';
import MyRequest from '../Screens/Main/MyRequest';
import Wallet from '../Screens/Main/WalletPage/Wallet';
import { LanguageContext } from '../localization/LanguageContext';


const Tab = createBottomTabNavigator();



const BottomNavigation = () => {
  const insets = useSafeAreaInsets();
    const { strings} = useContext(LanguageContext);

    const icons = {
      [strings.home]: 'https://cdn-icons-png.flaticon.com/128/1946/1946488.png',
      [strings.orders]: 'https://cdn-icons-png.flaticon.com/128/1250/1250680.png',
      // Cart: 'https://cdn-icons-png.flaticon.com/128/833/833314.png',
      [strings.wallet]: 'https://cdn-icons-png.flaticon.com/128/8157/8157942.png',
      [strings.profile]: 'https://cdn-icons-png.flaticon.com/128/456/456283.png',
    };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: COLOR.royalBlue,
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 4,
        },
        tabBarStyle: {
          paddingVertical: 8,
          height: 70 + insets.bottom, // Add safe area bottom inset for Android/iOS
          paddingBottom: 0 + insets.bottom, // Padding to prevent overlap with nav buttons
        },
        tabBarIcon: ({focused}) => {
          const iconUri = icons[route.name];

          return (
            <Image
              source={{uri: iconUri}}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? COLOR.royalBlue : 'gray',
              }}
              resizeMode="contain"
            />
          );
        },
        tabBarLabel: ({color}) => {
          let label = route.name;
          if (route.name === 'Cart') label = 'Cart'; // Fix label spacing

          return (
            <Text
              style={{color, fontSize: 12, marginTop: 4, textAlign: 'center'}}>
              {label}
            </Text>
          );
        },
      })}>
      <Tab.Screen name={strings.home} component={Home} />
      <Tab.Screen name={strings.orders} component={Order} />
      {/* <Tab.Screen name="Cart" component={MainCart} /> */}
      <Tab.Screen name={strings.wallet} component={Wallet} />
      <Tab.Screen name={strings.profile} component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
