import { Text, Animated, StyleSheet, Dimensions, View, SafeAreaView, Image, TextInput, StatusBar, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Colors, Fonts, Sizes, } from '../../constants/styles';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

const markers = [
    {
        coordinate: {
            latitude: 22.6293867,
            longitude: 88.4354486,
        },
        stationName: 'Delano Greyhound Station',
        stationImage: require('../../assets/images/busStations/station1.png'),
        distance: '1 km',
        time: '5min'
    },
    {
        coordinate: {
            latitude: 22.6345648,
            longitude: 88.4377279,
        },
        stationName: 'Hayward station',
        stationImage: require('../../assets/images/busStations/station2.png'),
        distance: '1.5 km',
        time: '8min'
    },
    {
        coordinate: {
            latitude: 22.6281662,
            longitude: 88.4410113,
        },
        stationName: 'Lodi Transit Station',
        stationImage: require('../../assets/images/busStations/station3.png'),
        distance: '1 km',
        time: '5min'
    },
    {
        coordinate: {
            latitude: 22.6341137,
            longitude: 88.4497463,
        },
        stationName: 'Salinas station',
        stationImage: require('../../assets/images/busStations/station4.png'),
        distance: '1.5 km',
        time: '8min'
    },
    {
        coordinate: {
            latitude: 22.6292757,
            longitude: 88.444781,
        },
        stationName: 'Tulare Greyhound Station',
        stationImage: require('../../assets/images/busStations/station5.png'),
        distance: '1.5 km',
        time: '8min'
    }
];

const { width } = Dimensions.get('window');

const NearByStationsScreen = ({ navigation }) => {

    const [currentLocation, setCurrentLocation] = useState('');
    const [destinationLocation, setDestinationLocation] = useState('1901 Thornridge Cir. Shiloh, Hawaii 81063');

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                {locationInfo()}
                <NearByBusStop navigation={navigation} />
            </View>
        </SafeAreaView>
    )

    function locationInfo() {
        return (
            <View style={styles.locationInfoWrapStyle}>
                <View style={{ marginHorizontal: Sizes.fixPadding + 5.0, flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/images/icons/locationFixed.png')}
                        style={{ width: 22.0, height: 22.0, resizeMode: 'contain' }}
                    />
                    <TextInput
                        value={currentLocation}
                        onChangeText={(value) => setCurrentLocation(value)}
                        placeholder='Your current location'
                        placeholderTextColor={Colors.blackColor}
                        selectionColor={Colors.primaryColor}
                        style={{ flex: 1, marginLeft: Sizes.fixPadding * 2.0, ...Fonts.blackColor15Regular }}
                    />
                </View>
                <View style={styles.currentToDestinationDividerStyle}>
                    <Text style={styles.dotStyle}>
                        •{`\n`}
                        •{`\n`}
                        •
                    </Text>
                    <View style={styles.locationDividerStyle} />
                </View>
                <View style={{ marginHorizontal: Sizes.fixPadding + 5.0, flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/images/icons/location.png')}
                        style={{ width: 22.0, height: 22.0, resizeMode: 'contain' }}
                    />
                    <TextInput
                        value={destinationLocation}
                        onChangeText={(value) => setDestinationLocation(value)}
                        placeholder='Your destination location'
                        placeholderTextColor={Colors.blackColor}
                        selectionColor={Colors.primaryColor}
                        style={{ flex: 1, marginLeft: Sizes.fixPadding * 2.0, ...Fonts.blackColor15Regular }}
                    />
                </View>
            </View>
        )
    }

    function header() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.pop()}
                    style={styles.backIconWrapStyle}
                >
                    <MaterialIcons name="keyboard-arrow-left" size={24} color={Colors.blackColor} />
                </TouchableOpacity>
                <Text style={{ textAlign: 'center', flex: 1, ...Fonts.blackColor20Bold }}>
                    Nearby Bus Stops
                </Text>
            </View>
        )
    }
}

const cardWidth = width / 1.5;

const NearByBusStop = ({ navigation }) => {

    const [markerList] = useState(markers);
    const [region] = useState(
        {
            latitude: 22.6281662,
            longitude: 88.4410113,
            latitudeDelta: 0.035,
            longitudeDelta: 0.035,
        }
    );

    let mapAnimation = new Animated.Value(0);
    let mapIndex = 0;

    useEffect(() => {
        mapAnimation.addListener(({ value }) => {
            let index = Math.floor(value / cardWidth + 0.3);
            if (index >= markerList.length) {
                index = markerList.length - 1;
            }
            if (index <= 0) {
                index = 0;
            }

            clearTimeout(regionTimeout);

            const regionTimeout = setTimeout(() => {
                if (mapIndex != index) {
                    mapIndex = index;
                    const { coordinate } = markerList[index];
                    _map.current.animateToRegion(
                        {
                            ...coordinate,
                            latitudeDelta: region.latitudeDelta,
                            longitudeDelta: region.longitudeDelta,
                        }, 350
                    )
                }
            }, 10);
        });
    });

    const interpolation = markerList.map((marker, index) => {
        const inputRange = [
            (index - 1) * cardWidth,
            index * cardWidth,
            ((index + 1) * cardWidth),
        ];

        const scale = mapAnimation.interpolate({
            inputRange,
            outputRange: [1, 1.5, 1],
            extrapolate: "clamp"
        })

        return { scale };
    })

    const _map = React.useRef(null);

    return (
        <View style={{ flex: 1, }}>
            <MapView
                ref={_map}
                region={region}
                style={{ height: '100%', }}
                provider={PROVIDER_GOOGLE}
                mapType="terrain"
            >
                {markerList.map((marker, index) => {
                    const scaleStyle = {
                        transform: [
                            {
                                scale: interpolation[index].scale
                            }
                        ]
                    }
                    return (
                        <Marker
                            key={index}
                            coordinate={marker.coordinate}
                        >
                            <Animated.View style={styles.markerWrapStyle}>
                                <Animated.Image
                                    source={require('../../assets/images/marker.png')}
                                    resizeMode="contain"
                                    style={[styles.markerStyle, scaleStyle]}
                                >
                                </Animated.Image>
                            </Animated.View>
                        </Marker>
                    )
                })}
            </MapView>
            <Animated.ScrollView
                horizontal={true}
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                style={styles.busStationInfoWrapStyle}
                snapToInterval={cardWidth + 40}
                snapToAlignment="center"
                contentContainerStyle={{
                    paddingLeft: Sizes.fixPadding,
                    paddingRight: Sizes.fixPadding * 2.0
                }}
                onScroll={
                    Animated.event(
                        [
                            {
                                nativeEvent: {
                                    contentOffset: {
                                        x: mapAnimation,
                                    }
                                }
                            }
                        ],
                        { useNativeDriver: true }
                    )
                }
            >
                {markerList.map((marker, index) => (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        key={index}
                        onPress={() => navigation.push('BusStopDetail', { marker })}
                        style={styles.busStationInfoInnerStyle}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                source={marker.stationImage}
                                style={{ width: 60.0, height: 60.0, borderRadius: Sizes.fixPadding - 5.0, }}
                            />
                            <View style={{ marginLeft: Sizes.fixPadding + 5.0, flex: 1, }}>
                                <Text numberOfLines={1} style={{ ...Fonts.blackColor18Medium }}>
                                    {marker.stationName}
                                </Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <FontAwesome5 name="walking" size={16} color={Colors.primaryColor} />
                                    <Text numberOfLines={1} style={{ flex: 1, marginLeft: Sizes.fixPadding - 5.0, ...Fonts.grayColor16Regular }}>
                                        {marker.distance} ({marker.time})
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </Animated.ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    backIconWrapStyle: {
        width: 36.0,
        height: 36.0,
        borderRadius: 18.0,
        backgroundColor: 'rgba(111, 111, 111, 0.05)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    locationDividerStyle: {
        marginLeft: Sizes.fixPadding * 2.0,
        flex: 1,
        backgroundColor: 'rgba(111, 111, 111, 0.1)',
        height: 1.0
    },
    currentToDestinationDividerStyle: {
        marginLeft: Sizes.fixPadding + 5.0,
        marginVertical: Sizes.fixPadding - 6.0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    dotStyle: {
        textAlign: 'center',
        width: 22.0,
        ...Fonts.grayColor16UltraLight,
        lineHeight: 6.0,
        paddingTop: 5.0,
    },
    locationInfoWrapStyle: {
        backgroundColor: 'rgba(111, 111, 111, 0.05)',
        marginHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        marginTop: Sizes.fixPadding,
    },
    markerStyle: {
        width: 27.0,
        height: 27.0,
        tintColor: Colors.primaryColor,
    },
    busStationInfoInnerStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 0.50,
        marginHorizontal: Sizes.fixPadding,
        padding: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding - 5.0,
        width: width / 1.4,
        marginBottom: Sizes.fixPadding,
    },
    busStationInfoWrapStyle: {
        position: 'absolute',
        bottom: 10.0,
        left: 0.0,
        right: 0.0,
        paddingVertical: 10.0,
    },
    markerWrapStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 40.0,
        height: 40.0,
    }
})

export default NearByStationsScreen;