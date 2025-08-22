import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
  SafeAreaView,
  Modal,
  Pressable,
} from 'react-native';
import Header from '../../Components/FeedHeader';
import {LanguageContext} from '../../localization/LanguageContext';
import {AuthContext} from '../../Backend/AuthContent';
import {useIsFocused} from '@react-navigation/native';

const languages = [
  {label: 'English', code: 'en'},
  {label: 'हिन्दी', code: 'hi'},
];

const Home = ({navigation}) => {
  const isFocus = useIsFocused();

  const [isOnline, setIsOnline] = React.useState(true);
  const [showModal, setShowModal] = useState(false);
  const {language, changeLanguage, strings} = useContext(LanguageContext);
  const {user, setUser} = useContext(AuthContext);

  const handleLanguageSelect = code => {
    setShowModal(false);
    if (code !== language) {
      changeLanguage(code);
    }
  };

  const toggleSwitch = () => setIsOnline(prev => !prev);

  const fetchProfile = async () => {
    try {
      const response = await getRequest(
        `api/get-profile/${user?.user?.id}`,
        true,
      );
      if (response?.success) {
        const data = response?.data;
        setUser(data);
      } else {
        Alert.alert('Error', response?.error || 'Failed to fetch profile');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while fetching profile');
    }
  };
  useEffect(() => {
    fetchProfile();
  }, [isFocus]);
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{strings.hello}, Rahul</Text>
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

            {/* Language Selector */}
            <TouchableOpacity
              style={styles.languageIcon}
              onPress={() => setShowModal(true)}>
              <View style={styles.langWrapper}>
                <Text style={styles.globe}>🌐</Text>
                <Text style={styles.langText}>{language.toUpperCase()}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Upcoming Orders */}
        <Text style={styles.sectionTitle}>{strings.upcoming_orders}</Text>
        <View style={styles.orderCard}>
          {/* Customer Details */}
          <Text style={styles.subTitle}>{strings.customer_details}</Text>
          <View style={styles.detailBlock}>
            <Text style={styles.label}>{strings.name}: John Doe</Text>
            <Text style={styles.label}>{strings.phone}: +123456789</Text>
            <Text style={styles.label}>
              {strings.address}: 123 Main Street, City
            </Text>
          </View>

          {/* Shop Details */}
          <Text style={styles.subTitle}>{strings.shop_details}</Text>
          <View style={styles.detailBlock}>
            <Text style={styles.label}>
              {strings.shop_name}: Super Grocery Mart
            </Text>
            <Text style={styles.label}>{strings.delivery_date}: 04:00 PM</Text>
            <Text style={styles.label}>{strings.date}: 5th June 2025</Text>
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
              <Text style={styles.btnText}>{strings.start_job}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.directionBtn}>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
                }}
                style={styles.btnIcon}
              />
              <Text style={styles.btnText}>{strings.direction}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Past Orders */}
        <Text style={styles.sectionTitle}>{strings.past_orders}</Text>
        <View style={styles.orderCard}>
          <Text style={styles.label}>{strings.customer}: Jane Smith</Text>
          <Text style={styles.label}>
            {strings.delivered}: 2nd June 2025 - 3:30 PM
          </Text>
          <Text style={styles.label}>{strings.shop_name}: FreshMart</Text>
        </View>
      </ScrollView>

      {/* Modal for Language Selection */}
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowModal(false)}>
          <View style={styles.modalContainer}>
            {languages.map(lang => (
              <TouchableOpacity
                key={lang.code}
                style={styles.langOption}
                onPress={() => handleLanguageSelect(lang.code)}>
                <Text
                  style={[
                    styles.langModalText,
                    language === lang.code && {fontWeight: '700'},
                  ]}>
                  {lang.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
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
    gap: 6,
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

  // Language Slector and Modal
  languageIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#E5E0D8',
    borderRadius: 8,
    gap: 4,
  },
  langIconImg: {
    width: 20,
    height: 20,
  },
  langWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1,
  },
  globe: {
    fontSize: 16,
    marginRight: 5,
  },
  langText: {
    fontSize: 14,
    color: '#000',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  langOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  langModalText: {
    fontSize: 16,
    color: '#333',
  },
});
