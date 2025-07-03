import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import React from 'react';
import Header from '../../Components/FeedHeader';
import {COLOR} from '../../Constants/Colors';
import {windowHeight, windowWidth} from '../../Constants/Dimensions';
import {ExploreEvent} from '../../Constants/Data';

const Explore = ({navigation}) => {
  return (
    <View style={styles.MainView}>
      <Header title={'Explore'} />
      <FlatList
        style={styles.flatList}
        data={ExploreEvent}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <ExploreEventItem item={item} />}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('AddEvent');
        }}
        style={styles.AddFeedBtn}>
        <Image
          style={{width: 60, height: 60}}
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/128/18758/18758102.png',
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Explore;
export const ExploreEventItem = ({item}) => {
  return (
    <View style={styles.card}>
      {/* User Info */}
      <View style={styles.userInfo}>
        <Image source={{uri: item.profileImage}} style={styles.profileImage} />
        <View style={styles.usernameContainer}>
          <Text style={styles.usernameText}>{item.username}</Text>
          <Text style={styles.locationText}>{item.location}</Text>
        </View>

        <View style={styles.enrollmentContainer}>
          <View style={styles.enrollmentBox}>
            <Text style={styles.enrolledNumber}>10</Text>
            <Text style={styles.enrollmentLabel}>Enrolled</Text>
          </View>
          <View style={styles.enrollmentBoxNoBorder}>
            <Text style={styles.availableNumber}>4</Text>
            <Text style={styles.enrollmentLabel}>Available</Text>
          </View>
        </View>
      </View>

      {/* Description */}
      <Text style={styles.description}>{item.description}</Text>

      {/* Event Images */}
      <FlatList
        data={item.eventImages}
        keyExtractor={(image, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.eventImagesList}
        renderItem={({item: image}) => (
          <Image source={{uri: image}} style={styles.eventImage} />
        )}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.dateText}>
            Date - {item.dateTime?.split(' ')[0]}
          </Text>
          <Text style={styles.timeText}>
            Time - {item.dateTime?.split(' ').slice(1).join(' ')}
          </Text>
        </View>
        <TouchableOpacity style={styles.enrollButton}>
          <Text style={styles.enrollButtonText}>Enroll Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  MainView: {
    backgroundColor: COLOR.white,
    height: windowHeight,
  },
  flatList: {
    marginBottom: 50,
  },
  card: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  usernameContainer: {
    marginLeft: 10,
    width: windowWidth / 2.1,
  },
  usernameText: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  locationText: {
    // No special styling, it's just default <Text>.
  },
  enrollmentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  enrollmentBox: {
    marginRight: 5,
    borderRightWidth: 0.5,
    borderRightColor: COLOR.lightGrey,
    paddingRight: 5,
    alignItems: 'center',
  },
  enrollmentBoxNoBorder: {
    alignItems: 'center',
  },
  enrolledNumber: {
    fontSize: 15,
    color: COLOR.blue,
    fontWeight: '600',
  },
  availableNumber: {
    fontSize: 15,
    color: COLOR.green,
    fontWeight: '600',
  },
  enrollmentLabel: {
    fontSize: 11,
    color: COLOR.grey,
    fontWeight: '400',
  },
  description: {
    marginTop: 10,
  },
  eventImagesList: {
    marginTop: 10,
  },
  eventImage: {
    width: 300,
    height: 200,
    marginRight: 10,
    borderRadius: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 0.5,
    borderTopColor: COLOR.lightGrey,
    paddingTop: 10,
    marginTop: 5,
  },
  dateText: {
    width: windowWidth / 2,
  },
  timeText: {
    width: windowWidth / 2,
  },
  enrollButton: {
    backgroundColor: COLOR.royalBlue,
    padding: 10,
    borderRadius: 7,
  },
  enrollButtonText: {
    color: COLOR.white,
    textAlign: 'center',
    fontSize: 12,
  },
  AddFeedBtn: {
    position: 'absolute',
    bottom: 85,
    right: 40,
    backgroundColor: COLOR.white,
    borderRadius: 50,
    elevation: 10,
    shadowColor: COLOR.black,
  },
});
