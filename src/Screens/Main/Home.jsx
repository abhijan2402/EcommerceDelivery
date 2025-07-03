import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
  SafeAreaView,
} from 'react-native';

const Home = ({navigation}) => {
  const [isOnline, setIsOnline] = React.useState(true);

  const toggleSwitch = () => setIsOnline(prev => !prev);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>Hello, Rahul</Text>
          <View style={styles.rightHeader}>
            <Switch value={isOnline} onValueChange={toggleSwitch} />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Notification');
              }}
              style={styles.notification}>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/1827/1827392.png',
                }}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Upcoming Orders */}
        <Text style={styles.sectionTitle}>Upcoming Orders</Text>
        <View style={styles.orderCard}>
          {/* Customer Details */}
          <Text style={styles.subTitle}>Customer Details</Text>
          <View style={styles.detailBlock}>
            <Text style={styles.label}>Name: John Doe</Text>
            <Text style={styles.label}>Phone: +123456789</Text>
            <Text style={styles.label}>Address: 123 Main Street, City</Text>
          </View>

          {/* Shop Details */}
          <Text style={styles.subTitle}>Shop Details</Text>
          <View style={styles.detailBlock}>
            <Text style={styles.label}>Shop: Super Grocery Mart</Text>
            <Text style={styles.label}>Delivery Time: 04:00 PM</Text>
            <Text style={styles.label}>Date: 5th June 2025</Text>
          </View>

          {/* Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.startBtn}>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/833/833472.png',
                }}
                style={styles.btnIcon}
              />
              <Text style={styles.btnText}>Start Job</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.directionBtn}>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
                }}
                style={styles.btnIcon}
              />
              <Text style={styles.btnText}>Directions</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Past Orders */}
        <Text style={styles.sectionTitle}>Past Orders</Text>
        <View style={styles.orderCard}>
          <Text style={styles.label}>Customer: Jane Smith</Text>
          <Text style={styles.label}>Delivered: 2nd June 2025 - 3:30 PM</Text>
          <Text style={styles.label}>Shop: FreshMart</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  container: {
    flex: 1,
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 25,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  rightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notification: {
    marginLeft: 10,
  },
  icon: {
    width: 26,
    height: 26,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 10,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
  },
  subTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 6,
  },
  detailBlock: {
    marginBottom: 10,
    paddingLeft: 5,
  },
  label: {
    fontSize: 14,
    marginBottom: 3,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  startBtn: {
    backgroundColor: '#28a745',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 6,
  },
  directionBtn: {
    backgroundColor: '#007bff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginLeft: 6,
  },
  btnText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 6,
  },
  btnIcon: {
    width: 20,
    height: 20,
  },
});
