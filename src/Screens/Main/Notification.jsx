import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import React from 'react';
import Header from '../../Components/FeedHeader';

const notifications = [
  {
    id: '1',
    title: 'New Delivery Assigned',
    description: 'You have a new delivery from “Fresh Mart”.',
    time: '2 mins ago',
    icon: 'https://cdn-icons-png.flaticon.com/512/3595/3595455.png',
  },
  {
    id: '2',
    title: 'Delivery Completed',
    description: 'Delivery to “John Doe” completed successfully.',
    time: '1 hour ago',
    icon: 'https://cdn-icons-png.flaticon.com/512/845/845646.png',
  },
  {
    id: '3',
    title: 'Weekly Bonus Credited',
    description: '₹500 bonus added to your wallet.',
    time: 'Today, 9:00 AM',
    icon: 'https://cdn-icons-png.flaticon.com/512/1170/1170627.png',
  },
  {
    id: '4',
    title: 'App Update Available',
    description: 'Update the app for latest features.',
    time: 'Yesterday, 5:30 PM',
    icon: 'https://cdn-icons-png.flaticon.com/512/1828/1828911.png',
  },
  {
    id: '5',
    title: 'Shift Reminder',
    description: 'Your shift starts in 30 minutes.',
    time: 'Yesterday, 3:00 PM',
    icon: 'https://cdn-icons-png.flaticon.com/512/2921/2921222.png',
  },
];

const Notification = () => {
  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      {/* <Image source={{uri: item.icon}} style={styles.icon} /> */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header showBack title="Notification" />
      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{padding: 16}}
      />
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'flex-start',
    borderBottomWidth: 0.5,
    paddingVertical: 5,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    fontSize: 12,
    color: '#555',
    marginBottom: 4,
  },
  time: {
    fontSize: 10,
    color: '#999',
  },
});
