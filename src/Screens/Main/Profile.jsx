import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Input from '../../Components/Input';
import CustomButton from '../../Components/CustomButton';
import {windowHeight, windowWidth} from '../../Constants/Dimensions';
import {COLOR} from '../../Constants/Colors';
import Header from '../../Components/FeedHeader';
import {LanguageContext} from '../../localization/LanguageContext';

const Profile = ({navigation}) => {
  const {strings} = useContext(LanguageContext);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('John Doe');
  const [username, setUsername] = useState('johndoe123');
  const [age, setAge] = useState('28');
  const [gender, setGender] = useState('Male');
  const [bio, setBio] = useState('Developer. Coffee Lover. Always Learning.');

  const handleEditPress = () => {
    setIsEditing(true);
  };

  const handleUpdateProfile = () => {
    setIsEditing(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Image and Edit Icon */}
      <Header
        title={strings.edit_profile}
        showBack
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.profileSection}>
        {/* Left: Profile Image */}
        <View style={styles.imageWrapper}>
          <Image
            source={{
              uri: 'https://randomuser.me/api/portraits/men/75.jpg',
            }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editIcon} onPress={handleEditPress}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/1827/1827933.png',
              }}
              style={{width: 24, height: 24}}
            />
          </TouchableOpacity>
        </View>

        {/* Right: Stats */}
        <View style={styles.countContainer}>
          <View style={styles.countBox}>
            <Text style={styles.countValue}>24</Text>
            <Text style={styles.countLabel}>{strings.posts}</Text>
          </View>
          <View style={styles.countBox}>
            <Text style={styles.countValue}>24</Text>
            <Text style={styles.countLabel}>{strings.posts}</Text>
          </View>
          <View style={styles.countBox}>
            <Text style={styles.countValue}>8</Text>
            <Text style={styles.countLabel}>{strings.chats}</Text>
          </View>
        </View>
      </View>

      {/* Profile Fields */}
      <View style={styles.inputContainer}>
        <Input
          label={strings.name}
          placeholder={strings.enter_name}
          value={name}
          onChangeText={setName}
          editable={isEditing}
        />
        <Input
          label={strings.username}
          placeholder={strings.enter_username}
          value={username}
          onChangeText={setUsername}
          editable={isEditing}
        />
        <Input
          label={strings.age}
          placeholder={strings.enter_age}
          value={age}
          onChangeText={setAge}
          editable={isEditing}
          keyboardType="numeric"
        />
        <Input
          label={strings.gender}
          placeholder={strings.enter_gender}
          value={gender}
          onChangeText={setGender}
          editable={isEditing}
        />
        <Input
          label={strings.bio}
          placeholder={strings.enter_bio}
          value={bio}
          onChangeText={setBio}
          editable={isEditing}
          multiline
        />
      </View>

      {/* Update Button */}
      {isEditing && (
        <CustomButton
          title={strings.update_profile}
          onPress={handleUpdateProfile}
          style={{marginTop: 15}}
        />
      )}
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    // padding: 20,
    // alignItems: 'center',
    flexGrow: 1,
    backgroundColor: COLOR.white,
    height: windowHeight,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  profileImage: {
    width: 75,
    height: 75,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#ccc',
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
  updateButton: {
    marginTop: 30,
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignSelf: 'center',
  },
  updateButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  imageWrapper: {
    position: 'relative',
    marginRight: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    // width: '100%',
    paddingHorizontal: 20,
    // justifyContent: 'space-between',
  },
  countContainer: {
    flexDirection: 'row',
    gap: 20,
    // borderWidth: 1,
    width: windowWidth / 1.6,
    justifyContent: 'space-around',
  },
  countBox: {
    alignItems: 'center',
  },
  countValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  countLabel: {
    fontSize: 14,
    color: '#777',
  },
});
