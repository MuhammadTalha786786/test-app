import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {TouchEventType} from 'react-native-gesture-handler/lib/typescript/TouchEventType';
import CenteredModalComponent from './CenteredModalComponent';
import { StyleGuide } from '../../utils/StyleGuide';
type IModal = {
  isvisible: boolean;
  setVisibility?: (item: boolean) => void;
  onpress?: () => void;
  source?: any;
};

const ImageModal = (props: IModal) => {
  console.log(props);
  const navigation = useNavigation();

  return (
    <CenteredModalComponent
      isVisible={props.isvisible}
      setVisibility={props?.setVisibility}
      styleModal={{
        backgroundColor: 'transparent',
        marginTop: heightPercentageToDP(5),
      }}
      component={
        <>
          <View
            style={{
              marginTop: 15,
            }}>
            <TouchableOpacity
              onPress={() => props?.setVisibility(false)}
              style={{
                position: 'absolute',
                zIndex: 9999999,
                top: 40,
                right: 15,
                backgroundColor:'red',
                width:'10%',
                justifyContent:'center',
                alignItems:'center'
              }}>
              <Text style={{fontSize:24,color:'white',fontFamily:StyleGuide.fontFamily.medium}}>X</Text>
            </TouchableOpacity>
            <Image
              source={{uri: props?.source}}
              style={{
                width: widthPercentageToDP(97),
                height: heightPercentageToDP(70),
                // borderWidth:1,
                borderWidth: 5,
                marginTop: 30,
                borderColor: 'white',

                alignSelf: 'center',
              }}
            />
          </View>
        </>
      }
    />
  );
};

export default ImageModal;

const styles = StyleSheet.create({});
