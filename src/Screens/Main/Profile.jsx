import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Input from '../../Components/Input';
import CustomButton from '../../Components/CustomButton';
import {windowHeight, windowWidth} from '../../Constants/Dimensions';
import {COLOR} from '../../Constants/Colors';
import Header from '../../Components/FeedHeader';
import {LanguageContext} from '../../localization/LanguageContext';
import {IMAGEURL, PROFILE_IMAGEURL, useApi} from '../../Backend/Api';
import {AuthContext} from '../../Backend/AuthContent';
import ImagePicker from 'react-native-image-crop-picker';

const Profile = ({navigation}) => {
  const {putRequest, getRequest} = useApi();
  const {user} = useContext(AuthContext);

  const {strings} = useContext(LanguageContext);
  const [isEditing, setIsEditing] = useState(true);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [bio, setBio] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [imageData, setImageData] = useState(null);
  const handleImagePick = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      mediaType: 'photo',
    })
      .then(image => {
        setImageUri(image.path);
      })
      .catch(err => {
        console.log('Image pick cancelled', err);
      });
  };

  const handleUpdateProfile = async () => {
    console.log('HIIII');

    if (
      !name.trim() ||
      !username.trim() ||
      !age.trim() ||
      !gender.trim() ||
      !bio.trim()
    ) {
      Alert.alert('Validation Error', 'Please fill all the fields');
      return;
    }

    try {
      console.log('HIIII');

      setIsEditing(false);
      console.log('HEKKKKK');

      const formData = new FormData();
      formData.append('full_name', name);
      formData.append('user_name', username);
      formData.append('age', age);
      formData.append('gender', gender);
      formData.append('bio', bio);

      if (imageUri) {
        formData.append('image', {
          uri: imageUri,
          type: 'image/jpeg',
          name: 'Abc',
        });
      }
      console.log(formData, 'FDSHD JHD J');

      const response = await putRequest('api/update-profile', formData, true);
      console.log(response, 'REPSPPPPPP');

      if (response?.success) {
        Alert.alert('Success', 'Profile updated successfully');
        fetchProfile();
        navigation.goBack();
      } else {
        Alert.alert('Error', response?.error || 'Failed to update profile');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await getRequest(
        `api/get-profile/${user?.user?.id}`,
        true,
      );

      if (response?.success) {
        const data = response?.data;

        setName(data?.user?.full_name || '');
        setUsername(data?.user?.user_name || '');
        setAge(data?.user?.age?.toString() || '');
        setGender(data?.user?.gender || '');
        setBio(data?.user?.bio || '');
        setImageData(data?.user?.image);
        // setImageUri(data?.user?.image || '');
      } else {
        Alert.alert('Error', response?.error || 'Failed to fetch profile');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while fetching profile');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}
      keyboardVerticalOffset={80}>
      <Header
        title={strings.edit_Profile}
        showBack
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled">
        <View style={styles.profileSection}>
          <TouchableOpacity onPress={handleImagePick}>
            <Image
              source={
                imageUri
                  ? {uri: `${imageUri}`}
                  : imageData
                  ? {uri: `${PROFILE_IMAGEURL}${imageData}`}
                  : {
                      uri: 'https://cdn-icons-png.flaticon.com/128/456/456212.png',
                    }
              }
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editIcon} onPress={handleImagePick}>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/1827/1827933.png',
                }}
                style={{width: 24, height: 24}}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Input
            label={strings.name}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
            editable={isEditing}
          />
          <Input
            label={strings.username}
            placeholder="Enter your username"
            value={username}
            onChangeText={setUsername}
            editable={isEditing}
          />
          <Input
            label={strings.age}
            placeholder="Enter your age"
            value={age}
            onChangeText={setAge}
            editable={isEditing}
            keyboardType="numeric"
          />
          <Input
            label={strings.gender}
            placeholder="Enter your gender"
            value={gender}
            onChangeText={setGender}
            editable={isEditing}
          />
          <Input
            label={strings.bio}
            placeholder="Enter your bio"
            value={bio}
            onChangeText={setBio}
            editable={isEditing}
            multiline
          />
        </View>

        {isEditing && (
          <CustomButton
            title="Update Profile"
            onPress={handleUpdateProfile}
            style={{marginTop: 15}}
          />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLOR.white,
    height: windowHeight,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  profileImage: {
    width: 75,
    height: 75,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  editIcon: {
    position: 'absolute',
    right: -10,
    bottom: 0,
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 20,
    elevation: 4,
  },
  inputContainer: {
    width: windowWidth,
  },
});
