import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {COLOR} from '../../Constants/Colors';
import CustomButton from '../../Components/CustomButton';
import LottieView from 'lottie-react-native';
import Input from '../../Components/Input';
import {postRequest} from '../../Backend/Api';
import {LanguageContext} from '../../localization/LanguageContext';

const {height} = Dimensions.get('window');
const {width} = Dimensions.get('window');

const SignUp = ({navigation}) => {
  const {strings} = useContext(LanguageContext);
  const animationRef = useRef(null);
  const [email, setEmail] = useState(null);
  const [password, setpassword] = useState(null);
  const [confirmPassword, setconfirmPassword] = useState(null);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    animationRef.current?.play();

    // Or set a specific startFrame and endFrame with:
    animationRef.current?.play(30, 120);
  }, []);

  const registerUser = async (email, password, confirmPassword) => {
    // Basic validation
    if (!email) {
      Alert.alert('Validation Error', 'Email is required');
      return null;
    }

    if (password.length < 6) {
      Alert.alert(
        'Validation Error',
        'Password must be at least 6 characters long',
      );
      return null;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        'Validation Error',
        'Password and confirm password do not match',
      );
      return null;
    }
    setloading(true);
    // API call
    const response = await postRequest('/auth/register', {
      email,
      password,
    });

    if (response.success) {
      setloading(false);
      console.log('Registration successful:', response.data);
      Alert.alert('Success', 'Account created successfully');
      navigation.navigate('Home');
      return response.data;
    } else {
      setloading(false);
      console.error('Registration failed:', response.error);
      Alert.alert('Error', response.error || 'Registration failed');
      return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <ScrollView style={{flex: 1}}>
        <LottieView
          ref={animationRef}
          source={require('../../assets/Lottie/SignUp.json')}
          style={styles.image}
        />
        <View style={{borderTopWidth: 0.5, paddingTop: 15}}>
          <View style={{marginLeft: 25, marginBottom: 10}}>
            <Text
              style={{fontSize: 22, color: COLOR.royalBlue, fontWeight: '700'}}>
              {strings.create_new_account}
            </Text>
          </View>
          <Input
            label={strings.email}
            placeholder={strings.enter_email}
            value={email}
            onChangeText={setEmail}
          />
          <Input
            label={strings.password}
            placeholder={strings.enter_password}
            value={password}
            onChangeText={setpassword}
          />
          <Input
            label={strings.confirm_password}
            placeholder={strings.enter_confirm_password}
            value={confirmPassword}
            onChangeText={setconfirmPassword}
          />

          <CustomButton
            loading={loading}
            title={strings.create}
            onPress={() => {
              navigation.navigate('CreateProfile');
              // registerUser(email, password, confirmPassword);
            }}
            style={{marginTop: 15}}
          />
          <Text style={styles.footerText}>
            {strings.already_have_account}{' '}
            <TouchableOpacity
              style={{marginTop: 7}}
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <Text style={styles.linkText}>{strings.login}</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </ScrollView>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    height: height,
    backgroundColor: COLOR.white,
  },
  image: {
    width: width,
    height: height * 0.4,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: width / 1.5,
    alignSelf: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: COLOR.white,
    fontSize: 14,
    fontWeight: '600',
  },
  footerText: {
    marginTop: 20,
    fontSize: 14,
    color: '#333',
    alignSelf: 'center',
  },
  linkText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  footerText: {
    marginTop: 20,
    fontSize: 14,
    color: '#333',
    alignSelf: 'center',
    marginBottom: 20,
  },
  linkText: {
    color: COLOR.royalBlue,
    fontWeight: 'bold',
  },
});
