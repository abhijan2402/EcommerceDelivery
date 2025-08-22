import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import {COLOR} from '../../Constants/Colors';
import CustomButton from '../../Components/CustomButton';
import LottieView from 'lottie-react-native';
import Input from '../../Components/Input';
import {AuthContext} from '../../Backend/AuthContent';
import {useApi} from '../../Backend/Api';
import {useToast} from '../../Constants/ToastContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {height, width} = Dimensions.get('window');

const Login = ({navigation}) => {
  const {postRequest} = useApi();
  const animationRef = useRef(null);
  const {showToast} = useToast();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const {setUser, setToken} = useContext(AuthContext);

  useEffect(() => {
    animationRef.current?.play(30, 120);
  }, []);

  const loginUser = async () => {
    const trimmedIdentifier = identifier?.trim();
    const trimmedPassword = password?.trim();

    if (!trimmedIdentifier) {
      showToast('Email or Mobile number is required', 'error');
      return;
    }

    if (!trimmedPassword) {
      showToast('Password is required', 'error');
      return;
    }

    setLoading(true);
    const payload = {
      identifier: trimmedIdentifier,
      password: trimmedPassword,
    };

    const response = await postRequest('api/delivery-login', payload);

    if (response?.data?.token) {
      setToken(response?.data?.token);
      await AsyncStorage.setItem(
        'token',
        JSON?.stringify(response?.data?.token),
      );
      // console.log(response?.data?.user?.registration_step, 'LOOFFFFF');

      // setUser(response?.data);
      // return;
      console.log(response?.data?.user?.has_shop, 'SJPPPPP');

      if (response?.data?.user?.status == 'PENDINGSS') {
        if (response?.data?.user?.has_shop == false) {
          if (response?.data?.user?.registration_step == 1) {
            navigation.navigate('CreateProfile', {
              userId: response?.data?.user?.id,
            });
            // } else if (response?.data?.user?.registration_step == 2) {
            //   navigation.navigate('ShopProfileNew', {
            //     user_id: response?.data?.user?.id,
            //     userDetails: response?.data,
            //   });
          } else {
            showToast('Your profile is under review', 'error');
          }
        } else {
          showToast('Your profile is under review', 'error');
          // setUser(response?.data);
        }
      } else if (response?.data?.user?.status == 'PENDING') {
        await AsyncStorage.setItem('userData', JSON?.stringify(response?.data));
        await AsyncStorage.setItem(
          'token',
          JSON?.stringify(response?.data?.token),
        );
        setUser(response?.data);
      }
      setLoading(false);
    } else {
      setLoading(false);
      // Alert.alert('Error', response?.error || 'Login failed');
      showToast(response?.error, 'error');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: COLOR.white}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <LottieView
            ref={animationRef}
            source={require('../../assets/Lottie/Login.json')}
            style={styles.image}
          />
          <View style={{borderTopWidth: 0.5, paddingTop: 15}}>
            <View style={{marginLeft: 25, marginBottom: 10}}>
              <Text style={styles.heading}>Sign In</Text>
            </View>

            <Input
              label="Email or Mobile Number"
              placeholder="Enter your email or mobile number"
              value={identifier}
              onChangeText={setIdentifier}
              keyboardType="default"
            />
            <Input
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <CustomButton
              loading={loading}
              title="Login"
              onPress={loginUser}
              style={{marginTop: 15}}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
              }}>
              <Text style={styles.footerText}>Not having an account? </Text>
              <TouchableOpacity
                style={{alignItems: 'center'}}
                onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.linkText}>Create One</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  heading: {
    fontSize: 22,
    color: COLOR.royalBlue,
    fontWeight: '700',
  },
  image: {
    width: width,
    height: height * 0.5,
  },
  footerText: {
    // marginTop: 20,
    fontSize: 14,
    color: '#333',
    alignSelf: 'center',
  },
  linkText: {
    color: COLOR.royalBlue,
    fontWeight: 'bold',
    // marginTop: 15,
  },
});
