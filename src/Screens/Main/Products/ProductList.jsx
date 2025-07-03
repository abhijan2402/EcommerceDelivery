import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import Header from '../../../Components/FeedHeader';
import {products} from '../../../Constants/Data';

const ProductList = () => {
  return (
    <View style={{flex: 1}}>
      <Header showBack title={'Products'} />
      <FlatList
        contentContainerStyle={{padding: 10}}
        data={products}
        renderItem={ProductCard}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ProductList;
export const ProductCard = ({item}) => (
  <View style={styles.card}>
    <Image source={item.image} style={styles.image} />
    <Text style={styles.name}>{item.name}</Text>
    <Text style={styles.desc}>{item.description}</Text>
    <Text style={styles.price}>
      <Text style={styles.actualPrice}>${item.actualPrice}</Text>{' '}
      <Text style={styles.discountPrice}>${item.discountPrice}</Text>
    </Text>
    <Text style={styles.shop}>{item.shopName}</Text>
    <Text style={styles.rating}>⭐ {item.rating}</Text>
  </View>
);
const CARD_WIDTH = (Dimensions.get('window').width - 30) / 2;

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 80,
    borderRadius: 6,
    marginBottom: 8,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 2,
  },
  desc: {
    fontSize: 12,
    color: '#555',
    marginBottom: 4,
  },
  price: {
    fontSize: 13,
    marginBottom: 4,
  },
  actualPrice: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  discountPrice: {
    fontWeight: 'bold',
    color: '#E53935',
  },
  shop: {
    fontSize: 12,
    color: '#444',
    marginBottom: 2,
  },
  rating: {
    fontSize: 12,
    color: '#FFA000',
  },
});
