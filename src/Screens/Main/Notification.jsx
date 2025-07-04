import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import React, {useContext} from 'react';
import Header from '../../Components/FeedHeader';
import {LanguageContext} from '../../localization/LanguageContext';

const Notification = () => {
  const {strings} = useContext(LanguageContext);

  const notifications = [
    {
      id: '1',
      title: strings.new_delivery_assigned,
      description: `${strings.new_delivery_from} “Fresh Mart”.`,
      time: '2 mins ago',
      icon: 'https://cdn-icons-png.flaticon.com/512/3595/3595455.png',
    },
    {
      id: '2',
      title: strings.delivery_completed,
      description: `${strings.delivery_to} “John Doe” ${strings.completed_successfully}`,
      time: '1 hour ago',
      icon: 'https://cdn-icons-png.flaticon.com/512/845/845646.png',
    },
    {
      id: '3',
      title: strings.weekly_bonus_credited,
      description: '₹500 ' + strings.bonus_added,
      time: 'Today, 9:00 AM',
      icon: 'https://cdn-icons-png.flaticon.com/512/1170/1170627.png',
    },
    {
      id: '4',
      title: strings.app_update_available,
      description: strings.update_app_text,
      time: 'Yesterday, 5:30 PM',
      icon: 'https://cdn-icons-png.flaticon.com/512/1828/1828911.png',
    },
    {
      id: '5',
      title: strings.shift_reminder,
      description: `${strings.shift_starts_in} 30 ${strings.minutes}.`,
      time: 'Yesterday, 3:00 PM',
      icon: 'https://cdn-icons-png.flaticon.com/512/2921/2921222.png',
    },
  ];

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
      <Header showBack title={strings.notification} />
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
