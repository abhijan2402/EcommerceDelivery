import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Input from '../../Components/Input';
import CustomButton from '../../Components/CustomButton';
import {COLOR} from '../../Constants/Colors';
import Header from '../../Components/FeedHeader';
import {useToast} from '../../Constants/ToastContext';
import {useApi} from '../../Backend/Api';

const CreateProfileDelivery = ({navigation, route}) => {
  const {postRequest} = useApi();
  const {showToast} = useToast();
  const userId = route?.params?.userId;
  // form fields
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [experience, setExperience] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleBrand, setVehicleBrand] = useState('');

  // images
  const [drivingLicenseFront, setDrivingLicenseFront] = useState(null);
  const [drivingLicenseBack, setDrivingLicenseBack] = useState(null);
  const [aadharCard, setAadharCard] = useState(null);
  const [panCard, setPanCard] = useState(null);

  const [loading, setLoading] = useState(false);

  // open gallery
  const selectImage = async setter => {
    try {
      const image = await ImagePicker.openPicker({
        mediaType: 'photo',
        cropping: true,
      });
      if (image?.path) {
        setter({
          uri: image.path,
          type: image.mime,
          name: `file_${Date.now()}.${image.path.split('.').pop()}`,
        });
      }
    } catch (error) {
      console.log('Image pick cancelled');
    }
  };

  const handleSubmit = async () => {
    console.log('ABCCC');

    if (
      !fullName ||
      !dob ||
      !gender ||
      !experience ||
      !vehicleNumber ||
      !vehicleBrand ||
      !drivingLicenseFront ||
      !drivingLicenseBack ||
      !aadharCard ||
      !panCard
    ) {
      showToast('Please fill all fields and upload documents.', 'error');

      return;
    }

    setLoading(true);

    let formData = new FormData();
    formData.append('user_id', userId);
    formData.append('full_name', fullName);
    formData.append('dob', '2025-08-21');
    formData.append('gender', gender);
    formData.append('experience', experience);
    formData.append('vehicle_number', vehicleNumber);
    formData.append('vehicle_brand', vehicleBrand);

    formData.append('driving_license_front', {
      uri: drivingLicenseFront.uri,
      type: drivingLicenseFront.type,
      name: drivingLicenseFront.name,
    });
    formData.append('driving_license_back', {
      uri: drivingLicenseBack.uri,
      type: drivingLicenseBack.type,
      name: drivingLicenseBack.name,
    });
    formData.append('aadhar_card', {
      uri: aadharCard.uri,
      type: aadharCard.type,
      name: aadharCard.name,
    });
    formData.append('pan_card', {
      uri: panCard.uri,
      type: panCard.type,
      name: panCard.name,
    });
    console.log(formData, 'DATATATTAT');

    const response = await postRequest(
      'api/create-profile-delivery',
      formData,
      true,
    );

    setLoading(false);

    if (response?.success) {
      showToast('Profile created successfully!', 'success');
      navigation.pop(1);
      // navigation.navigate('BottomNavigation');
    } else {
      showToast(response?.error || 'Something went wrong', 'error');
    }
  };

  return (
    <View style={styles.safeArea}>
      <Header title="Create Delivery Profile" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{paddingBottom: 30}}>
        <Input label="Full Name" value={fullName} onChangeText={setFullName} />
        <Input
          label="Date of Birth (YYYY-MM-DD)"
          value={dob}
          onChangeText={setDob}
        />
        <Input label="Gender" value={gender} onChangeText={setGender} />
        <Input
          label="Experience (Years)"
          value={experience}
          onChangeText={setExperience}
        />
        <Input
          label="Vehicle Number"
          value={vehicleNumber}
          onChangeText={setVehicleNumber}
        />
        <Input
          label="Vehicle Brand"
          value={vehicleBrand}
          onChangeText={setVehicleBrand}
        />

        {/* Uploads */}
        <View style={styles.uploadContainer}>
          <Text style={styles.label}>Driving License (Front)</Text>
          {drivingLicenseFront ? (
            <Image
              source={{uri: drivingLicenseFront.uri}}
              style={styles.imagePreview}
            />
          ) : (
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => selectImage(setDrivingLicenseFront)}>
              <Text style={styles.uploadText}>
                Select Driving License Front
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.uploadContainer}>
          <Text style={styles.label}>Driving License (Back)</Text>
          {drivingLicenseBack ? (
            <Image
              source={{uri: drivingLicenseBack.uri}}
              style={styles.imagePreview}
            />
          ) : (
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => selectImage(setDrivingLicenseBack)}>
              <Text style={styles.uploadText}>Select Driving License Back</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.uploadContainer}>
          <Text style={styles.label}>Aadhar Card</Text>
          {aadharCard ? (
            <Image source={{uri: aadharCard.uri}} style={styles.imagePreview} />
          ) : (
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => selectImage(setAadharCard)}>
              <Text style={styles.uploadText}>Select Aadhar Card</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.uploadContainer}>
          <Text style={styles.label}>PAN Card</Text>
          {panCard ? (
            <Image source={{uri: panCard.uri}} style={styles.imagePreview} />
          ) : (
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => selectImage(setPanCard)}>
              <Text style={styles.uploadText}>Select PAN Card</Text>
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

export default CreateProfileDelivery;

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
