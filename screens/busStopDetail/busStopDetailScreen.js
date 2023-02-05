import { Text, StyleSheet, View, Image, Dimensions, SafeAreaView, ScrollView, StatusBar, TouchableOpacity } from 'react-native'
import React, { useRef } from 'react'
import { Colors, Fonts, Sizes, } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import BottomSheet from 'react-native-simple-bottom-sheet';

const activeLinesList = [
    {
        id: '1',
        busName: 'City Circular Exp 2589',
        currentLocation: '1 Refinery Road, Come By Chance, NL A0B 1N0',
        time: '05 min',
    },
    {
        id: '2',
        busName: 'Railway Square 1710',
        currentLocation: '9 Bailey Drive, Fredericton, NB E3B 5A3',
        time: '10 min',
    },
    {
        id: '3',
        busName: 'The Jester 1589',
        currentLocation: '225 Belleville St, Victoria, BC V8V 1X1',
        time: '12 min',
    },
    {
        id: '4',
        busName: 'Royal Exp 1478',
        currentLocation: '8 Whiteshell Avenue, Winnipeg, MB R2C 2X5',
        time: '15 min',
    },
];

const { height } = Dimensions.get('window');

const BusStopDetailScreen = ({ route, navigation }) => {

    const panelRef = useRef(null);

    var marker = route.params.marker;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {mapView()}
                {header()}
                {activeLines()}
            </View>
        </SafeAreaView>
    )

    function activeLines() {
        return (
            <BottomSheet
                ref={ref => panelRef.current = ref}
                isOpen={false}
                sliderMinHeight={activeLinesList.length * 80 > height / 2.5 ? height / 2.5 : activeLinesList.length * 80}
                sliderMaxHeight={height - 100}
                lineContainerStyle={{ width: 0.0, height: 0.0, }}
                lineStyle={{ width: 0.0, height: 0.0, }}
                wrapperStyle={styles.bottomSheetWrapStyle}
            >
                <Text style={{ marginBottom: Sizes.fixPadding + 5.0, ...Fonts.blackColor20SemiBold }}>
                    Active Lines
                </Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        activeLinesList.map((item) => (
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => navigation.push('BusRoute', { item })}
                                key={`${item.id}`} style={{ marginBottom: Sizes.fixPadding + 5.0, flexDirection: 'row', }}
                            >
                                <MaterialIcons name="directions-bus" size={24} color={Colors.primaryColor} />
                                <View style={{ marginLeft: Sizes.fixPadding, flex: 1 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Text numberOfLines={1} style={{ lineHeight: 19.0, flex: 1, marginRight: Sizes.fixPadding, ...Fonts.blackColor15Medium }}>
                                            {item.busName}
                                        </Text>
                                        <Text style={{ lineHeight: 19.0, ...Fonts.primaryColor14SemiBold }}>
                                            {item.time}
                                        </Text>
                                    </View>
                                    <Text numberOfLines={1} style={{ ...Fonts.grayColor14Regular }}>
                                        {item.currentLocation}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
            </BottomSheet>
        )
    }

    function mapView() {
        return (
            <MapView
                region={{
                    latitude: 22.616739,
                    longitude: 88.436059,
                    latitudeDelta: 0.035,
                    longitudeDelta: 0.035,
                }}
                style={{ height: '100%', }}
                provider={PROVIDER_GOOGLE}
                mapType="terrain"
            >
                <Marker coordinate={marker.coordinate}>
                    <Image
                        source={require('../../assets/images/marker.png')}
                        resizeMode="contain"
                        style={{ width: 30.0, height: 30.0, tintColor: Colors.primaryColor }}
                    />
                </Marker>
            </MapView >
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
                    {marker.stationName}
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
        borderTopRightRadius: 0.0,
        backgroundColor: Colors.whiteColor,
    },
    headerWrapStyle: {
        position: 'absolute',
        left: 0.0,
        right: 0.0,
        top: 0.0,
        margin: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default BusStopDetailScreen;