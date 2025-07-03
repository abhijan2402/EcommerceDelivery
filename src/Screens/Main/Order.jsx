import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Header from '../../Components/FeedHeader'; // Adjust path if needed
import {COLOR} from '../../Constants/Colors';

const sampleOrders = {
  upcoming: [
    {
      id: '1',
      title: 'Order #1001',
      productImage:
        'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcS8lqiCVzsh0yPNjsFm1tOOfFHZ1vEn649GpKFkFvD5h4tebEf3eH_bvhC7Z0vzxDr3TLeweVf5XA5CZrXSbm7Yw8s4Gup51WsrmuwbHA0IMpU3tUacGCe7AF8',
      customerName: 'Alice Johnson',
      address: '123 Main St, Springfield',
      price: '$120.00',
      paymentMode: 'Credit Card',
      shippingDetails: 'Standard Shipping',
      deliveryDate: '2025-06-01',
      additionalInfo: 'Fragile item',
      status: 'Pending',
    },
    {
      id: '2',
      title: 'Order #1005',
      productImage:
        'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQCNdfJ_WmfAQj0zjZRdAU5hpfe3EqfCRA7WdSMFinzTvz_rIGhfC6UkQk1mj-it-xgkk8b-q7aClsHyFtnyGH8ffszsWxCW86MDUtUe4czNpj1HHV33MJ-',
      customerName: 'Bob Smith',
      address: '456 Oak Ave, Metropolis',
      price: '$75.50',
      paymentMode: 'PayPal',
      shippingDetails: 'Express Shipping',
      deliveryDate: '2025-06-10',
      additionalInfo: 'Gift wrap',
      status: 'Shipped',
    },
  ],
  past: [
    {
      id: '3',
      title: 'Order #0990',
      productImage:
        'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSMiWZ5Huyyhj2swGKJC-1BvOHdpiLwuiWF16zler4hCuEBt0own08RbT5B6se9j4iocx1K4r925rqHC6zH29V4WKojzG0Y-w_jhQvG_tCZ',
      customerName: 'Charlie Brown',
      address: '789 Pine Rd, Gotham',
      price: '$200.00',
      paymentMode: 'Cash on Delivery',
      shippingDetails: 'Standard Shipping',
      deliveryDate: '2025-05-01',
      additionalInfo: 'Delivered on time',
      status: 'Delivered',
    },
    {
      id: '4',
      title: 'Order #0985',
      productImage:
        'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSMiWZ5Huyyhj2swGKJC-1BvOHdpiLwuiWF16zler4hCuEBt0own08RbT5B6se9j4iocx1K4r925rqHC6zH29V4WKojzG0Y-w_jhQvG_tCZ',
      customerName: 'Diana Prince',
      address: '101 Maple St, Star City',
      price: '$350.00',
      paymentMode: 'Debit Card',
      shippingDetails: 'Two-day Shipping',
      deliveryDate: '2025-04-22',
      additionalInfo: 'Customer requested call before delivery',
      status: 'Cancelled',
    },
  ],
};

const statusStyles = {
  Pending: {
    backgroundColor: '#FFF4E5',
    color: '#FFA500', // orange
  },
  Shipped: {
    backgroundColor: '#E0F7FA',
    color: '#00796B', // teal
  },
  Delivered: {
    backgroundColor: '#E8F5E9',
    color: '#388E3C', // green
  },
  Cancelled: {
    backgroundColor: '#FFEBEE',
    color: '#D32F2F', // red
  },
};

const Tabs = ({activeTab, setActiveTab}) => {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
        onPress={() => setActiveTab('upcoming')}>
        <Text
          style={[
            styles.tabText,
            activeTab === 'upcoming' && styles.activeTabText,
          ]}>
          Upcoming Orders
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'past' && styles.activeTab]}
        onPress={() => setActiveTab('past')}>
        <Text
          style={[
            styles.tabText,
            activeTab === 'past' && styles.activeTabText,
          ]}>
          Past Orders
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const Order = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const RenderOrderItem = ({items, onPress}) => {
    const statusStyle = statusStyles[item?.status] || statusStyles.Pending;
    const item = items?.item;
    return (
      <TouchableOpacity onPress={onPress} style={styles.orderItem}>
        <View style={styles.titleRow}>
          <Text style={styles.orderTitle}>{item.title}</Text>
          <View
            style={[
              styles.statusBadge,
              {backgroundColor: statusStyle.backgroundColor},
            ]}>
            <Text style={[styles.statusText, {color: statusStyle.color}]}>
              {item.status}
            </Text>
          </View>
        </View>

        <View style={styles.row}>
          <Image
            source={{uri: item.productImage}}
            style={styles.productImage}
            resizeMode="contain"
          />
          <View style={styles.detailsContainer}>
            <Text style={styles.customerName}>{item.customerName}</Text>
            <Text style={styles.address}>{item.address}</Text>
            <Text style={styles.price}>Price: {item.price}</Text>
            <Text style={styles.paymentMode}>Payment: {item.paymentMode}</Text>
            <Text style={styles.shippingDetails}>
              Shipping: {item.shippingDetails}
            </Text>
            <Text style={styles.deliveryDate}>
              Delivery: {item.deliveryDate}
            </Text>
            <Text style={styles.additionalInfo}>{item.additionalInfo}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Orders" />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <FlatList
        data={
          activeTab === 'upcoming' ? sampleOrders.upcoming : sampleOrders.past
        }
        keyExtractor={item => item.id}
        renderItem={item => (
          <RenderOrderItem
            items={item}
            onPress={() => {
              navigation.navigate('OrderDetail');
            }}
          />
        )}
        contentContainerStyle={{paddingBottom: 30}}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No orders found.</Text>
        }
      />
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: COLOR.royalBlue,
  },
  tabText: {
    fontSize: 13,
    color: 'gray',
  },
  activeTabText: {
    fontSize: 13,
    color: COLOR.royalBlue,
    fontWeight: 'bold',
  },
  orderItem: {
    backgroundColor: '#f9f9f9',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
    elevation: 2, // adds shadow on Android
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2}, // iOS shadow
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#222',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    minWidth: 70,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 1,
  },
  statusText: {
    fontWeight: '600',
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  productImage: {
    width: 90,
    height: 90,
    borderRadius: 8,
  },
  detailsContainer: {
    flex: 1,
  },
  customerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginBottom: 2,
  },
  address: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  price: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E88E5',
    marginBottom: 2,
  },
  paymentMode: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  shippingDetails: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  deliveryDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  additionalInfo: {
    fontSize: 11,
    color: '#999',
    fontStyle: 'italic',
    marginTop: 6,
  },
  emptyText: {
    marginTop: 40,
    textAlign: 'center',
    color: '#999',
    fontSize: 14,
  },
});
