import { Text, StyleSheet, View, Image, FlatList, SafeAreaView, StatusBar, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { Colors, Fonts, Sizes, } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';

const { height, width } = Dimensions.get('window');

const rewardsList = [
    {
        id: '1',
        isCash: true,
        cashAmount: '$2.00',
    },
    {
        id: '2',
        isCash: false,
        rewardTitle: 'Scratch $ Win',
    },
    {
        id: '3',
        isCash: true,
        cashAmount: '$1.00',
    },
    {
        id: '4',
        isCash: true,
        cashAmount: '$1.50',
    },
];

const RewardsScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <FlatList
                    ListHeaderComponent={
                        <>
                            {rewardsImage()}
                            {rewardsInfo()}
                            {rewards()}
                        </>
                    }
                    contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    )

    function rewards() {
        const renderItem = ({ item }) => (
            <View
                style={{
                    ...styles.rewardsWrapStyle,
                    borderColor: item.isCash ? 'rgba(111,111,111,0.3)' : Colors.primaryColor,
                    backgroundColor: item.isCash ? Colors.whiteColor : Colors.primaryColor,
                }}
            >
                {
                    item.isCash ?
                        <Image
                            source={require('../../assets/images/rewardsBg.png')}
                            style={{ height: height / 7.0, width: '100%', position: 'absolute', left: 0.0, right: 0.0, top: 0.0 }}
                        />
                        :
                        null
                }
                <Text
                    numberOfLines={2}
                    style={{
                        ...styles.rewardsTextStyle,
                        ...item.isCash ? { ...Fonts.blackColor15Medium } : { ...Fonts.whiteColor15Medium }
                    }}
                >
                    {
                        item.isCash ?
                            `You’ve won ${item.cashAmount}`
                            :
                            item.rewardTitle
                    }
                </Text>
                <View
                    style={{
                        ...styles.trophyWrapStyle,
                        backgroundColor: item.isCash ? Colors.primaryColor : Colors.whiteColor,
                    }}
                >
                    <Image
                        source={require('../../assets/images/icons/trophy.png')}
                        style={{ width: 26.0, height: 26.0, resizeMode: 'contain' }} />
                </View>
            </View>
        )
        return (
            <FlatList
                data={rewardsList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                numColumns={2}
                contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding, }}
                scrollEnabled={false}
            />
        )
    }

    function rewardsInfo() {
        return (
            <View style={styles.rewardsInfoWrapStyle}>
                <View style={{ ...styles.cashAndVouchersInfoWrapStyle, marginRight: Sizes.fixPadding }}>
                    <Text style={{ lineHeight: 25.0, ...Fonts.primaryColor20SemiBold }}>
                        $5.50
                    </Text>
                    <Text style={{ textAlign: 'center', ...Fonts.primaryColor15Regular }}>
                        Cashback Won
                    </Text>
                </View>
                <View style={{ ...styles.cashAndVouchersInfoWrapStyle, marginLeft: Sizes.fixPadding }}>
                    <Text style={{ lineHeight: 25.0, ...Fonts.primaryColor20SemiBold }}>
                        5
                    </Text>
                    <Text style={{ textAlign: 'center', ...Fonts.primaryColor15Regular }}>
                        Vouchers & Deals
                    </Text>
                </View>
            </View>
        )
    }

    function rewardsImage() {
        return (
            <Image
                source={require('../../assets/images/reward.png')}
                style={styles.rewardsImageStyle}
            />
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
                    My Rewards
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
        justifyContent: 'center',
        position: 'absolute',
        zIndex: 1,
    },
    rewardsImageStyle: {
        width: 180.0,
        height: 180.0,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    cashAndVouchersInfoWrapStyle: {
        flex: 1,
        backgroundColor: 'rgba(139, 154, 70, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding,
    },
    trophyWrapStyle: {
        elevation: 1.5,
        width: width / 6.9,
        height: width / 6.9,
        borderRadius: (width / 6.9) / 2.0,
        shadowColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    rewardsTextStyle: {
        alignSelf: 'center',
        bottom: 12.0,
        position: 'absolute',
        textAlign: 'center',
    },
    rewardsWrapStyle: {
        borderRadius: Sizes.fixPadding,
        justifyContent: 'center',
        borderWidth: 1.0,
        height: height / 4.5,
        flex: 1,
        marginHorizontal: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding * 2.0,
    },
    rewardsInfoWrapStyle: {
        marginHorizontal: Sizes.fixPadding,
        marginVertical: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default RewardsScreen;