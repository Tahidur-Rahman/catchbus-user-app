import { Text, StyleSheet, View, Image, ScrollView, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes, } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';

const paymentMethodsList = [
    {
        paymentMethod: 'Credit Card',
        paymentIcon: require('../../assets/images/paymentIcons/card.png'),
    },
    {
        paymentMethod: 'Google Pay',
        paymentIcon: require('../../assets/images/paymentIcons/google.png'),
    },
    {
        paymentMethod: 'PayPal',
        paymentIcon: require('../../assets/images/paymentIcons/paypal.png'),
    },
    {
        paymentMethod: 'Stripe',
        paymentIcon: require('../../assets/images/paymentIcons/stripe.png'),
    },
    {
        paymentMethod: 'Wallet',
        paymentIcon: require('../../assets/images/paymentIcons/wallet.png'),
    },
];

const PaymentMethodScreen = ({ navigation }) => {

    const [selectedPaymentIndex, setSelectedPaymentIndex] = useState(paymentMethodsList.length - 1);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {paymentMethods()}
                    {payButton()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function payButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('TicketBooked')}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.whiteColor20SemiBold }}>
                    Pay $4.50
                </Text>
            </TouchableOpacity>
        )
    }

    function paymentMethods() {
        return (
            <View style={{ marginTop: Sizes.fixPadding - 5.0, }}>
                {
                    paymentMethodsList.map((item, index) => (
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => setSelectedPaymentIndex(index)}
                            key={`${index}`}
                            style={styles.paymentMethodWrapStyle}
                        >
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <View style={styles.paymentIconWrapStyle}>
                                    <Image
                                        source={item.paymentIcon}
                                        style={{ width: 18.0, height: 18.0, resizeMode: 'contain' }}
                                    />
                                </View>
                                <Text style={{ flex: 1, ...Fonts.blackColor16Regular }}>
                                    {item.paymentMethod}
                                </Text>
                            </View>
                            <View style={{
                                borderColor: selectedPaymentIndex == index ? Colors.primaryColor : Colors.grayColor,
                                backgroundColor: selectedPaymentIndex == index ? Colors.primaryColor : 'white',
                                ...styles.radioButtonStyle,
                            }}>
                                {
                                    selectedPaymentIndex == index ?
                                        <MaterialIcons name="check" size={18} color={Colors.whiteColor} />
                                        :
                                        null
                                }
                            </View>
                        </TouchableOpacity>
                    ))
                }
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
                    Select Payment Method
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
    radioButtonStyle: {
        width: 21.0,
        height: 21.0,
        borderRadius: 10.5,
        borderWidth: 1.0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    paymentIconWrapStyle: {
        marginRight: Sizes.fixPadding + 2.0,
        width: 30.0,
        height: 30.0,
        borderRadius: Sizes.fixPadding - 5.0,
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    paymentMethodWrapStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding - 5.0,
        padding: Sizes.fixPadding + 3.0,
        backgroundColor: 'rgba(111, 111, 111, 0.05)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: Sizes.fixPadding * 2.0,
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
})

export default PaymentMethodScreen;