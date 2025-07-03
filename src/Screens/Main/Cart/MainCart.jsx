import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import Header from '../../../Components/FeedHeader';
import {COLOR} from '../../../Constants/Colors';

// Dummy cart data with initial quantity 1
const initialCartItems = [
  {
    id: '1',
    image: {
      uri: 'https://help.rangeme.com/hc/article_attachments/360006928633/what_makes_a_good_product_image.jpg',
    },
    name: 'Wireless Headphones',
    description: 'Noise cancelling, Bluetooth 5.0',
    actualPrice: 120,
    discountPrice: 89,
    shopName: 'Gadget Hub',
    quantity: 1,
  },
  {
    id: '2',
    image: {
      uri: 'https://images.pexels.com/photos/845434/pexels-photo-845434.jpeg',
    },
    name: 'Smart Watch',
    description: 'Waterproof, heart-rate monitor',
    actualPrice: 99,
    discountPrice: 75,
    shopName: 'Tech World',
    quantity: 1,
  },
];

const MainCart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  // Increase quantity for given id
  const increaseQty = id => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? {...item, quantity: item.quantity + 1} : item,
      ),
    );
  };

  // Decrease quantity for given id but not below 1
  const decreaseQty = id => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.quantity > 1
          ? {...item, quantity: item.quantity - 1}
          : item,
      ),
    );
  };

  // Calculate total amount
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.discountPrice * item.quantity,
    0,
  );

  // Total items count
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <View style={{flex: 1}}>
      <Header showBack title={'Cart'} />

      <ScrollView contentContainerStyle={{padding: 10}}>
        {cartItems.map(item => (
          <View key={item.id} style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.desc}>{item.description}</Text>
              <Text style={styles.price}>
                <Text style={styles.actualPrice}>${item.actualPrice}</Text>{' '}
                <Text style={styles.discountPrice}>${item.discountPrice}</Text>
              </Text>
              <Text style={styles.shop}>{item.shopName}</Text>

              {/* Quantity controls */}
              <View style={styles.qtyContainer}>
                <TouchableOpacity
                  onPress={() => decreaseQty(item.id)}
                  style={styles.qtyBtn}>
                  <Text style={styles.qtyBtnText}>-</Text>
                </TouchableOpacity>

                <Text style={styles.qtyText}>{item.quantity}</Text>

                <TouchableOpacity
                  onPress={() => increaseQty(item.id)}
                  style={styles.qtyBtn}>
                  <Text style={styles.qtyBtnText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Checkout Section */}
      <View style={styles.footer}>
        <Text style={styles.totalAmount}>Total: ${totalAmount.toFixed(2)}</Text>
        <TouchableOpacity style={styles.checkoutBtn}>
          <Text style={styles.checkoutText}>
            Proceed to Checkout ({totalItems})
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MainCart;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 16,
    padding: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 8,
    marginRight: 10,
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  desc: {
    fontSize: 13,
    color: '#555',
    marginVertical: 4,
  },
  price: {
    fontSize: 14,
  },
  actualPrice: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  discountPrice: {
    color: '#E53935',
    fontWeight: 'bold',
  },
  shop: {
    fontSize: 12,
    color: '#444',
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  qtyBtn: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  qtyBtnText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  qtyText: {
    marginHorizontal: 12,
    fontSize: 16,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalAmount: {
    fontSize: 15,
    fontWeight: '600',
  },
  checkoutBtn: {
    backgroundColor: COLOR.royalBlue,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  checkoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
