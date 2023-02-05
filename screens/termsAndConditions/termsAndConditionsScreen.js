import { Text, StyleSheet, ScrollView, View, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors, Fonts, Sizes, } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';

const termsOfUseList = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis orci porta suscipit quis a quam. Vitae ultricie gravida dolor diam sit lorem posuere.',
    'Fermentum iaculis eu mattis tellus nibh. Mi elit, morbi non turpis id. Pulvinar mi leo egestas amet purus ac nascetur ut ipsum. Nec nisl volutpat lectus tempusleo. Neque, leo orci egestas mattis eget placerat. Lorenunc, aenean eget arcu risus tristique leo, et ornare.',
    'Senectus diam suspendisse eget facilisis integer at suspendisse nulla. Nunc in platea vitae non porta lacu. Dui nisi sit enim, id tincidunt turpis accumsan, ornare.'
];

const companyPolicyList = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis orci porta suscipit quis a quam. Vitae ultricie gravida dolor diam sit lorem posuere.',
    'Fermentum iaculis eu mattis tellus nibh. Mi elit, morbi non turpis id. Pulvinar mi leo egestas amet purus ac nascetur ut ipsum. Nec nisl volutpat lectus tempusleo. Neque, leo orci egestas mattis eget placerat. Lorenunc, aenean eget arcu risus tristique leo, et ornare.',
    'Senectus diam suspendisse eget facilisis integer at suspendisse nulla. Nunc in platea vitae non porta lacu. Dui nisi sit enim, id tincidunt turpis accumsan, ornare.'
];

const TermsAndConditionsScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {termsOfUseInfo()}
                    {companyPolicyInfo()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function companyPolicyInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding + 2.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.blackColor18SemiBold }}>
                    Company Policy
                </Text>
                {
                    companyPolicyList.map((item, index) => (
                        <Text
                            key={`${index}`}
                            style={{ ...Fonts.grayColor15Regular }}
                        >
                            {item}
                        </Text>
                    ))
                }
            </View>
        )
    }

    function termsOfUseInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.blackColor18SemiBold }}>
                    Terms of Use
                </Text>
                {
                    termsOfUseList.map((item, index) => (
                        <Text
                            key={`${index}`}
                            style={{ ...Fonts.grayColor15Regular }}>
                            {item}
                        </Text>
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
                    Terms & Conditions
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
})

export default TermsAndConditionsScreen;