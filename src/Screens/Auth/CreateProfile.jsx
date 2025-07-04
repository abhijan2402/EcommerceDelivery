import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Input from '../../Components/Input';
import CustomButton from '../../Components/CustomButton';
import {COLOR} from '../../Constants/Colors';
import Header from '../../Components/FeedHeader';
import {LanguageContext} from '../../localization/LanguageContext';

const CreateProfile = ({navigation}) => {
  const {strings} = useContext(LanguageContext);
  const [shopName, setShopName] = useState('');
  const [shopAddress, setShopAddress] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [shopDocument, setShopDocument] = useState(null);
  const [extraDocument, setExtraDocument] = useState(null);
  const [loading, setLoading] = useState(false);

  const selectImage = async setter => {
    try {
      const image = await ImagePicker.openPicker({
        mediaType: 'photo',
        cropping: true,
      });
      if (image?.path) {
        setter({uri: image.path});
      }
    } catch (error) {
      console.log('Image pick cancelled');
    }
  };

  const handleSubmit = () => {
    navigation.navigate('BottomNavigation');
    return;
    if (
      !shopName ||
      !shopAddress ||
      !gstNumber ||
      !panNumber ||
      !ownerName ||
      !shopDocument
    ) {
      Alert.alert(
        'Missing Fields',
        'Please fill all required fields and upload shop document.',
      );
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Profile Created',
        'Your vendor profile has been created successfully.',
      );
      //   navigation.goBack();
    }, 1500);
  };

  return (
    <View style={styles.safeArea}>
      <Header title={strings.create_profile} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{paddingBottom: 30}}>
        <Input
          label={strings.shop_name}
          value={shopName}
          onChangeText={setShopName}
          placeholder={strings.placeholder_shop_name}
        />
        <Input
          label={strings.shop_address}
          value={shopAddress}
          onChangeText={setShopAddress}
          placeholder={strings.placeholder_shop_address}
        />
        <Input
          label={strings.gst_number}
          value={gstNumber}
          onChangeText={setGstNumber}
          placeholder={strings.placeholder_gst_number}
        />
        <Input
          label={strings.pan_number}
          value={panNumber}
          onChangeText={setPanNumber}
          placeholder={strings.placeholder_pan_number}
        />
        <Input
          label={strings.owner_name}
          value={ownerName}
          onChangeText={setOwnerName}
          placeholder={strings.placeholder_owner_name}
        />

        <View style={styles.uploadContainer}>
          <Text style={styles.label}>{strings.upload_shop_document} *</Text>
          {shopDocument ? (
            <Image
              source={{uri: shopDocument.uri}}
              style={styles.imagePreview}
            />
          ) : (
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => selectImage(setShopDocument)}>
              <Text style={styles.uploadText}>
                {strings.select_shop_document}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.uploadContainer}>
          <Text style={styles.label}>{strings.upload_additional_document}</Text>
          {extraDocument ? (
            <Image
              source={{uri: extraDocument.uri}}
              style={styles.imagePreview}
            />
          ) : (
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => selectImage(setExtraDocument)}>
              <Text style={styles.uploadText}>{strings.select_document}</Text>
            </TouchableOpacity>
          )}
        </View>

        <CustomButton
          title={strings.submit_profile}
          onPress={handleSubmit}
          loading={loading}
          style={{marginTop: 20, marginBottom: 30}}
        />
      </ScrollView>
    </View>
  );
};

export default CreateProfile;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLOR.black,
    marginBottom: 8,
  },
  uploadContainer: {
    marginTop: 15,
    marginHorizontal: 30,
  },
  uploadButton: {
    backgroundColor: '#f1f1f1',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  uploadText: {
    color: COLOR.royalBlue,
    fontWeight: '600',
  },
  imagePreview: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginTop: 8,
  },
});
