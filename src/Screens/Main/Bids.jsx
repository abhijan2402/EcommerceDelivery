import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Header from '../../Components/FeedHeader';
import {COLOR} from '../../Constants/Colors';

const Bids = () => {
  const [bids, setBids] = useState([
    {
      id: '1',
      productImage:
        'https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg',
      productName: 'Wireless Headphones',
      bidAmount: 1299,
      deliveryDate: '2025-06-05',
      available: true,
      color: 'Black',
      size: 'M',
    },
    {
      id: '2',
      productImage:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAF-LhNPbY88qcvrLYL-juANrLz-X5JWJ1m5URwsUAEXzCTVACGtnGO0_PaS01aQ8pX74&usqp=CAU',
      productName: 'Smart Watch',
      bidAmount: 2200,
      deliveryDate: '2025-06-10',
      available: false,
      color: 'Silver',
      size: 'One Size',
    },
  ]);

  const renderBid = ({item}) => (
    <View style={styles.card}>
      <Image source={{uri: item.productImage}} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.productName}</Text>
        {/* <Text style={styles.detail}>💰 Bid: ₹{item.bidAmount}</Text> */}
        <Text style={styles.detail}>📅 Delivery: {item.deliveryDate}</Text>
        <Text style={styles.detail}>
          📦 Available:{' '}
          <Text style={{color: item.available ? 'green' : 'red'}}>
            {item.available ? 'Yes' : 'No'}
          </Text>
        </Text>
        <Text style={styles.detail}>🎨 Color: {item.color}</Text>
        <Text style={styles.detail}>📏 Size: {item.size}</Text>
        <Text
          style={[
            styles.detail,
            {
              fontSize: 15,
              fontWeight: '600',
              color: COLOR.black,
              textAlign: 'right',
            },
          ]}>
          💰 Bid: ₹{item.bidAmount}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title={'Bids'} />
      <FlatList
        data={bids}
        keyExtractor={item => item.id}
        renderItem={renderBid}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

export default Bids;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafc',
    // paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginVertical: 20,
    textAlign: 'center',
    color: '#333',
  },
  listContent: {
    paddingBottom: 20,
    marginHorizontal: 15,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 14,
    borderRadius: 10,
    padding: 12,
    elevation: 2,
    shadowColor: '#ccc',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
  },
  details: {
    flex: 1,
    justifyContent: 'space-around',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
  },
  detail: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
});
