import { Text, StyleSheet, View, Dimensions, Image, SafeAreaView, StatusBar, TouchableOpacity, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import { Colors, Fonts, Sizes, } from '../../constants/styles';
import { MaterialIcons, } from '@expo/vector-icons';
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import BottomSheet from 'react-native-simple-bottom-sheet';
import { Key } from "../../constants/key";
import MapViewDirections from 'react-native-maps-directions';
import { BottomSheet as SimpleBottomSheet, Dialog } from "@rneui/themed";

const { height, width } = Dimensions.get('window');

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

const daysList = [
    {
        id: '1',
        day: 'Mon',
        selected: true,
    },
    {
        id: '2',
        day: 'Tue',
        selected: true,
    },
    {
        id: '3',
        day: 'Wed',
        selected: false,
    },
    {
        id: '4',
        day: 'Thu',
        selected: false,
    },
    {
        id: '5',
        day: 'Fri',
        selected: false,
    },
    {
        id: '6',
        day: 'Sat',
        selected: true,
    },
    {
        id: '7',
        day: 'Sun',
        selected: false,
    },
    {
        id: '8',
        day: 'Daily',
        selected: false,
    },
];

const minutes = Array(60 - 1 + 1).fill().map((_, idx) => 1 + idx);

const busStopsList = ['Hayward station', 'Delano Greyhound Station', 'Lodi Transit Station', 'Salinas station', 'Hayward station', 'Delano Greyhound Station', 'Lodi Transit Station', 'Salinas station'];

const BusRouteScreen = ({ route, navigation }) => {

    const item = route.params.item;

    const mapRef = useRef();

    const [showReminderSheet, setShowReminderSheet] = useState(false);
    const [showDaysSheet, setShowDaysSheet] = useState(false);
    const [days, setDays] = useState(daysList);
    const [showTimeSheet, setShowTimeSheet] = useState(false);
    const [selectedReminderMinute, setSelectedReminderMinute] = useState(5);
    const [finalReminderMinute, setFinalReminderMinute] = useState(null);
    const [finalSelectedDays, setFinalSelectedDays] = useState(null);
    const [showBusStopsSheet, setShowBusStopsSheet] = useState(false);
    const [selectedBusStopIndex, setSelectedBusStopIndex] = useState(3);
    const [finalSelectedBusStop, setFinalSelectedBusStop] = useState(null);
    const [showSaveReminderDialog, setShowSaveReminderDialog] = useState(false);
    const [showBookTicketSheet, setShowBookTicketSheet] = useState(false);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {mapView()}
                {header()}
                {busRouteInfo()}
                {reminderInfo()}
            </View>
            {saveReminderDialog()}
            {selectDaysSheet()}
            {selectTimeSheet()}
            {selectBusStopSheet()}
            {bookTicketSheet()}
        </SafeAreaView>
    )

    function bookTicketSheet() {
        return (
            <SimpleBottomSheet
                isVisible={showBookTicketSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
                modalProps={{ onRequestClose: () => { setShowBookTicketSheet(false) }, }}
            >
                <View style={{ paddingTop: Sizes.fixPadding * 2.0, paddingHorizontal: Sizes.fixPadding * 2.0, backgroundColor: Colors.whiteColor }}>
                    <View style={{ marginBottom: Sizes.fixPadding + 3.0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ ...Fonts.blackColor20SemiBold }}>
                            Book Ticket
                        </Text>
                        <MaterialIcons
                            name="close"
                            size={24}
                            color={Colors.blackColor}
                            onPress={() => setShowBookTicketSheet(false)}
                        />
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                source={require('../../assets/images/icons/locationFixed.png')}
                                style={{ width: 22.0, height: 22.0, resizeMode: 'contain' }}
                            />
                            <Text numberOfLines={1} style={{ flex: 1, marginLeft: Sizes.fixPadding * 2.0, ...Fonts.blackColor15Regular }}>
                                7 W. Gray St. Utica, Pennsylvania 57867
                            </Text>
                        </View>
                        <View style={styles.currentToDestinationDividerStyle}>
                            <Text style={styles.dotStyle}>
                                •{`\n`}
                                •{`\n`}
                                •
                            </Text>
                            <View style={styles.locationDividerStyle} />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                source={require('../../assets/images/icons/location.png')}
                                style={{ width: 22.0, height: 22.0, resizeMode: 'contain', }}
                            />
                            <Text numberOfLines={1} style={{ flex: 1, marginLeft: Sizes.fixPadding * 2.0, ...Fonts.blackColor15Regular }}>
                                1901 Thornridge Cir. Shiloh, Hawaii 81063
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                            setShowBookTicketSheet(false)
                            navigation.push('PaymentMethod')
                        }}
                        style={styles.buttonStyle}
                    >
                        <Text style={{ ...Fonts.whiteColor20SemiBold }}>
                            Continue
                        </Text>
                    </TouchableOpacity>
                </View>
            </SimpleBottomSheet>
        )
    }

    function selectBusStopSheet() {
        return (
            <SimpleBottomSheet
                isVisible={showBusStopsSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
                modalProps={{ onRequestClose: () => { setShowBusStopsSheet(false) }, }}
            >
                <View style={{ paddingTop: Sizes.fixPadding * 3.0, backgroundColor: Colors.whiteColor }}>
                    <ScrollView
                        contentContainerStyle={{ alignSelf: 'center', paddingHorizontal: Sizes.fixPadding, }}
                        showsVerticalScrollIndicator={false}
                        style={{ maxHeight: 230.0, }}
                    >
                        {
                            busStopsList.map((item, index) => (
                                <Text
                                    key={`${index}`}
                                    onPress={() => setSelectedBusStopIndex(index)}
                                    numberOfLines={1}
                                    style={{
                                        textAlign: 'center',
                                        marginBottom: Sizes.fixPadding - 5.0,
                                        ...selectedBusStopIndex == index
                                            ?
                                            { ...Fonts.primaryColor16Medium }
                                            :
                                            selectedBusStopIndex - 1 == index || selectedBusStopIndex + 1 == index
                                                ?
                                                { ...Fonts.grayColor16Regular }
                                                :
                                                { ...Fonts.lightGrayColor16Regular }
                                    }}
                                >
                                    {item}
                                </Text>
                            ))
                        }
                    </ScrollView>
                    <View style={{ margin: Sizes.fixPadding * 2.0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => { setShowBusStopsSheet(false) }}
                            style={{ backgroundColor: Colors.whiteColor, ...styles.cancelAndDoneButtonStyle, }}
                        >
                            <Text style={{ ...Fonts.primaryColor20SemiBold }}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => {
                                setFinalSelectedBusStop(busStopsList[selectedBusStopIndex])
                                setShowBusStopsSheet(false)
                            }}
                            style={{
                                ...styles.cancelAndDoneButtonStyle,
                                backgroundColor: Colors.primaryColor,
                                elevation: 1.5,
                                shadowColor: Colors.primaryColor,
                            }}
                        >
                            <Text style={{ ...Fonts.whiteColor20SemiBold }}>
                                Done
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SimpleBottomSheet >
        )
    }

    function selectTimeSheet() {
        return (
            <SimpleBottomSheet
                isVisible={showTimeSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
                modalProps={{ onRequestClose: () => { setShowTimeSheet(false) }, }}
            >
                <View style={{ paddingTop: Sizes.fixPadding * 3.0, backgroundColor: Colors.whiteColor }}>
                    <ScrollView
                        horizontal
                        contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding, paddingBottom: Sizes.fixPadding + 5.0, }}
                        showsHorizontalScrollIndicator={false}
                        scrollEventThrottle={16}
                    >
                        {
                            minutes.map((item, index) => (
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    onPress={() => setSelectedReminderMinute(item)}
                                    key={`${index}`}
                                    style={{
                                        ...styles.minuteWrapStyle,
                                        elevation: selectedReminderMinute == item ? 1.5 : 0.0,
                                        backgroundColor: selectedReminderMinute == item ? Colors.primaryColor : Colors.whiteColor,
                                    }}
                                >
                                    <Text style={selectedReminderMinute == item ? { ...Fonts.whiteColor16Medium } : { ...Fonts.grayColor16Medium }}>
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            ))
                        }

                    </ScrollView>
                    <Text style={{ textAlign: 'center', ...Fonts.grayColor16Regular }}>
                        minutes before selected bus stop
                    </Text>
                    <View style={{ margin: Sizes.fixPadding * 2.0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => { setShowTimeSheet(false) }}
                            style={{ backgroundColor: Colors.whiteColor, ...styles.cancelAndDoneButtonStyle, }}
                        >
                            <Text style={{ ...Fonts.primaryColor20SemiBold }}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => {
                                setFinalReminderMinute(selectedReminderMinute)
                                setShowTimeSheet(false)
                            }}
                            style={{
                                ...styles.cancelAndDoneButtonStyle,
                                backgroundColor: Colors.primaryColor,
                                elevation: 1.5,
                                shadowColor: Colors.primaryColor,
                            }}
                        >
                            <Text style={{ ...Fonts.whiteColor20SemiBold }}>
                                Done
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SimpleBottomSheet>
        )
    }

    function updateDays({ id }) {
        if (id == '8') {
            const newDays = days
            const updatedDays = newDays.map((item) => {
                if (item.id == id) {
                    return { ...item, selected: !item.selected }
                }
                return { ...item, selected: false }
            })
            setDays(updatedDays)
        }
        else {
            const newDays = days
            const updatedDays = newDays.map((item) => {
                if (item.id == id) {
                    return { ...item, selected: !item.selected }
                }
                if (item.id == '8') {
                    if (item.selected) {
                        return { ...item, selected: !item.selected }
                    }
                }
                return item
            })
            setDays(updatedDays)
        }
    }

    function selectDaysSheet() {
        return (
            <SimpleBottomSheet
                isVisible={showDaysSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
                modalProps={{ onRequestClose: () => { setShowDaysSheet(false) }, }}
            >
                <View style={{ paddingHorizontal: Sizes.fixPadding * 2.0, paddingTop: Sizes.fixPadding * 2.0, backgroundColor: Colors.whiteColor }}>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
                        {
                            days.map((item, index) => (
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    onPress={() => updateDays({ id: item.id })}
                                    key={`${item.id}`}
                                    style={{
                                        ...styles.dayWrapStyle,
                                        marginRight: index % 4 == 3 ? 0.0 : Sizes.fixPadding,
                                        backgroundColor: item.selected ? Colors.primaryColor : Colors.whiteColor,
                                        borderColor: item.selected ? Colors.primaryColor : Colors.grayColor,
                                    }}
                                >
                                    <Text style={item.selected ? { ...Fonts.whiteColor15Medium } : { ...Fonts.grayColor15Medium }}>
                                        {item.day}
                                    </Text>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                    <View style={{ marginVertical: Sizes.fixPadding * 2.0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => { setShowDaysSheet(false) }}
                            style={{ backgroundColor: Colors.whiteColor, ...styles.cancelAndDoneButtonStyle, }}
                        >
                            <Text style={{ ...Fonts.primaryColor20SemiBold }}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => {
                                const finalDays = days.filter((item) => item.selected == true).map((item) => {
                                    if (item.selected == true) {
                                        return item.day
                                    }
                                })
                                setFinalSelectedDays(finalDays.toString())
                                setShowDaysSheet(false)
                            }}
                            style={{
                                ...styles.cancelAndDoneButtonStyle,
                                backgroundColor: Colors.primaryColor,
                                elevation: 1.5,
                                shadowColor: Colors.primaryColor,
                            }}
                        >
                            <Text style={{ ...Fonts.whiteColor20SemiBold }}>
                                Done
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SimpleBottomSheet>
        )
    }

    function saveReminderDialog() {
        return (
            <Dialog
                visible={showSaveReminderDialog}
                onRequestClose={() => { setShowSaveReminderDialog(false) }}
                overlayStyle={styles.dialogStyle}
            >
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ ...Fonts.blackColor20SemiBold }}>
                        Daily Reminder
                    </Text>
                    <Text style={{ margin: Sizes.fixPadding + 2.0, textAlign: 'center', ...Fonts.grayColor15Regular }}>
                        Do you want to repeat this reminder daily or on specific days?
                    </Text>
                    <View style={{ alignSelf: 'flex-end', flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <Text
                            onPress={() => setShowSaveReminderDialog(false)}
                            style={{ marginRight: Sizes.fixPadding * 2.0, ...Fonts.lightGrayColor17SemiBold }}
                        >
                            No
                        </Text>
                        <Text
                            onPress={() => {
                                setShowSaveReminderDialog(false)
                                setShowReminderSheet(false)
                            }}
                            style={{ ...Fonts.primaryColor17SemiBold }}
                        >
                            Yes, Daily
                        </Text>
                    </View>
                </View>
            </Dialog >
        )
    }

    function reminderInfo() {
        return (
            <SimpleBottomSheet
                isVisible={showReminderSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
                modalProps={{ onRequestClose: () => setShowReminderSheet(false) }}
            >
                <View style={{ paddingHorizontal: Sizes.fixPadding * 2.0, paddingTop: Sizes.fixPadding + 5.0, backgroundColor: Colors.whiteColor }}>
                    <View style={styles.reminderSheetTitleWrapStyle}>
                        <Text style={{ ...Fonts.blackColor20SemiBold }}>
                            Set Reminder
                        </Text>
                        <MaterialIcons
                            name="close"
                            size={24}
                            color={Colors.blackColor}
                            onPress={() => setShowReminderSheet(false)}
                        />
                    </View>
                    <View style={styles.reminderInfoWrapStyle}>
                        <Text style={{ flex: 1, ...finalSelectedBusStop ? { ...Fonts.blackColor15Medium } : { ...Fonts.lightGrayColor15Medium } }}>
                            {finalSelectedBusStop ? finalSelectedBusStop : 'Select Bus Stop'}
                        </Text>
                        <MaterialIcons
                            name="arrow-drop-down"
                            size={26}
                            color={Colors.primaryColor}
                            onPress={() => setShowBusStopsSheet(true)}
                        />
                    </View>
                    <View style={{ marginVertical: Sizes.fixPadding * 2.0, ...styles.reminderInfoWrapStyle }}>
                        <Text style={{ flex: 1, ...finalReminderMinute ? { ...Fonts.blackColor15Medium } : { ...Fonts.lightGrayColor15Medium } }}>
                            {finalReminderMinute ? `${finalReminderMinute} Minute` : 'Select Time'}
                        </Text>
                        <MaterialIcons
                            name="arrow-drop-down"
                            size={26}
                            color={Colors.primaryColor}
                            onPress={() => setShowTimeSheet(true)}
                        />
                    </View>
                    <View style={styles.reminderInfoWrapStyle}>
                        <Text style={{ flex: 1, ...finalSelectedDays ? { ...Fonts.blackColor15Medium } : { ...Fonts.lightGrayColor15Medium } }}>
                            {finalSelectedDays ? finalSelectedDays : 'Select Days'}
                        </Text>
                        <MaterialIcons
                            name="arrow-drop-down"
                            size={26}
                            color={Colors.primaryColor}
                            onPress={() => setShowDaysSheet(true)}
                        />
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => { setShowSaveReminderDialog(true) }}
                        style={styles.buttonStyle}
                    >
                        <Text style={{ ...Fonts.whiteColor20SemiBold }}>
                            Save Reminder
                        </Text>
                    </TouchableOpacity>
                </View>
            </SimpleBottomSheet >
        )
    }

    function busRouteInfo() {
        return (
            <BottomSheet
                isOpen={false}
                sliderMinHeight={busRoutesList.length * 80 > height / 1.80 ? height / 1.80 : busRoutesList.length * 80}
                sliderMaxHeight={height - 100}
                lineContainerStyle={{ width: 0.0, height: 0.0, }}
                lineStyle={{ width: 0.0, height: 0.0, }}
                wrapperStyle={styles.bottomSheetWrapStyle}
            >
                <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor20SemiBold }}>
                    Bus Route
                </Text>
                <ScrollView showsVerticalScrollIndicator={false}>
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
                                        <TouchableOpacity
                                            activeOpacity={0.9}
                                            onPress={() => setShowReminderSheet(true)}
                                        >
                                            <Image
                                                source={require('../../assets/images/icons/reminder.png')}
                                                style={{ width: 20.0, height: 20.0, resizeMode: 'contain' }}
                                            />
                                        </TouchableOpacity>
                                }
                            </View>
                        ))
                    }
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => { setShowBookTicketSheet(true) }}
                        style={styles.buttonStyle}
                    >
                        <Text style={{ ...Fonts.whiteColor20SemiBold }}>
                            Book Ticket
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
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
                ref={mapRef}
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
                    {item.busName}
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
    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding + 3.0,
        marginVertical: Sizes.fixPadding * 2.0,
        elevation: 1.5,
        shadowColor: Colors.primaryColor
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
    reminderInfoWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(111, 111, 111,0.05)',
        padding: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding - 5.0,
    },
    dayWrapStyle: {
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center', justifyContent: 'center',
        paddingVertical: Sizes.fixPadding - 5.0,
        width: width / 4.97,
        marginBottom: Sizes.fixPadding,
        borderWidth: 1.0,
    },
    cancelAndDoneButtonStyle: {
        borderRadius: Sizes.fixPadding - 5.0,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        width: 100.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding - 8.0,
        marginHorizontal: Sizes.fixPadding,
    },
    minuteWrapStyle: {
        marginHorizontal: Sizes.fixPadding - 5.0,
        width: 40.0,
        height: 40.0,
        borderRadius: 20.0,
        shadowColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dialogStyle: {
        paddingVertical: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.whiteColor,
        width: width - 40,
        borderRadius: Sizes.fixPadding - 5.0
    },
    locationDividerStyle: {
        marginLeft: Sizes.fixPadding * 2.0,
        flex: 1,
        backgroundColor: 'rgba(111, 111, 111, 0.1)',
        height: 1.0
    },
    currentToDestinationDividerStyle: {
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
    reminderSheetTitleWrapStyle: {
        marginBottom: Sizes.fixPadding + 3.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})

export default BusRouteScreen;