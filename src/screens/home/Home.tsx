import { View, Text, SafeAreaView, StatusBar, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import ButtonComponent from '../../components/ButtonComponent'
import { setDataImages, setSignOut } from '../../redux/auth/AuthReducer'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { StyleGuide } from '../../../utils/StyleGuide'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import { FlatList } from 'native-base'
import Card from './component/Card'
import ImageModal from '../../components/ImageModal'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TouchableHighlight } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

const Home = () => {
  const dispatch = useDispatch()
  const appState = useSelector((state) => state.userAuthReducer)
  const [data, setData] = useState([])
  const [isModalVisible, setModalVisible] = useState(false)
  const [selectedState, setSelectedState] = useState('')
  console.warn(appState.images)
  const navigation = useNavigation()

  // const timeofLogin =  appState?.time?.toDate()
  // console.warn(appState.time.toDate())



  useEffect(() => {
    console.log("asdfsd")

    fetch('https://api.unsplash.com/photos/?page=1&client_id=i0T69yPZtIGys30Zdzcp9OPF3nQ2x36JN18-WB6ZNuo').then((x) => { return x.json() }).then((data) => {
  console.log(data)
      setData(data)
      dispatch(setDataImages({ images:  data }))
    }).catch((err) => {
      console.warn(err)
    })
  }, [navigation])

  const userLogout = () => {

    dispatch(setSignOut())



  }



  // console.warn(data,"data")
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar

        animated={true}
        backgroundColor={StyleGuide.color.primary}

      />
      <View style={{ flexDirection: "row", backgroundColor: StyleGuide.color.primary, justifyContent: 'space-between', padding: 20, alignItems: "center" }}  >
        <Text style={styles.loginTimeText}>{appState?.time}</Text>
        <TouchableHighlight activeOpacity={0.6}
          underlayColor="#DDDDDD" onPress={userLogout}>
          <AntDesign
            name={'poweroff'}
            color={'white'}
            size={25}


          />
        </TouchableHighlight>

      </View>

      {/* <Card  urls={urls} /> */}
      <FlatList data={appState?.images} renderItem={(item) => (<Card {...item} isModalVisible={isModalVisible} setModalVisible={setModalVisible} selectedState={selectedState} setSelectedState={setSelectedState} />)} />

      <View style={{ marginVertical: 10 }}>


        {/* <ButtonComponent buttonTitle='logout' backgroundColor='green' onPress={userLogout}   /> */}
        <ImageModal
          setVisibility={setModalVisible}
          isvisible={isModalVisible}
          source={selectedState}
        />
      </View>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({

  loginTimeText: {
    color: "white", fontFamily: StyleGuide.fontFamily.medium, fontSize: widthPercentageToDP('4%'), textAlign: 'center',
    marginTop: 10
  }


})

export default Home
