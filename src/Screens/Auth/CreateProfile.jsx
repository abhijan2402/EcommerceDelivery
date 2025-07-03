import React, {useState} from 'react';
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

const CreateProfile = ({navigation}) => {
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
      <Header title={'Create Profile'} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{paddingBottom: 30}}>
        <Input
          label="Shop Name"
          value={shopName}
          onChangeText={setShopName}
          placeholder="Enter shop name"
        />
        <Input
          label="Shop Address"
          value={shopAddress}
          onChangeText={setShopAddress}
          placeholder="Enter shop address"
        />
        <Input
          label="GST Number"
          value={gstNumber}
          onChangeText={setGstNumber}
          placeholder="Enter GST number"
        />
        <Input
          label="PAN Number"
          value={panNumber}
          onChangeText={setPanNumber}
          placeholder="Enter PAN number"
        />
        <Input
          label="Owner Name"
          value={ownerName}
          onChangeText={setOwnerName}
          placeholder="Enter owner name"
        />

        <View style={styles.uploadContainer}>
          <Text style={styles.label}>Upload Shop Document *</Text>
          {shopDocument ? (
            <Image
              source={{uri: shopDocument.uri}}
              style={styles.imagePreview}
            />
          ) : (
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => selectImage(setShopDocument)}>
              <Text style={styles.uploadText}>Select Shop Document</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.uploadContainer}>
          <Text style={styles.label}>
            Upload Additional Document (Optional)
          </Text>
          {extraDocument ? (
            <Image
              source={{uri: extraDocument.uri}}
              style={styles.imagePreview}
            />
          ) : (
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => selectImage(setExtraDocument)}>
              <Text style={styles.uploadText}>Select Document</Text>
            </TouchableOpacity>
          )}
        </View>

        <CustomButton
          title="Submit Profile"
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
