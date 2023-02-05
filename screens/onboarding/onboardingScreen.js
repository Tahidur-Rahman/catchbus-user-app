import React, { useCallback, useState, useRef } from "react";
import { SafeAreaView, View, BackHandler, Dimensions, TouchableOpacity, StatusBar, Image, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import Swiper from 'react-native-swiper';
import { useFocusEffect } from '@react-navigation/native';
import { setData } from "../../utils/AsyncStorageManager";

const { height } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }) => {

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

    const swiperRef = useRef(null);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [backClickCount, setBackClickCount] = useState(0);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                <Swiper
                    ref={swiperRef}
                    onIndexChanged={onIndexChanged.bind(this)}
                    style={styles.wrapper}
                    showsButtons={false}
                    scrollEnabled={false}
                    showsPagination
                    paginationStyle={{ position: 'absolute', bottom: 130.0, }}
                    dot={<View style={styles.dotStyle} />}
                    activeDot={<View style={styles.activeDotStyle} />}
                >
                    {page1()}
                    {page2()}
                    {page3()}
                </Swiper>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        if (currentIndex == 0) {
                            swiperRef.current.scrollBy(1)
                        }
                        else if (currentIndex == 1) {
                            swiperRef.current.scrollBy(1)
                        }
                        else {
                            setData('opened',true)
                            navigation.push('SelectUser')
                        }
                    }}
                    style={styles.nextAndLoginButtonStyle}
                >
                    <Text style={{ ...Fonts.primaryColor20SemiBold }}>
                        {currentIndex == 2 ? 'Continue' : 'Next'}
                    </Text>
                </TouchableOpacity>
            </View>
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

    function onIndexChanged(index) {
        setCurrentIndex(index)
    }

    function page3() {
        return (
            <View style={styles.pageWrapStyle}>
                <Image
                    source={require('../../assets/images/onboarding/onboarding3.png')}
                    style={{ height: height / 2.5, width: '100%', resizeMode: 'contain' }}
                />
                <Text style={{ textAlign: 'center', marginBottom: Sizes.fixPadding - 5.0, ...Fonts.whiteColor21Bold }}>
                    Live Bus Tracking
                </Text>
                <Text style={{ ...Fonts.whiteColor14Regular, textAlign: 'center', }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in manga urna, lectus duis.
                </Text>
            </View>
        )
    }

    function page2() {
        return (
            <View style={styles.pageWrapStyle}>
                <Image
                    source={require('../../assets/images/onboarding/onboarding2.png')}
                    style={{ height: height / 2.5, width: '100%', resizeMode: 'contain' }}
                />
                <Text style={{ textAlign: 'center', marginBottom: Sizes.fixPadding - 5.0, ...Fonts.whiteColor21Bold }}>
                    Check Seat Availability
                </Text>
                <Text style={{ ...Fonts.whiteColor14Regular, textAlign: 'center', }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in manga urna, lectus duis.
                </Text>
            </View>
        )
    }

    function page1() {
        return (
            <View style={styles.pageWrapStyle}>
                <Image
                    source={require('../../assets/images/onboarding/onboarding1.png')}
                    style={{ height: height / 2.5, width: '100%', resizeMode: 'contain' }}
                />
                <Text style={{ textAlign: 'center', marginBottom: Sizes.fixPadding - 5.0, ...Fonts.whiteColor21Bold }}>
                    Find Exact Bus for your Route
                </Text>
                <Text style={{ ...Fonts.whiteColor14Regular, textAlign: 'center', }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in manga urna, lectus duis.
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {},
    dotStyle: {
        borderRadius: 4.0,
        height: 8.0,
        width: 8.0,
        marginHorizontal: Sizes.fixPadding - 5.0,
        backgroundColor: '#FFFFFF30'
    },
    activeDotStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: 6.0,
        height: 12.0,
        width: 12.0,
        marginHorizontal: Sizes.fixPadding - 5.0,
    },
    pageWrapStyle: {
        flex: 1,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        justifyContent: 'flex-end',
        paddingBottom: Sizes.fixPadding * 12.0,
        alignItems: 'center',
        marginBottom: Sizes.fixPadding * 6.0,
        backgroundColor: Colors.primaryColor,
    },
    nextAndLoginButtonStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 40.0,
        paddingHorizontal: Sizes.fixPadding * 3.0,
        paddingVertical: Sizes.fixPadding - 6.0,
        elevation: 2.0,
        shadowColor: Colors.primaryColor,
        alignSelf: 'center',
    },
    animatedView: {
        backgroundColor: "#333333",
        position: "absolute",
        bottom: 40,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    }
})

export default OnboardingScreen;