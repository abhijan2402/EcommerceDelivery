import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Animated,
} from 'react-native';
import Header from '../../../Components/FeedHeader';
import CustomButton from '../../../Components/CustomButton';
import {COLOR} from '../../../Constants/Colors';

const starImages = {
  filled: 'https://cdn-icons-png.flaticon.com/512/1828/1828884.png',
  empty: 'https://cdn-icons-png.flaticon.com/512/1828/1828970.png',
};

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [scale] = useState(new Animated.Value(1));

  const animateStar = () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.5,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleRating = value => {
    setRating(value);
    animateStar();
  };

  const handleSubmit = () => {
    if (!rating) {
      Alert.alert('Please select a rating');
      return;
    }

    Alert.alert('Thank you!', `Rating: ${rating} stars\nReview: ${review}`);
    // submit to backend
  };

  return (
    <View style={styles.container}>
      <Header title="Feedback" showBack />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Order Summary */}
        <View style={styles.orderCard}>
          <Text style={styles.orderLabel}>Order ID</Text>
          <Text style={styles.orderValue}>#ORD123456</Text>
          <Text style={[styles.orderLabel, {marginTop: 8}]}>Order Title</Text>
          <Text style={styles.orderValue}>Apple iPhone 14 Pro Max</Text>
        </View>

        {/* Star Rating */}
        <Text style={styles.sectionTitle}>Rate Your Experience</Text>
        <View style={styles.stars}>
          {[1, 2, 3, 4, 5].map(i => (
            <TouchableOpacity key={i} onPress={() => handleRating(i)}>
              <Animated.Image
                source={{
                  uri: i <= rating ? starImages.filled : starImages.empty,
                }}
                style={[styles.star, {transform: [{scale}]}]}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Review Input */}
        <Text style={styles.sectionTitle}>Write a Review</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Share your experience..."
          multiline
          value={review}
          onChangeText={setReview}
        />
        <CustomButton title={'Submit Feedback'} onPress={handleSubmit} />
        {/* Submit Button */}
        {/* <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit Feedback</Text>
        </TouchableOpacity> */}
      </ScrollView>
    </View>
  );
};

export default Feedback;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  content: {
    padding: 20,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 3},
    elevation: 3,
  },
  orderLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6B7280',
  },
  orderValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 10,
  },
  stars: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  star: {
    width: 34,
    height: 34,
    marginRight: 10,
  },
  textInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    fontSize: 14,
    color: '#111',
    minHeight: 120,
    textAlignVertical: 'top',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowOffset: {width: 0, height: 1},
    elevation: 1,
  },
  button: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
});
