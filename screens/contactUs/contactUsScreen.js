import { Text, StyleSheet, View, ScrollView, Image, TextInput, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes, } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';

const ContactUsScreen = ({ navigation }) => {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <View style={{ flex: 1, }}>
                    {header()}
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {fullNameInfo()}
                        {emailInfo()}
                        {messageInfo()}
                        {submitButton()}
                    </ScrollView>
                </View>
                {serviceInfo()}
            </View >
        </SafeAreaView >
    )

    function serviceInfo() {
        return (
            <View style={{ alignItems: 'center' }}>
                <Image
                    source={require('../../assets/images/icons/support.png')}
                    style={{ width: 40.0, height: 30.0, resizeMode: 'contain' }}
                />
                <Text style={{ marginVertical: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 3.0, textAlign: 'center' }}>
                    < Text style={{ ...Fonts.grayColor15Regular }}>
                        You can
                    </Text>
                    <Text style={{ ...Fonts.primaryColor15Medium }}>
                        { } Get in touch { }
                    </Text>
                    <Text style={{ ...Fonts.grayColor15Regular }}>
                        our 24/7 customer service any time.
                    </Text>
                </Text>
            </View>
        )
    }

    function submitButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.pop()}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.whiteColor20SemiBold }}>
                    Submit
                </Text>
            </TouchableOpacity>
        )
    }

    function messageInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.blackColor15Medium }}>
                    Message
                </Text>
                <TextInput
                    value={message}
                    onChangeText={(value) => setMessage(value)}
                    selectionColor={Colors.primaryColor}
                    style={styles.textFieldStyle}
                    placeholder='Your message'
                    numberOfLines={6}
                    multiline
                />
            </View>
        )
    }

    function emailInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.blackColor15Medium }}>
                    Email
                </Text>
                <TextInput
                    value={email}
                    onChangeText={(value) => setEmail(value)}
                    selectionColor={Colors.primaryColor}
                    style={styles.textFieldStyle}
                    placeholder='Your email'
                />
            </View>
        )
    }

    function fullNameInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.blackColor15Medium }}>
                    Full Name
                </Text>
                <TextInput
                    value={fullName}
                    onChangeText={(value) => setFullName(value)}
                    selectionColor={Colors.primaryColor}
                    style={styles.textFieldStyle}
                    placeholder='Your full name'
                />
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
                    Contact Us
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
    textFieldStyle: {
        backgroundColor: 'rgba(111, 111, 111, 0.05)',
        borderRadius: Sizes.fixPadding - 5.0,
        ...Fonts.blackColor15Regular,
        padding: Sizes.fixPadding + 2.0,
    },
    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding + 3.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding * 3.0,
        elevation: 1.5,
        shadowColor: Colors.primaryColor
    },
})

export default ContactUsScreen;