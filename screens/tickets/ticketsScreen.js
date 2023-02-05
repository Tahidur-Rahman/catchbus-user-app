import { Text, StyleSheet, ScrollView, Dimensions, FlatList, View, Image, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes, } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { BottomSheet } from "@rneui/themed";

const { width } = Dimensions.get('window');

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

const ticketsList = [
    {
        id: '1',
        busName: 'City Circular Exp 2589',
        pickupLocation: '7 W. Gray St. Utica, Pennsylvania 57867',
        dropLocation: '1901 Thornridge Cir. Shiloh, Hawaii 81063',
    },
    {
        id: '2',
        busName: 'Railway Square 1710',
        pickupLocation: '225 Belleville St, Victoria, BC V8V 1X1',
        dropLocation: 'Richmond Street, Charlottetown, PE C1A',
    },
    {
        id: '3',
        busName: 'The Jester 1589',
        pickupLocation: '9 Bailey Drive, Fredericton, NB E3B 5A3',
        dropLocation: 'Pictou Island Road, Pictou Island, NS',
    },
    {
        id: '4',
        busName: 'City Circular Exp 2589',
        pickupLocation: 'McKercher Drive, Saskatoon, SK',
        dropLocation: '1901 Thornridge Cir. Shiloh, Hawaii 81063',
    },
];

const TicketsScreen = ({ navigation }) => {

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

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                {tickets()}
            </View>
            {reminderInfo()}
            {selectBusStopSheet()}
            {selectTimeSheet()}
            {selectDaysSheet()}
        </SafeAreaView>
    )

    function selectBusStopSheet() {
        return (
            <BottomSheet
                isVisible={showBusStopsSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
                onBackdropPress={() => setShowBusStopsSheet(false)}
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
            </BottomSheet >
        )
    }

    function selectTimeSheet() {
        return (
            <BottomSheet
                isVisible={showTimeSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
                onBackdropPress={() => { setShowTimeSheet(false) }}
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
            </BottomSheet>
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
            <BottomSheet
                isVisible={showDaysSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
                onBackdropPress={() => { setShowDaysSheet(false) }}
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
            </BottomSheet>
        )
    }

    function reminderInfo() {
        return (
            <BottomSheet
                isVisible={showReminderSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
                onBackdropPress={() => { setShowReminderSheet(false) }}
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
                        onPress={() => { setShowReminderSheet(false) }}
                        style={styles.buttonStyle}
                    >
                        <Text style={{ ...Fonts.whiteColor20SemiBold }}>
                            Save Reminder
                        </Text>
                    </TouchableOpacity>
                </View>
            </BottomSheet>
        )
    }

    function tickets() {

        const renderItem = ({ item }) => (
            <View style={styles.ticketInfoWrapStyle}>
                <View style={styles.busInfoWrapStyle}>
                    <Text style={{ marginRight: Sizes.fixPadding - 5.0, flex: 1, ...Fonts.blackColor17Medium }}>
                        {item.busName}
                    </Text>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => setShowReminderSheet(true)}
                    >
                        <Image
                            source={require('../../assets/images/icons/reminder.png')}
                            style={{ width: 20.0, height: 20.0, resizeMode: 'contain' }}
                        />
                    </TouchableOpacity>
                </View>
                {divider()}
                <View style={{ marginVertical: Sizes.fixPadding * 2.0, marginHorizontal: Sizes.fixPadding + 5.0, }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            source={require('../../assets/images/icons/locationFixed.png')}
                            style={{ width: 22.0, height: 22.0, resizeMode: 'contain' }}
                        />
                        <Text numberOfLines={1} style={{ flex: 1, marginLeft: Sizes.fixPadding * 2.0, ...Fonts.blackColor15Regular }}>
                            {item.pickupLocation}
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
                            {item.dropLocation}
                        </Text>
                    </View>
                </View>
                {divider()}
                <View style={{ marginVertical: Sizes.fixPadding + 5.0, marginHorizontal: Sizes.fixPadding + 5.0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text
                        onPress={() => navigation.push('TrackBus')}
                        style={{ ...Fonts.primaryColor17SemiBold }}
                    >
                        Live Status
                    </Text>
                    <Text
                        onPress={() => navigation.push('TicketBooked')}
                        style={{ ...Fonts.primaryColor17SemiBold }}
                    >
                        Show Ticket
                    </Text>
                </View>
            </View>
        )
        return (
            <FlatList
                data={ticketsList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: Sizes.fixPadding - 5.0, }}
            />
        )
    }

    function divider() {
        return (
            <View style={{ backgroundColor: 'rgba(111, 111, 111, 0.2)', height: 1.0, }} />
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
                    My Tickets
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
    ticketInfoWrapStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderColor: 'rgba(111, 111, 111, 0.3)',
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding - 5.0,
        marginBottom: Sizes.fixPadding * 2.0,
    },
    reminderInfoWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(111, 111, 111,0.05)',
        padding: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding - 5.0,
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
    dayWrapStyle: {
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center', justifyContent: 'center',
        paddingVertical: Sizes.fixPadding - 5.0,
        width: width / 4.97,
        marginBottom: Sizes.fixPadding,
        borderWidth: 1.0,
    },
    reminderSheetTitleWrapStyle: {
        marginBottom: Sizes.fixPadding + 3.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    busInfoWrapStyle: {
        margin: Sizes.fixPadding + 5.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})

export default TicketsScreen;