import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../Components/FeedHeader';
import {COLOR} from '../../Constants/Colors';
import {windowHeight} from '../../Constants/Dimensions';
import {ExploreEvent, fakePosts} from '../../Constants/Data';
import UserPost from '../../Components/UserPost';
import {ExploreEventItem} from './Explore';

const MyPost = ({navigation, route}) => {
  const title = route?.params?.title;
  return (
    <View style={styles.profileContainer}>
      <Header
        title={title}
        showBack
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      {title == 'My Posts' ? (
        <FlatList
          data={fakePosts}
          keyExtractor={item => item.id}
          renderItem={item => {
            return <UserPost item={item} />;
          }}
          contentContainerStyle={{paddingBottom: 20}}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <FlatList
          style={styles.flatList}
          data={ExploreEvent}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <ExploreEventItem item={item} />}
        />
      )}
    </View>
  );
};

export default MyPost;

const styles = StyleSheet.create({
  profileContainer: {
    height: windowHeight,
    backgroundColor: COLOR.white,
  },
});
