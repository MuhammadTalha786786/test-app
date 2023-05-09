import { View, Text } from 'react-native'
import React, { useState } from 'react'
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { setSignIn } from '../../redux/auth/AuthReducer';
import {useDispatch} from 'react-redux';




export const useLogin = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('')
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [loader, setLoader] = useState(false);
    const navigation = useNavigation()
    const dispatch  = useDispatch()

    const LoginUser = {
     
      isLoggedIn: true,
      name: '',
      email: '',
      uid: '',
    };
  
    const updateLogin = uid => {
      firestore()
        .collection('users')
        .doc(uid)
        .get()
        .then((snapshot:any) => {
          console.log(snapshot.data().image, 'dasdad');
          LoginUser.name = snapshot.data().name;
          dispatch(setSignIn(LoginUser));
        });
    };

    const login = async () => {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (email === '') {
       console.log("Enter the email")
      } else if (reg.test(email) === false) {
        console.log("Enter  Valid the email")

      } else if (password === '') {
        console.log("Enter the email")

      } else {
        setLoader(true);
        auth()
          .signInWithEmailAndPassword(email, password)
          .then((loggedInUser:any) => {
            if (loggedInUser) {
              setLoader(false);
              console.log(loggedInUser, 'user login here');
              updateLogin(loggedInUser.user._user.uid);
              LoginUser.email = loggedInUser.user._user.email;
              LoginUser.uid = loggedInUser.user._user.uid;
            }
          })
          .catch(eror => {
            setLoader(false);
            console.warn('Login fail!!', eror.message);
          });
      }
    };
  return {
     email,
     setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword, loader, setLoader, login

  }
    
}
