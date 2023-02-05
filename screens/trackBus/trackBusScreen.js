import { Text, StyleSheet, View, Dimensions, Image, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors, Fonts, Sizes, } from '../../constants/styles';
import { MaterialIcons, } from '@expo/vector-icons';
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import BottomSheet from 'react-native-simple-bottom-sheet';
import { Key } from "../../constants/key";
import MapViewDirections from 'react-native-maps-directions';

const { height } = Dimensions.get('window');

const busRoutesList = [
    {
        id: '1',
        coordinate: {
            latitude: 22.650329,
            longitude: 88.361861,
        },
        time: '10:20 am',
        route: '9 Bailey Drive, Fredericton, NB E3B 5A3',
        isArrive: true,
        markerColor: '#E57373',
    },
    {
        id: '2',
        coordinate: {
            latitude: 22.624979,
            longitude: 88.380070,
        },
        time: '10:40 am',
        route: '40 Pictou Island Road, Pictou Island',
        isArrive: true,
        markerColor: '#FFB74D',
    },
    {
        id: '3',
        coordinate: {
            latitude: 22.658567,
            longitude: 88.441909,
        },
        time: '11:00 am',
        route: '1 Refinery Road, Come By',
        isArrive: false,
        markerColor: '#F06292',
    },
    {
        id: '4',
        coordinate: {
            latitude: 22.688345,
            longitude: 88.418891,
        },
        time: '11:20 am',
        route: '38 Whiteshell Avenue, Winnipeg',
        isArrive: false,
        markerColor: '#64B5F6',
    },
    {
        id: '5',
        coordinate: {
            latitude: 22.678525,
            longitude: 88.460777,
        },
        time: '11:40 am',
        route: '225 Belleville St, Victoria, BC',
        isArrive: false,
        markerColor: '#4DB6AC',
    },
];

const TrackBusScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {mapView()}
                {header()}
                {busRouteInfo()}
            </View>
        </SafeAreaView>
    )

    function busRouteInfo() {
        return (
            <BottomSheet
                isOpen={false}
                sliderMinHeight={
                    (busRoutesList.length * 60) > (height / 2.35) ? (height / 2.35) : (busRoutesList.length * 60)
                }
                sliderMaxHeight={height - 100}
                lineContainerStyle={{ width: 0.0, height: 0.0, }}
                lineStyle={{ width: 0.0, height: 0.0, }}
                wrapperStyle={styles.bottomSheetWrapStyle}
            >
                <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor20SemiBold }}>
                    Bus Route
                </Text>
                {
                    busRoutesList.map((item) => (
                        <View
                            key={`${item.id}`}
                            style={styles.busRouteInfoWrapStyle}
                        >
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ width: 60.0, ...item.isArrive ? { ...Fonts.grayColor14Regular } : { ...Fonts.blackColor14Regular } }}>
                                    {item.time}
                                </Text>
                                <View style={{ marginHorizontal: Sizes.fixPadding + 5.0, alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={styles.roadStyle}>
                                        <View style={{ backgroundColor: Colors.whiteColor, width: 1.5, height: Sizes.fixPadding * 4.3, }} />
                                    </View>
                                    <View style={{
                                        backgroundColor: item.isArrive ? `${item.markerColor}55` : item.markerColor,
                                        ...styles.routeMarkerStyle,
                                        position: 'absolute',
                                    }}>
                                        <Image
                                            source={require('../../assets/images/icons/location.png')}
                                            style={{ tintColor: Colors.whiteColor, width: 18.0, height: 18.0, resizeMode: 'contain' }}
                                        />
                                    </View>
                                </View>
                                <Text numberOfLines={2} style={{ marginRight: Sizes.fixPadding - 7.0, flex: 1, ...item.isArrive ? { ...Fonts.grayColor14Regular } : { ...Fonts.blackColor14Regular } }}>
                                    {item.route}
                                </Text>
                            </View>
                            {
                                item.isArrive ?
                                    null
                                    :
                                    <Image
                                        source={require('../../assets/images/icons/reminder.png')}
                                        style={{ width: 20.0, height: 20.0, resizeMode: 'contain' }}
                                    />
                            }
                        </View>
                    ))
                }
            </BottomSheet>
        )
    }

    function mapView() {
        const currentBusLocation = {
            latitude: 22.633218,
            longitude: 88.425065,
        }

        const userLocation = {
            latitude: 22.661955,
            longitude: 88.409673,
        }

        const userToBus = busRoutesList.filter((item) => item.isArrive == false)

        return (
            <MapView
                region={{
                    latitude: 22.589799,
                    longitude: 88.394494,
                    latitudeDelta: 0.17,
                    longitudeDelta: 0.17,
                }}
                style={{ height: '100%', }}
                provider={PROVIDER_GOOGLE}
                mapType="terrain"
            >
                {
                    busRoutesList.map((item) => (
                        <Marker key={`${item.id}`} coordinate={item.coordinate}>
                            <View style={{
                                ...styles.routeMarkerStyle,
                                backgroundColor: item.isArrive ? `${item.markerColor}60` : item.markerColor,
                            }}>
                                <Image
                                    source={require('../../assets/images/icons/location.png')}
                                    resizeMode="contain"
                                    style={{ width: 15.0, height: 15.0, tintColor: Colors.whiteColor }}
                                />
                            </View>
                        </Marker>
                    ))
                }
                {
                    busRoutesList.map((item, index) => (
                        busRoutesList.length - 1 !== index ?
                            <MapViewDirections
                                key={`${item.id}`}
                                origin={item.coordinate}
                                destination={busRoutesList[index + 1].coordinate}
                                apikey={Key.apiKey}
                                strokeColor={Colors.primaryColor}
                                strokeWidth={3}
                            />
                            :
                            null
                    ))
                }
                {
                    userToBus.length !== 0
                        ?
                        <MapViewDirections
                            origin={userLocation}
                            destination={userToBus[0].coordinate}
                            apikey={Key.apiKey}
                            lineDashPattern={[1]}
                            strokeColor={Colors.redColor}
                            strokeWidth={3}
                        />
                        :
                        null
                }
                <Marker coordinate={currentBusLocation}>
                    <Image
                        source={require('../../assets/images/icons/bus.png')}
                        resizeMode="contain"
                        style={{ marginBottom: Sizes.fixPadding - 25.0, width: 50.0, height: 50.0, resizeMode: 'contain' }}
                    />
                </Marker>
                <Marker coordinate={userLocation}>
                    <Image
                        source={require('../../assets/images/icons/locationFixed.png')}
                        resizeMode="contain"
                        style={{ marginBottom: Sizes.fixPadding - 13.0, width: 25.0, height: 25.0, resizeMode: 'contain' }}
                    />
                </Marker>
            </MapView>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.pop()}
                    style={styles.backIconWrapStyle}
                >
                    <MaterialIcons name="keyboard-arrow-left" size={24} color={Colors.blackColor} />
                </TouchableOpacity>
                <Text style={{ textAlign: 'center', flex: 1, ...Fonts.blackColor20Bold }}>
                    City Circular Exp 2589
                </Text>
            </View>
        )
    }
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
    bottomSheetWrapStyle: {
        paddingBottom: Sizes.fixPadding - 5.0,
        paddingTop: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        borderTopLeftRadius: 0.0,
        borderTopRightRadius: 0.0
    },
    headerWrapStyle: {
        position: 'absolute',
        left: 0.0,
        right: 0.0,
        top: 0.0,
        margin: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center'
    },

    routeMarkerStyle: {
        width: 25.0,
        height: 25.0,
        borderRadius: 12.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    roadStyle: {
        width: 13.0,
        alignItems: 'center',
        backgroundColor: 'rgba(71, 72, 76, 0.74)',
        height: Sizes.fixPadding * 4.8,
        justifyContent: 'center'
    },
    busRouteInfoWrapStyle: {
        height: Sizes.fixPadding * 4.8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
})

export default TrackBusScreen;