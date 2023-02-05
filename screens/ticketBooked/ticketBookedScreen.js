import { Text, StyleSheet, ScrollView, Image, View, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors, Fonts, Sizes, } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import DashedLine from 'react-native-dashed-line';

const TicketBookedScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {successTitle()}
                    {ticketInfo()}
                    {showBusStatusButton()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function showBusStatusButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => { navigation.push('TrackBus') }}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.whiteColor20SemiBold }}>
                    Show Bus Live Status
                </Text>
            </TouchableOpacity>
        )
    }

    function ticketInfo() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding * 3.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <View style={styles.ticketInfoWrapStyle}>
                    <Text style={{ ...Fonts.blackColor18SemiBold }}>
                        Ticket
                    </Text>
                    <View style={{ marginVertical: Sizes.fixPadding + 3.0, }}>
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
                    <View style={{ marginVertical: Sizes.fixPadding, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ marginRight: Sizes.fixPadding * 3.0, }}>
                            <Text style={{ ...Fonts.grayColor15Regular }}>
                                Ticket no.
                            </Text>
                            <Text style={{ lineHeight: 24.0, ...Fonts.blackColor15Medium }}>
                                265-AD
                            </Text>
                        </View>
                        <View>
                            <Text style={{ ...Fonts.grayColor15Regular }}>
                                Bus no.
                            </Text>
                            <Text style={{ lineHeight: 24.0, ...Fonts.blackColor15Medium }}>
                                2589
                            </Text>
                        </View>
                    </View>
                    <View style={{ marginVertical: Sizes.fixPadding, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ marginRight: Sizes.fixPadding + 5.0, }}>
                            <Text style={{ ...Fonts.grayColor15Regular }}>
                                Total Cost
                            </Text>
                            <Text style={{ lineHeight: 24.0, ...Fonts.blackColor15Medium }}>
                                $4.50
                            </Text>
                        </View>
                        <Image
                            source={require('../../assets/images/paied.png')}
                            style={{ width: 60.0, height: 60.0, resizeMode: 'contain' }}
                        />
                    </View>
                    <View>
                        <DashedLine
                            dashLength={8}
                            dashColor={'rgba(111, 111, 111, 0.3)'}
                            dashGap={4}
                            style={{ marginVertical: Sizes.fixPadding * 2.0, marginHorizontal: Sizes.fixPadding + 2.0 }}
                        />
                        <View
                            style={{
                                ...styles.ticketCutterStyle,
                                left: -45.0, borderLeftWidth: 0.0, borderRightWidth: 4.0,
                            }}
                        >
                        </View>
                        <View
                            style={{
                                ...styles.ticketCutterStyle,
                                right: -45.0, borderLeftWidth: 4.0, borderRightWidth: 0.0,
                            }}
                        />
                    </View>
                    <Text style={{ textAlign: 'center', ...Fonts.grayColor14Regular }}>
                        Scan Bar Code at the ticket conductor after boarding a bus
                    </Text>
                    <Image
                        source={require('../../assets/images/barcode.png')}
                        style={{ marginVertical: Sizes.fixPadding * 2.0, height: 58.0, width: '85%', resizeMode: 'contain', alignSelf: 'center' }}
                    />
                    <Text style={{ textAlign: 'center', ...Fonts.blackColor15Medium }}>
                        1485 0258 1487 5963
                    </Text>
                </View>
            </View>
        )
    }

    function successTitle() {
        return (
            <View style={{ alignItems: 'center' }}>
                <Image
                    source={require('../../assets/images/icons/success.png')}
                    style={{ width: 60.0, height: 60.0, resizeMode: 'contain' }}
                />
                <Text style={{ textAlign: 'center', marginVertical: Sizes.fixPadding + 5.0, ...Fonts.blackColor20SemiBold }}>
                    Payment Successful
                </Text>
            </View>
        )
    }

    function header() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.pop()}
                style={styles.backIconWrapStyle}
            >
                <MaterialIcons name="keyboard-arrow-left" size={24} color={Colors.blackColor} />
            </TouchableOpacity>
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
        justifyContent: 'center',
        margin: Sizes.fixPadding * 2.0,
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
    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding + 3.0,
        margin: Sizes.fixPadding * 2.0,
        elevation: 1.5,
        shadowColor: Colors.primaryColor
    },
    ticketCutterStyle: {
        width: 50.0,
        height: 50.0,
        borderRadius: 25.0,
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.primaryColor,
        position: 'absolute',
    },
    ticketInfoWrapStyle: {
        padding: Sizes.fixPadding + 5.0,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding,
    }
})

export default TicketBookedScreen;