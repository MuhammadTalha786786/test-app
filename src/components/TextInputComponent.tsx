import { View, Text } from 'react-native';
import React from 'react';
  
import { Input, Icon, Pressable } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { StyleGuide } from '../../utils/StyleGuide';
import { windowHeight } from '../../utils/Dimesnions';

const TextInputComponent = ({
  value,
  setValue,
  showPassword,
  name,
  setShowPassword,
  IsPassword,
  darkMode,
  ...reset
}) => {
  return (
    <>
      {IsPassword ? (
        <View>
          <Input
            mx="3"
            value={value}
            onChangeText={text => {
              setValue(text)
            }}
            type={showPassword ? 'text' : 'password'}
            InputRightElement={
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <Icon
                  as={
                    <MaterialIcons
                      name={showPassword ? 'visibility' : 'visibility-off'}
                    />
                  }
                  size={5}
                  mr="2"
                  color="muted.400"
                />
              </Pressable>
            }
            style={{
              height: windowHeight / 15,
              fontFamily: 'Poppins-Regular',
              fontSize: widthPercentageToDP('3.7'),
              color: StyleGuide.color.dark,
            }}
            {...reset}
          />
        </View>
      ) : (
        <Input
          mx="3"
          value={value}
          onChangeText={text => {
            setValue(text)
          }}
          InputLeftElement={
            <Icon
              as={<MaterialIcons name={name} />}
              size={5}
              ml="2"
              color="muted.400"
            />
          }
          style={{
            height: windowHeight / 15,
            fontFamily: 'Poppins-Regular',
            fontSize: widthPercentageToDP('3.7'),
            color: StyleGuide.color.dark,
          }}
          {...reset}
        />
      )}
    </>
  );
};

export default TextInputComponent;
