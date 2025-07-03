import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Header from '../../../Components/FeedHeader';
import {COLOR} from '../../../Constants/Colors';

const OffersScreen = () => {
  const [offers, setOffers] = useState([
    {
      id: 'shop1',
      shopName: 'TechGuru Store',
      price: 999,
      deliveryTime: '3-5 days',
      message: 'We offer genuine product with 1 year warranty.',
      isAccepted: false,
    },
    {
      id: 'shop2',
      shopName: 'GadgetWorld',
      price: 950,
      deliveryTime: '4-6 days',
      message: 'Fast delivery and cash on delivery available.',
      isAccepted: false,
    },
    {
      id: 'shop3',
      shopName: 'DigitalMarket',
      price: 970,
      deliveryTime: '2-4 days',
      message: 'Best quality guaranteed.',
      isAccepted: false,
    },
  ]);

  const handleAccept = id => {
    Alert.alert('Confirm', 'Are you sure you want to accept this offer?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Accept',
        onPress: () => {
          setOffers(prev =>
            prev.map(offer =>
              offer.id === id
                ? {...offer, isAccepted: true}
                : {...offer, isAccepted: false},
            ),
          );
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Header title="Offers" showBack />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {offers.map(offer => (
          <View key={offer.id} style={styles.card}>
            <View style={styles.rowBetween}>
              <Text style={styles.shopName}>{offer.shopName}</Text>
              {offer.isAccepted && (
                <Text style={styles.acceptedText}>Accepted</Text>
              )}
            </View>
            <Text style={styles.text}>💰 Price: ₹{offer.price}</Text>
            <Text style={styles.text}>🚚 Delivery: {offer.deliveryTime}</Text>
            <Text style={styles.text}>📩 Message: {offer.message}</Text>

            {!offer.isAccepted && (
              <TouchableOpacity
                style={styles.acceptButton}
                onPress={() => handleAccept(offer.id)}>
                <Text style={styles.acceptButtonText}>Accept Offer</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default OffersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  shopName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  acceptedText: {
    color: '#28a745',
    fontWeight: '600',
    fontSize: 14,
  },
  text: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  acceptButton: {
    backgroundColor: COLOR.royalBlue,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 14,
  },
  acceptButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});
