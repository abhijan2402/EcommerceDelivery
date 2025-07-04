import React, {useContext} from 'react';
import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import Header from '../../../Components/FeedHeader';
import CustomButton from '../../../Components/CustomButton';
import {LanguageContext} from '../../../localization/LanguageContext';

const OrderDetail = ({navigation}) => {
  const {strings} = useContext(LanguageContext);
  const order = {
    productName: 'Wireless Headphones',
    price: 199.99,
    paymentType: 'Credit Card',
    shippingAddress: '123, Main Street, New York, NY 10001',
    status: 'Delivered',
    imageUrl:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D',
    seller: {
      shopName: 'Sound Hub',
      shopAddress: '456 Market St, Los Angeles, CA',
      shopRating: 4.5,
    },
  };

  const getStatusColor = status => {
    switch (status) {
      case 'Pending':
        return '#FFA500';
      case 'Shipped':
        return '#007BFF';
      case 'Delivered':
        return '#28A745';
      case 'Cancelled':
        return '#DC3545';
      default:
        return '#6C757D';
    }
  };

  return (
    <View style={styles.container}>
      <Header title={strings.order_details} showBack />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Product Overview */}
        <View style={styles.card}>
          <View style={styles.productRow}>
            <Image
              source={{uri: order.imageUrl}}
              style={styles.productImage}
              resizeMode="cover"
            />
            <View style={styles.productInfo}>
              <Text style={styles.productTitle}>{order.productName}</Text>
              <View
                style={[
                  styles.statusBadge,
                  {backgroundColor: getStatusColor(order.status)},
                ]}>
                <Text style={styles.statusText}>{order.status}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Price & Payment */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>{strings.price_payment}</Text>
          <View style={styles.detailRow}>
            <Text style={styles.label}>{strings.price}:</Text>
            <Text style={styles.value}>${order.price}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>{strings.payment_type}:</Text>
            <Text style={styles.value}>{order.paymentType}</Text>
          </View>
        </View>

        {/* Shipping Address */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>{strings.shipping_address}</Text>
          <Text style={styles.value}>{order.shippingAddress}</Text>
        </View>

        {/* Seller Info */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>{strings.seller_info}</Text>
          <View style={styles.detailRow}>
            <Text style={styles.label}>{strings.shop_name}:</Text>
            <Text style={styles.value}>{order.seller.shopName}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>{strings.address}:</Text>
            <Text style={styles.value}>{order.seller.shopAddress}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>{strings.ratings}:</Text>
            <Text style={styles.value}>⭐ {order.seller.shopRating}/5</Text>
          </View>
        </View>
      </ScrollView>
      {order.status === 'Delivered' && (
        <CustomButton
          title={strings.give_feedback}
          onPress={() => {
            navigation.navigate('Feedback', {orderId: order.id}); // if needed
          }}
          style={{marginBottom: 40}}
        />
      )}
    </View>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: {width: 0, height: 3},
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  productInfo: {
    flex: 1,
    marginLeft: 12,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 12,
    color: '#444',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: '#555',
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
    color: '#222',
  },
});
