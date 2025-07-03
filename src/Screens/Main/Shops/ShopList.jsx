import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../../Components/FeedHeader';
import {ShopList} from '../Home';
import {Fakeshops} from '../../../Constants/Data';

const ShopLists = () => {
  return (
    <View>
      <Header showBack title={'Shops'} />
      <ScrollView style={{paddingHorizontal: 10}}>
        <ShopList shops={Fakeshops} />
      </ScrollView>
    </View>
  );
};

export default ShopLists;

const styles = StyleSheet.create({});
