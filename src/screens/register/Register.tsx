import {
    View,
    Text,
    Alert,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Image,
  } from 'react-native';
  import React, { useState } from 'react';

import { widthPercentageToDP } from 'react-native-responsive-screen';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Avatar, Divider } from 'native-base';
import { StyleGuide } from '../../../utils/StyleGuide';
import ButtonComponent from '../../components/ButtonComponent';
import TextInputComponent from '../../components/TextInputComponent';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';



  
  const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const [userProfieImage, setUserProfileImage] = useState('');
  
  
 
  
    const writeUserData = user => {
      firestore()
        .collection('users')
        .doc(user.uid)
        .set(user)
        .then(() => {
          setUploading(false)
          console.warn('user added!');
        });
  
      Alert.alert('registered');
      setEmail('');
      setName('');
      setPassword('');
    };
  
    // console.log(userProfieImage, 'ksdfhdajs');
  
    const createNewAccount = async () => {
      setUploading(true)
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (email === '') {
       console.warn("Please Enter the Email")
      } else if (!reg.test(email)) {
        console.warn("Please Enter the Email")
          } else if (name === '') {
            console.warn("Please Enter the Email");
      } else if (Password === '') {
        console.warn("Please Enter the Email");
      } else {
        try {
          const userAuth = await auth().createUserWithEmailAndPassword(
            email,
            Password,
          );
        
          console.warn(userAuth, 'userAuth');
          console.log(userAuth.email);
        
          var user = {
            name: name,
            uid: userAuth.user?._user.uid,
            email: userAuth.user?._user.email,
            isLogin: false,
          };
          writeUserData(user);
        } catch (error) {
          console.log(error?.message);
        }
      }
    };
  
    return (
      <SafeAreaView style={styles.SafeAreaView}>
        <View
          style={{
            padding: 0,
            marginVertical: 100,
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <Text style={styles.loginText}>Register </Text>
  
      
  
          <View style={{ padding: 0, marginVertical: 10, marginTop: 15 }}>
            <TextInputComponent
              value={name}
              setValue={setName}
              placeholder="Enter Name"
              mode="outlined"
              label="Name"
              name={'person'}
            />
          </View>
          <View style={{ padding: 0, marginVertical: 5 }}>
            <TextInputComponent
              value={email}
              setValue={setEmail}
              placeholder="Enter Email"
              mode="outlined"
              label="Email"
              name={'email'}
            />
          </View>
          <View style={{ padding: 0, marginVertical: 5 }}>
            <TextInputComponent
              value={Password}
              setValue={setPassword}
              placeholder="Enter Password"
              mode="outlined"
              label="Password"
              secureTextEntry={true}
              name={'visibility'}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              IsPassword={true}
            />
          </View>
  
          <View style={{ padding: 10, marginVertical: 5 }}>
            <Text style={styles.errorMessage}>{error}</Text>
            <ButtonComponent
            uploading={uploading}
              disabled={
                uploading ||
                name === '' ||
                email === '' ||
                Password === '' 
                
              }
              buttonTitle="Register"
              btnType="sign-in"
              color="#f5e7ea"
              backgroundColor={
                uploading ||
                  name === '' ||
                  email === '' ||
                  Password === '' 
                 
                  ? 'grey'
                  : StyleGuide.color.primary
              }
              onPress={()=>{createNewAccount()}}
            />
          </View>
          <View style={styles.GoogleSignInView}>
            <Divider style={styles.DividerStyle} />
            <Text style={styles.SignInText}>or sign in with</Text>
            <Divider style={styles.DividerStyle} />
          </View>
  
          <View style={{ padding: 10 }}>
            <ButtonComponent
              buttonTitle="Sign In with Google"
              btnType="google"
              color="#de4d41"
              backgroundColor="#f5e7ea"
              onPress={()=>{createNewAccount()}}
            />
            <View style={styles.accountView}>
              <Text style={styles.accountText}>Already have an account? </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Login');
                }}>
                <Text
                  style={{
                    color: StyleGuide.color.primary,
                    fontFamily: StyleGuide.fontFamily.medium,
                    fontSize: widthPercentageToDP('4%'),
                  }}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    loginText: {
      fontFamily: StyleGuide.fontFamily.medium,
      fontSize: StyleGuide.fontSize.medium,
      textAlign: 'center',
      alignItems: 'center',
      color: StyleGuide.color.primary,
      marginBottom: 15,
    },
    SafeAreaView: {
      flex: 1,
    },
  
    cameraIcon: {
      borderRadius: 20,
      borderColor: 'red',
      width: 40,
      height: 40,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignSelf: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: -10,
    },
    SignInText: {
      fontFamily: StyleGuide.fontFamily.regular,
      fontSize: StyleGuide.fontSize.small,
      textAlign: 'center',
      alignItems: 'center',
      color: StyleGuide.color.dark,
      paddingHorizontal: 6,
    },
    buttonContainer: {
      marginTop: 10,
      width: '100%',
      height: 50,
      padding: 10,
      flexDirection: 'row',
      borderRadius: 3,
    },
    iconWrapper: {
      width: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      fontWeight: 'bold',
    },
    btnTxtWrapper: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      fontSize: 15,
      fontWeight: 'bold',
      fontFamily: 'Lato-Regular',
    },
    accountText: {
      fontFamily: StyleGuide.fontFamily.regular,
      fontSize: StyleGuide.fontSize.small,
      color: StyleGuide.color.dark,
    },
    accountView: {
      alignItems: 'center',
      alignSelf: 'center',
      paddingVertical: widthPercentageToDP('5%'),
      flexDirection: 'row',
    },
    DividerStyle: {
      flex: 1,
      color: StyleGuide.color.light,
      height: widthPercentageToDP('0.5%'),
    },
  
    GoogleSignInView: {
      flexDirection: 'row',
      paddingHorizontal: 10,
      justifyContent: 'center',
      marginTop: widthPercentageToDP('12%'),
      alignItems: 'center',
      alignSelf: 'center',
      marginBottom: widthPercentageToDP('5%'),
    },
    cameraStyle: {
      marginTop: -10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorMessage: {
      color: 'red',
      fontSize: StyleGuide.fontSize.small,
      fontFamily: StyleGuide.fontFamily.medium,
    },
    progressBarContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  
  export default RegisterScreen;
  