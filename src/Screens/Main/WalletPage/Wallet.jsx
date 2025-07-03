import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import React from 'react';
import Header from '../../../Components/FeedHeader';

const creditTransactions = [
  {
    id: '1',
    title: 'Monthly Salary',
    amount: 15000,
    date: '01 June 2025',
    icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135755.png',
  },
  {
    id: '2',
    title: 'Incentive Bonus',
    amount: 2500,
    date: '28 May 2025',
    icon: 'https://cdn-icons-png.flaticon.com/512/847/847969.png',
  },
  {
    id: '3',
    title: 'Delivery Rewards',
    amount: 800,
    date: '27 May 2025',
    icon: 'https://cdn-icons-png.flaticon.com/512/3771/3771538.png',
  },
  {
    id: '4',
    title: 'Referral Bonus',
    amount: 1000,
    date: '20 May 2025',
    icon: 'https://cdn-icons-png.flaticon.com/512/1055/1055646.png',
  },
];

const Wallet = () => {
  const totalBalance = creditTransactions.reduce((sum, t) => sum + t.amount, 0);

  const renderTransaction = ({item}) => (
    <View style={styles.transactionCard}>
      <Image source={{uri: item.icon}} style={styles.icon} />
      <View style={styles.transactionDetails}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <Text style={styles.amount}>+ ₹{item.amount}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Wallet" />
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balanceValue}>₹{totalBalance}</Text>
      </View>

      <Text style={styles.sectionTitle}>Recent Credits</Text>
      <FlatList
        data={creditTransactions}
        keyExtractor={item => item.id}
        renderItem={renderTransaction}
        contentContainerStyle={{paddingBottom: 20}}
      />
    </View>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  balanceCard: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 15,
    borderRadius: 10,
    elevation: 2,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 16,
    color: '#555',
  },
  balanceValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e7f0e',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 15,
    marginVertical: 10,
  },
  transactionCard: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginVertical: 6,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  date: {
    fontSize: 13,
    color: '#777',
    marginTop: 2,
  },
  amount: {
    fontSize: 16,
    color: '#28a745',
    fontWeight: 'bold',
  },
});
