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
import {AuthContext} from '../../Backend/AuthContent';
import {useApi} from '../../Backend/Api';
import {LanguageContext} from '../../localization/LanguageContext';

const {height} = Dimensions.get('window');
const {width} = Dimensions.get('window');

const Login = ({navigation}) => {
  const {strings} = useContext(LanguageContext);
  const {postRequest} = useApi();

  const animationRef = useRef(null);
  const [email, setEmail] = useState(null);
  const [loading, setloading] = useState(false);
  const [password, setpassword] = useState(null);
  const {setUser, setToken} = useContext(AuthContext);

  useEffect(() => {
    animationRef.current?.play();

    // Or set a specific startFrame and endFrame with:
    animationRef.current?.play(30, 120);
  }, []);

  const loginUser = async (email, password) => {
    // Basic validation
    if (!email) {
      Alert.alert('Validation Error', 'Email is required');
      return null;
    }
    setloading(true);
    const response = await postRequest('/auth/login', {
      email,
      password,
    });
    if (response?.success) {
      console.log('INSIDE');

      const data = response?.data;
      console.log(data?.users, 'DAARRRR');

      setToken(data?.token);
      setUser(data?.users);
      setloading(false);
    } else {
      setloading(false);
      Alert.alert('Error', response.error || 'Login failed');
      return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <ScrollView style={{flex: 1}}>
        <LottieView
          ref={animationRef}
          source={require('../../assets/Lottie/Login.json')}
          style={styles.image}
        />
        <View style={{borderTopWidth: 0.5, paddingTop: 15}}>
          <View style={{marginLeft: 25, marginBottom: 10}}>
            <Text
              style={{fontSize: 22, color: COLOR.royalBlue, fontWeight: '700'}}>
              {strings.sign_in}
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

          <CustomButton
            loading={loading}
            title={strings.login}
            onPress={() => {
              setToken('123');
              setUser('123');
              // navigation.navigate('BottomNavigation');
              // loginUser(email, password);
            }}
            style={{marginTop: 15}}
          />
          <Text style={styles.footerText}>
            {strings.not_have_account}{' '}
            <TouchableOpacity
              style={{marginTop: 8}}
              onPress={() => {
                navigation.navigate('SignUp');
              }}>
              <Text style={styles.linkText}>{strings.create_one}</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </ScrollView>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    height: height,
    backgroundColor: COLOR.white,
  },
  image: {
    width: width,
    height: height * 0.5111,
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
    marginBottom: 20,
  },
  footerText: {
    marginTop: 20,
    fontSize: 14,
    color: '#333',
    alignSelf: 'center',
    alignItems: 'center',
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
  },
  linkText: {
    color: COLOR.royalBlue,
    fontWeight: 'bold',
  },
});
