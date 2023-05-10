import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { StyleGuide } from '../../utils/StyleGuide';
type IModalProps = {
  isVisible: boolean;
  animationType?: 'slide' | 'fade' | 'none';
  setVisibility?: (item: boolean) => void;
  isPicker?: boolean;
  showTerminalButton?: boolean;
  onPress?: () => void;
  component?: React.ReactNode;
  title?: string;
  isGoBack?: boolean;
  applyMask?: (val: boolean) => void;
  disableButton?: boolean;
  styleModal?: ViewStyle;
};

const CenteredModalComponent = (props: IModalProps) => {
  const style = styles(props);
  const navigation = useNavigation();
  return (
    <Modal
      accessibilityViewIsModal={false}
      animationType={props.animationType ? props.animationType : 'slide'}
      transparent={true}
      visible={props.isVisible}
      onRequestClose={() => {
        props?.setVisibility(false);
      }}>
      <TouchableOpacity
        style={{
          // flex: 1,
          position: 'absolute',
          backgroundColor: 'white',
          opacity:0.8,
          height: '100%',
          left: 0,
          width: '100%',
          ...(props.isPicker ? {padding: 20, right: 20} : {}),
        }}
        activeOpacity={0}
        onPress={() => {
          console.log('pressed');
          if (props?.isGoBack) {
            props?.setVisibility(false);
            navigation.goBack();
          } else {
            props?.setVisibility(false);
          }
        }}
      />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          // flex: 1,
          paddingHorizontal: 15,
        }}>
        <View style={[style.centeredView, {...props?.styleModal}]}>
          <View style={style.innerView}>{props?.component}</View>
        </View>
      </View>
    </Modal>
  );
};

export default CenteredModalComponent;

const styles = (props: IModalProps) =>
  StyleSheet.create({
    centeredView: {
      backgroundColor: '#fff',
      width: '100%',
      borderRadius: 10,
      // flex: 1,

      alignSelf: 'center',
      padding: 15,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    innerView: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 10,
    },
    congratulations: {
      fontSize: 14,
      fontFamily: StyleGuide.fontFamily.regular,
      color: StyleGuide.color.dark,
    },
    statusText: {
      fontSize: 14,
      fontFamily: StyleGuide.fontFamily.medium,
      color: StyleGuide.color.heading,
    },
  });
