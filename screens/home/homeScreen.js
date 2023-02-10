import React, { useRef, useState, useCallback, useEffect } from "react";
import {
  BackHandler,
  StatusBar,
  Dimensions,
  Easing,
  Animated,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Platform,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { Dialog } from "@rneui/themed";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/features/rootSlice";
import { removeData } from "../../utils/AsyncStorageManager";
import { io } from "socket.io-client";
import { getCurrentLocation } from "../../utils/getCurrentLocation";

// const markers = [
//   {
//     coordinate: {
//       latitude: 22.6293867,
//       longitude: 88.4354486,
//     },
//     stationName: "Delano Greyhound Station",
//     stationImage: require("../../assets/images/busStations/station1.png"),
//     distance: "1 km",
//     time: "5min",
//   },
//   {
//     coordinate: {
//       latitude: 22.6345648,
//       longitude: 88.4377279,
//     },
//     stationName: "Hayward station",
//     stationImage: require("../../assets/images/busStations/station2.png"),
//     distance: "1.5 km",
//     time: "8min",
//   },
//   {
//     coordinate: {
//       latitude: 22.6281662,
//       longitude: 88.4410113,
//     },
//     stationName: "Lodi Transit Station",
//     stationImage: require("../../assets/images/busStations/station3.png"),
//     distance: "1 km",
//     time: "5min",
//   },
//   {
//     coordinate: {
//       latitude: 22.6341137,
//       longitude: 88.4497463,
//     },
//     stationName: "Salinas station",
//     stationImage: require("../../assets/images/busStations/station4.png"),
//     distance: "1.5 km",
//     time: "8min",
//   },
//   {
//     coordinate: {
//       latitude: 22.6292757,
//       longitude: 88.444781,
//     },
//     stationName: "Tulare Greyhound Station",
//     stationImage: require("../../assets/images/busStations/station5.png"),
//     distance: "1.5 km",
//     time: "8min",
//   },
// ];

const { width } = Dimensions.get("screen");

const HomeScreen = ({ navigation }) => {
  const { user } = useSelector((state) => state.rootSlice);
  const dispatch = useDispatch();
  const backAction = () => {
    backClickCount == 1 ? BackHandler.exitApp() : _spring();
    return true;
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, [backAction])
  );

  function _spring() {
    setBackClickCount(1);
    setTimeout(() => {
      setBackClickCount(0);
    }, 1000);
  }

  const [showMenu, setShowMenu] = useState(false);

  const [logoutDialog, setLogoutDialog] = useState(false);

  const offsetValue = useRef(new Animated.Value(0)).current;

  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;

  const [backClickCount, setBackClickCount] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
      {profileInfoWthOptions()}
      {drawerShadow()}
      {nearByBusStops()}
      {logoutInfo()}
      {backClickCount == 1 ? (
        <View style={[styles.animatedView]}>
          <Text style={{ ...Fonts.whiteColor14Regular }}>
            Press Back Once Again to Exit
          </Text>
        </View>
      ) : null}
    </SafeAreaView>
  );

  function logoutInfo() {
    return (
      <Dialog
        visible={logoutDialog}
        onRequestClose={() => {
          setLogoutDialog(false);
        }}
        overlayStyle={styles.dialogStyle}
      >
        <Text
          style={{
            margin: Sizes.fixPadding * 2.5,
            textAlign: "center",
            ...Fonts.blackColor18SemiBold,
          }}
        >
          Are you sure you want logout?
        </Text>
        <View
          style={{ backgroundColor: "rgba(111,111,111,0.3)", height: 1.0 }}
        />
        <View style={{ flexDirection: "row" }}>
          <Text
            onPress={() => setLogoutDialog(false)}
            style={styles.cancelAndLogoutTextStyle}
          >
            Cancel
          </Text>
          <View
            style={{
              marginBottom: Sizes.fixPadding - 15.0,
              backgroundColor: "rgba(111,111,111,0.3)",
              width: 1.0,
              height: 50.0,
            }}
          />
          <Text
            onPress={() => {
              setLogoutDialog(false);
              navigation.push("Login");
              dispatch(setUser(null));
              removeData("token");
            }}
            style={styles.cancelAndLogoutTextStyle}
          >
            Yes, Logout
          </Text>
        </View>
      </Dialog>
    );
  }

  function nearByBusStops() {
    return (
      <Animated.View
        style={{
          ...styles.overlayViewStyle,
          borderRadius: showMenu ? Sizes.fixPadding + 5.0 : 0,
          transform: [{ scale: scaleValue }, { translateX: offsetValue }],
        }}
      >
        <Animated.View
          style={{
            marginTop: Sizes.fixPadding * 2.0,
            transform: [
              {
                translateY: closeButtonOffset,
              },
            ],
          }}
        >
          {header()}
          {addDestinationInfo()}
        </Animated.View>
        <View
          style={{
            flex: 1,
            marginTop: !showMenu ? Sizes.fixPadding * 2.0 : -Sizes.fixPadding,
          }}
        >
          <NearByBusStop showMenu={showMenu} navigation={navigation} />
        </View>
      </Animated.View>
    );
  }

  function drawerShadow() {
    return showMenu ? (
      <Animated.View
        style={{
          ...styles.overlayShadowStyle,
          borderRadius: showMenu ? Sizes.fixPadding + 5.0 : 0,
          transform: [{ scale: scaleValue }, { translateX: offsetValue }],
        }}
      ></Animated.View>
    ) : null;
  }

  function profileInfoWthOptions() {
    return (
      <View style={{ paddingVertical: Sizes.fixPadding * 2.0 }}>
        {profileInfo()}
        <View
          style={{
            maxWidth: width / 1.6,
            marginTop: Sizes.fixPadding * 3.0,
            flex: 1,
          }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                Animated.timing(scaleValue, {
                  toValue: showMenu ? 1 : 0.85,
                  duration: 300,
                  useNativeDriver: true,
                }).start();

                Animated.timing(offsetValue, {
                  toValue: showMenu ? 0 : 230,
                  duration: 300,
                  useNativeDriver: true,
                  easing: Easing.linear,
                }).start();

                Animated.timing(closeButtonOffset, {
                  toValue: !showMenu ? -30 : 0,
                  duration: 300,
                  useNativeDriver: true,
                }).start();

                setShowMenu(!showMenu);
              }}
            >
              {profileOptionSort({
                option: "Nearby Bus Stops",
                icon: require("../../assets/images/icons/nearby.png"),
              })}
            </TouchableOpacity>

            {/* <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => { navigation.push('Wallet') }}
                        >
                            {profileOptionSort({ option: 'Wallet', icon: require('../../assets/images/icons/wallet.png') })}
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => { navigation.push('Tickets') }}
                        >
                            {profileOptionSort({ option: 'My Tickets', icon: require('../../assets/images/icons/ticket.png') })}
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => { navigation.push('DailyReminder') }}
                        >
                            {profileOptionSort({ option: 'Daily Reminder', icon: require('../../assets/images/icons/reminder.png') })}
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => { navigation.push('Rewards') }}
                        >
                            {profileOptionSort({ option: 'My Rewards', icon: require('../../assets/images/icons/rewards.png') })}
                        </TouchableOpacity> */}

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                navigation.push("ContactUs");
              }}
            >
              {profileOptionSort({
                option: "Contact Us",
                icon: require("../../assets/images/icons/contact.png"),
              })}
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                navigation.push("TermsAndConditions");
              }}
            >
              {profileOptionSort({
                option: "Terms & Conditions",
                icon: require("../../assets/images/icons/termsAndCondition.png"),
              })}
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setLogoutDialog(true)}
            >
              {profileOptionSort({
                option: "Logout",
                icon: require("../../assets/images/icons/logout.png"),
              })}
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    );
  }

  function profileOptionSort({ option, icon }) {
    return (
      <View style={styles.profileOptionWrapStyle}>
        <View style={styles.profileOptionIconWrapStyle}>
          <Image
            source={icon}
            style={{ width: 20.0, height: 20.0, resizeMode: "contain" }}
          />
        </View>
        <Text
          style={{
            flex: 1,
            marginLeft: Sizes.fixPadding,
            marginRight: Sizes.fixPadding * 2.0,
            ...Fonts.whiteColor16Medium,
          }}
        >
          {option}
        </Text>
      </View>
    );
  }

  function profileInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={styles.profileImageWrapStyle}>
          <Image
            source={{ uri: user?.image && user.image }}
            style={{ width: 50.0, height: 50.0, borderRadius: 25.0 }}
          />
        </View>
        <View style={{ marginHorizontal: Sizes.fixPadding }}>
          <Text
            numberOfLines={1}
            style={{
              maxWidth: width - 95.0,
              lineHeight: 18.0,
              ...Fonts.whiteColor18SemiBold,
            }}
          >
            {user?.name ?? "Username"}
          </Text>
          <Text
            onPress={() => navigation.push("EditProfile")}
            style={{ ...Fonts.whiteColor16Regular }}
          >
            View Profile
          </Text>
        </View>
      </View>
    );
  }

  function addDestinationInfo() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.addDestinationInfoWrapStyle}
        onPress={() => navigation.push("AddDestination")}
      >
        <Image
          source={require("../../assets/images/icons/location.png")}
          style={{ width: 24.0, height: 24.0, resizeMode: "contain" }}
        />
        <Text
          style={{
            marginLeft: Sizes.fixPadding,
            flex: 1,
            ...Fonts.grayColor16Regular,
          }}
        >
          Tap to add destination
        </Text>
      </TouchableOpacity>
    );
  }

  function header() {
    return (
      <View
        style={{
          marginTop: showMenu ? Sizes.fixPadding * 3.0 : 0.0,
          ...styles.headerWrapStyle,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            Animated.timing(scaleValue, {
              toValue: showMenu ? 1 : 0.85,
              duration: 300,
              useNativeDriver: true,
            }).start();

            Animated.timing(offsetValue, {
              toValue: showMenu ? 0 : 230,
              duration: 300,
              useNativeDriver: true,
            }).start();

            Animated.timing(closeButtonOffset, {
              toValue: !showMenu ? -30 : 0,
              duration: 300,
              useNativeDriver: true,
            }).start();

            setShowMenu(!showMenu);
          }}
          style={styles.menuButtonWrapStyle}
        >
          <MaterialIcons name="menu" size={22} color={Colors.blackColor} />
        </TouchableOpacity>
        <Text
          style={{ flex: 1, textAlign: "center", ...Fonts.blackColor20Bold }}
        >
          Nearby Bus Stops
        </Text>
      </View>
    );
  }
};

const cardWidth = width / 1.5;

const NearByBusStop = ({ showMenu, navigation }) => {
  const socketRef = useRef();
  const [location, setLocation] = useState({});
  const userInfo = useSelector((state) => state.rootSlice?.user);
  const [markerList, setMarkerList] = useState([]);

  // connect socket client
  useEffect(() => {
    const baseUrl = `http://${Platform.OS === "ios" ? "localhost" : "10.0.2.2"}:3000`;
    // const baseUrl = "https://catchbus-backend.up.railway.app";
    socketRef.current = io(baseUrl);
    handleCurrentLocation();
  }, []);

  useEffect(() => {
    if (location?.latitude && userInfo?.type === "driver") {
      const driverData = {
        coordinate: {
          latitude: location?.latitude,
          longitude: location?.longitude,
        },
        stationName: "test",
        stationImage: require("../../assets/images/busStations/station1.png"),
        distance: "1 km",
        time: "5min",
        id: userInfo?._id,
        name: userInfo?.name,
        email: userInfo?.email,
        phone: userInfo?.phone_number,
      };
      socketRef?.current.emit("addDriver", driverData);
      socketRef?.current.on("getDrivers", (driversInfo) => {
        console.log("socket drivers...", driversInfo);
        setMarkerList(driversInfo);
      });
    }
  }, [location]);

  const handleCurrentLocation = async () => {
    const currLocation = await getCurrentLocation();
    currLocation && setLocation(currLocation);
  };

  // fetch current location every 5 second
  useEffect(() => {
    const interval = setInterval(() => {
      handleCurrentLocation();
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  
  const region = {
    latitude: location?.latitude,
    longitude: location?.longitude,
    latitudeDelta: 0.035,
    longitudeDelta: 0.035,
  };

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
            },
            350
          );
        }
      }, 10);
    });
  });

  const interpolation = markerList?.map((marker, index) => {
    const inputRange = [
      (index - 1) * cardWidth,
      index * cardWidth,
      (index + 1) * cardWidth,
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp",
    });

    return { scale };
  });

  const _map = React.useRef(null);

  return (
    <View
      style={{
        flex: 1,
        borderBottomLeftRadius: showMenu ? Sizes.fixPadding + 5.0 : 0.0,
        overflow: "hidden",
      }}
    >
      {markerList && (
        <MapView
          ref={_map}
          region={region}
          style={{
            height: "100%",
            borderBottomLeftRadius: showMenu ? Sizes.fixPadding + 5.0 : 0.0,
          }}
          provider={PROVIDER_GOOGLE}
          mapType="terrain"
        >
          {markerList?.map((marker, index) => {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolation[index].scale,
                },
              ],
            };
            return (
              <Marker key={index} coordinate={marker.coordinate}>
                <Animated.View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    width: 40.0,
                    height: 40.0,
                  }}
                >
                  <Animated.Image
                    source={require("../../assets/images/marker.png")}
                    resizeMode="contain"
                    style={[styles.markerStyle, scaleStyle]}
                  ></Animated.Image>
                </Animated.View>
              </Marker>
            );
          })}
        </MapView>
      )}
      <Animated.ScrollView
        horizontal={true}
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        style={styles.busStationInfoWrapStyle}
        snapToInterval={cardWidth + 40}
        snapToAlignment="center"
        contentContainerStyle={{
          paddingLeft: Sizes.fixPadding,
          paddingRight: Sizes.fixPadding * 2.0,
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
      >
        {markerList?.map((marker, index) => (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.push("BusStopDetail", { marker })}
            key={index}
            style={styles.busStationInfoInnerStyle}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={marker.stationImage}
                style={{
                  width: 60.0,
                  height: 60.0,
                  borderRadius: Sizes.fixPadding - 5.0,
                }}
              />
              <View style={{ marginLeft: Sizes.fixPadding + 5.0, flex: 1 }}>
                <Text numberOfLines={1} style={{ ...Fonts.blackColor18Medium }}>
                  {marker.stationName}
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <FontAwesome5
                    name="walking"
                    size={16}
                    color={Colors.primaryColor}
                  />
                  <Text
                    numberOfLines={1}
                    style={{
                      flex: 1,
                      marginLeft: Sizes.fixPadding - 5.0,
                      ...Fonts.grayColor16Regular,
                    }}
                  >
                    {marker.distance} ({marker.time})
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  menuButtonWrapStyle: {
    width: 36.0,
    height: 36.0,
    borderRadius: 18.0,
    backgroundColor: "rgba(111, 111, 111, 0.05)",
    alignItems: "center",
    justifyContent: "center",
  },
  addDestinationInfoWrapStyle: {
    marginTop: Sizes.fixPadding * 2.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(111, 111, 111, 0.05)",
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 5.0,
    borderRadius: Sizes.fixPadding - 5.0,
  },
  markerStyle: {
    width: 27.0,
    height: 27.0,
    tintColor: Colors.primaryColor,
  },
  busStationInfoInnerStyle: {
    backgroundColor: Colors.whiteColor,
    elevation: 0.5,
    marginHorizontal: Sizes.fixPadding,
    padding: Sizes.fixPadding + 5.0,
    borderRadius: Sizes.fixPadding - 5.0,
    width: width / 1.4,
    marginBottom: Sizes.fixPadding,
  },
  busStationInfoWrapStyle: {
    position: "absolute",
    bottom: 10.0,
    left: 0.0,
    right: 0.0,
    paddingVertical: 10.0,
  },
  overlayViewStyle: {
    flexGrow: 1,
    backgroundColor: Colors.whiteColor,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0.0,
    right: 0,
    paddingTop: Sizes.fixPadding * 2.0,
  },
  overlayShadowStyle: {
    flexGrow: 1,
    backgroundColor: "rgba(255,255,255,0.5)",
    position: "absolute",
    top: 20,
    bottom: 20,
    left: -20.0,
    right: 0,
    paddingTop: Sizes.fixPadding * 2.0,
  },
  dialogStyle: {
    paddingVertical: 0.0,
    paddingHorizontal: 0.0,
    backgroundColor: Colors.whiteColor,
    width: width - 40,
    borderRadius: Sizes.fixPadding - 5.0,
  },
  cancelAndLogoutTextStyle: {
    textAlign: "center",
    alignSelf: "center",
    flex: 1,
    ...Fonts.primaryColor17SemiBold,
  },
  animatedView: {
    backgroundColor: "#333333",
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    borderRadius: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    paddingVertical: Sizes.fixPadding,
    justifyContent: "center",
    alignItems: "center",
  },
  profileOptionWrapStyle: {
    marginBottom: Sizes.fixPadding * 2.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    flexDirection: "row",
    alignItems: "center",
  },
  profileOptionIconWrapStyle: {
    width: 42.0,
    height: 42.0,
    borderRadius: 21.0,
    backgroundColor: Colors.whiteColor,
    alignItems: "center",
    justifyContent: "center",
  },
  profileImageWrapStyle: {
    width: 60.0,
    height: 60.0,
    borderRadius: 30.0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  headerWrapStyle: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default HomeScreen;
