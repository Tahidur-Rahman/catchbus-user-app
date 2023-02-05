import React, { useCallback, useState, useRef } from "react";
import { SafeAreaView, View, BackHandler, Dimensions, TouchableOpacity, StatusBar, Image, StyleSheet, Text, Pressable } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { useFocusEffect } from '@react-navigation/native';
import { FlatList } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { setData } from "../../utils/AsyncStorageManager";

const { height } = Dimensions.get('window');

const USER_TYPES = [
    {
      icon: 'human-greeting',
      type: 'User',
    },
    {
      icon: 'bus',
      type: 'Driver',
    },
    {
      icon: 'bus',
      type: 'Rider',
    },
  ];
const SelectUser = ({ navigation }) => {

    const backAction = () => {
        backClickCount == 1 ? BackHandler.exitApp() : _spring();
        return true;
    }

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    function _spring() {
        setBackClickCount(1);
        setTimeout(() => {
            setBackClickCount(0)
        }, 1000)
    }

    function appLogoWithTitle() {
        return (
            <>
                <View style={styles.appLogoWrapStyle}>
                    <Image
                        source={require('../../assets/images/marker.png')}
                        style={{ width: 42.0, height: 56.0, resizeMode: 'contain', tintColor: Colors.whiteColor }}
                    />
                </View>
                <Text style={{ lineHeight: 60.0, ...Fonts.primaryColor40Regular,
        alignSelf: 'center', }}>
                    Catch Bus
                </Text>
            </>
        )
    }

    const [backClickCount, setBackClickCount] = useState(0);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor}}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            {appLogoWithTitle()}
            <Text style={{ lineHeight: 60.0, ...Fonts.blackColor22SemiBold,
        alignSelf: 'center',marginTop:50 }}>
                 Select who you are
                </Text>
            <FlatList
        style={{marginTop:20}}
        data={USER_TYPES}
        renderItem={({item}) => (
            <Pressable
            onPress={() =>{navigation.navigate('Login');setData('user_type',item.type.toLowerCase())}}
            style={{
              width:'75%',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 2.84,
              elevation: 3,
              margin:2,
              marginBottom: 15,
              backgroundColor:"#fff",
                borderRadius: 10,
                alignSelf:'center',
                flexDirection:'row',
                padding:20,
                paddingHorizontal:70,
                alignItems:'center'
            }}>   
              <MaterialCommunityIcons name={item.icon} size={40} color="black" />
              
              <Text style={{...Fonts.blackColor18Medium,marginLeft:20}}>{item.type}</Text>
          </Pressable>
        )}
        keyExtractor={item => item.page}
      />
            {
                backClickCount == 1
                    ?
                    <View style={[styles.animatedView]}>
                        <Text style={{ ...Fonts.whiteColor14Regular }}>
                            Press Back Once Again to Exit
                        </Text>
                    </View>
                    :
                    null
            }
        </SafeAreaView>
    )

    
}

const styles = StyleSheet.create({
    appLogoWrapStyle: {
        marginTop: 100.0,
        width: 100.0,
        height: 100.0,
        borderRadius: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryColor,
        elevation: 5.0,
        shadowColor: Colors.primaryColor,
    }
})

export default SelectUser;