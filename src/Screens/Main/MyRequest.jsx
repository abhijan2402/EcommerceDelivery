import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Header from '../../Components/FeedHeader';
import {COLOR} from '../../Constants/Colors';

const MyRequest = ({navigation}) => {
  const requests = [
    {
      id: '1',
      productName: 'iPhone 14 Pro',
      requestDate: '2025-05-30',
      totalBids: 3,
    },
    {
      id: '2',
      productName: 'Sony WH-1000XM5 Headphones',
      requestDate: '2025-05-28',
      totalBids: 5,
    },
    {
      id: '3',
      productName: 'Samsung Galaxy Tab S9',
      requestDate: '2025-05-25',
      totalBids: 2,
    },
  ];

  const handleOffersPress = item => {
    console.log('Go to offers for:', item.productName);
    // You can use navigation here like:
    navigation.navigate('OffersScreen', {requestId: item.id});
  };

  return (
    <View style={styles.container}>
      <Header title="My Requests" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {requests.map(item => (
          <View key={item.id} style={styles.card}>
            <View style={styles.rowBetween}>
              <Text style={styles.productName}>{item.productName}</Text>
              <Text style={styles.bidsCount}>{item.totalBids} Bids</Text>
            </View>
            <Text style={styles.requestDate}>
              Requested on: {item.requestDate}
            </Text>
            <TouchableOpacity
              onPress={() => handleOffersPress(item)}
              style={styles.offerButton}>
              <Text style={styles.offerButtonText}>View Proposal</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default MyRequest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: {width: 0, height: 3},
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  bidsCount: {
    fontSize: 14,
    fontWeight: '500',
    color: COLOR.royalBlue,
  },
  requestDate: {
    fontSize: 13,
    color: '#555',
    marginTop: 6,
    marginBottom: 12,
  },
  offerButton: {
    backgroundColor: COLOR.royalBlue,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  offerButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
