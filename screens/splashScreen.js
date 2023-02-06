import { Text, StyleSheet, BackHandler, View, Image, SafeAreaView, StatusBar } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Colors, Fonts, Sizes, } from '../constants/styles';
import { useFocusEffect } from '@react-navigation/native';
import { getData } from '../utils/AsyncStorageManager';
import { useDispatch } from 'react-redux';
import { useGetMeQuery } from '../redux/features/api/authApi';
import { setUser } from '../redux/features/rootSlice';
import { getCurrentLocation } from '../utils/getCurrentLocation';

const SplashScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [authToken, setAuthToken] = useState("");
    const { data, isLoading, error } = useGetMeQuery(authToken);

    const backAction = () => {
        BackHandler.exitApp();
        return true;
    }

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );
    async function load() {
      getData("token")
        .then((value) => setAuthToken(value))
        .catch((err) => checkStatus());
      const checkStatus = () =>
        getData("user_type")
          .then((value) => navigation.navigate(value?"Login":"Onboarding"))
          .catch((e) => navigation.navigate("Onboarding"));
      if (data?.user) {
        console.log('data.user',data.user)
        navigation.navigate("Home");
        dispatch(setUser(data?.user));
            const location = await getCurrentLocation();
            console.log(location)
      }
      if (error) {
        checkStatus()
      }
    }
    useEffect(() => {
    load()
}, []);
setTimeout(() => {
   load()
}, 2000);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {appLogoWithTitle()}
            </View>
        </SafeAreaView>
    )

    function appLogoWithTitle() {
        return (
            <>
                <View style={styles.appLogoWrapStyle}>
                    <Image
                        source={require('../assets/images/marker.png')}
                        style={{ width: 42.0, height: 56.0, resizeMode: 'contain', tintColor: Colors.whiteColor }}
                    />
                </View>
                <Text style={{ lineHeight: 60.0, ...Fonts.primaryColor40Regular }}>
                    Catch Bus
                </Text>
            </>
        )
    }
}

const styles = StyleSheet.create({
    appLogoWrapStyle: {
        width: 100.0,
        height: 100.0,
        borderRadius: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryColor,
        elevation: 5.0,
        shadowColor: Colors.primaryColor,
    }
})

export default SplashScreen;