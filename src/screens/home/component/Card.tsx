import { View, Text, TouchableOpacity, Image} from 'react-native'
import React, { useState } from 'react'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'

import { Avatar, VStack,  } from 'native-base';
import { StyleGuide } from '../../../../utils/StyleGuide';
import ImageModal from '../../../components/ImageModal';

interface cardProps {
    urls: {raw:string}
    isModalVisible:boolean
    setModalVisible:() =>void
    selectedState:string
    setSelectedState:()=>void
}

const Card = (props: cardProps) => {
     console.log(props.item.description,"props")
    return (
        <View style={{ borderWidth: 2,
            borderColor: '#fff',
            padding: 20,
            width: widthPercentageToDP(90),
            justifyContent: "center",
            alignSelf: 'center',
            // flexDirection: "row",
            marginVertical: 10,
            borderRadius: 6,
            backgroundColor: "#fff",
            elevation: 10}}>

            <TouchableOpacity  onPress={()=>{
                props?.setSelectedState(props?.item.urls.thumb), props?.setModalVisible(true)
            }}   >
                <View style={{}}>
                {/* <Image size="40" source={{ uri: props?.urls?.raw }} alt="react-native-test-image" /> */}

                {/* <Thumbnail square small source={{ uri: props?.urls?.raw }} /> */}
                <Image   source={{ uri: props?.item.urls.thumb }} style={{ width: '100%', height: heightPercentageToDP(20) }} />
                </View>

            </TouchableOpacity>
            <View  style={{flexDirection:'row', justifyContent:"space-between"}}>
                <Text  style={{color:'#000',     width:'60%',   fontFamily:StyleGuide.fontFamily.medium}}>{props?.item?.description}</Text>
                <Text  style={{color:'#000', marginHorizontal:15, width:"30%"  , fontFamily:StyleGuide.fontFamily.medium}}>{props?.item?.user?.name}</Text>

            </View>

         
        </View>
    )
}

export default Card