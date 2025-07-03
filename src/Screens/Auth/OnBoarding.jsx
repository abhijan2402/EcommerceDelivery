import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {COLOR} from '../../Constants/Colors';
import CustomButton from '../../Components/CustomButton';

const {width, height} = Dimensions.get('window');
const slides = [
  {
    key: '1',
    title: 'Welcome to FastDrop Partner!',
    description:
      'Join our delivery team and start earning by delivering food, groceries, and more to nearby customers.',
    image:
      'https://img.freepik.com/premium-vector/delivery-boy-scooter-doing-delivery-service-illustration_602666-23.jpg?semt=ais_items_boosted&w=740', // Delivery rider introduction
  },
  {
    key: '2',
    title: 'Get Orders Instantly',
    description:
      'Receive delivery requests in real-time and accept orders with a single tap.',
    image:
      'https://thumbs.dreamstime.com/b/portrait-thoughtful-young-delivery-indian-man-red-shirt-leaning-boxes-holding-mobile-phone-isolated-white-144540334.jpg', // Accepting order
  },
];

const OnBoarding = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef();

  const handleScroll = event => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current.scrollToIndex({index: currentIndex + 1});
    } else {
      navigation.navigate('Login');
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.slide}>
      <Image
        source={{uri: item.image}}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        keyExtractor={item => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
      <View style={styles.footer}>
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, currentIndex === index && styles.activeDot]}
            />
          ))}
        </View>
        <CustomButton
          title={currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
          onPress={handleNext}
          style={{marginBottom: 20}}
        />
      </View>
    </View>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  slide: {
    width: width,
    alignItems: 'center',
    // padding: 20,
  },
  image: {
    height: height * 0.5,
    width: width,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: COLOR.black,
    textAlign: 'center',
    marginTop: 20,
  },
  description: {
    fontSize: 15,
    color: COLOR.black,
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 15,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  pagination: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  dot: {
    height: 8,
    width: 8,
    backgroundColor: '#ccc',
    borderRadius: 4,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: COLOR.primary || '#007AFF',
    width: 20,
  },
});
