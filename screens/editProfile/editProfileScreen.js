import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Pressable,
  Alert,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { BottomSheet } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateProfileMutation } from "../../redux/features/api/authApi";
import { getData } from "../../utils/AsyncStorageManager";
import Loading from "../../components/Loading";
import { setUser } from "../../redux/features/rootSlice";
import { Menu, MenuItem } from 'react-native-material-menu';
import bus_zones from "../../constants/bus_zones";

const { width, height } = Dimensions.get('window');
const EditProfileScreen = ({ navigation }) => {
  const user = useSelector((state) => state.rootSlice.user);
  console.log(user)
  const [image, setImage] = useState(null);

  const [name, setFullName] = useState(user.name ?? "");
  const dispatch = useDispatch();
  const [email, setEmail] = useState(user.email ?? "");
  const [mobileNumber, setMobileNumber] = useState(user.phone_number ?? "");
  const [license, setLicense] = useState(user.license ?? "");
  const [busZone, setBusZone] = useState(user.bus_zone ? bus_zones[user.bus_zone] : "");
  const [vehicleNumber, setVehicleNumber] = useState(user.vehicle_number ?? "");
  const [showProfileOptionsSheet, setShowProfileOptionsSheet] = useState(false);
  const [showing,setShowing] = useState('');
  const [showBusZone, setShowBusZone] = useState(false);
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [setUpdateProfile, { isLoading, data, error }] =
    useUpdateProfileMutation();
  const OPTIONS = {
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  };
  const handleUpdateProfile = async () => {
    const token = await getData("token");
    if (name.length < 4)
      return Alert.alert("Name must be at least 4 characters.");

    const userData = {
      name,
      photo: image?.path ?? "",
      email,
    };
    if(user.type != "user"){
      userData.license = license;
      userData.bus_zone = busZone.zone;
      userData.vehicle_number = vehicleNumber;
    }
    setUpdateProfile({ token, ...userData });
  };
  useEffect(() => {
    if (data?.user) {
      dispatch(setUser(data.user));
      navigation.goBack();
    }
  }, [data]);
  const pickImage = async (type) => {
    // No permissions request is necessary for launching the image library
    let result;
    
    if( type == "camera"){
      requestPermission()
      if(status.granted){
        result = await ImagePicker.launchCameraAsync(OPTIONS)
      }
    }else{
      result = await ImagePicker.launchImageLibraryAsync(OPTIONS);
    }

    console.log(result);

    if (!result.canceled) {
      if(showing == 'dp'){
        setImage(result.uri);
      }else{
        setLicense(result.uri)
      }
    }
    setShowProfileOptionsSheet(false)
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        {header()}
        {isLoading && <Loading />}
        <ScrollView>
          {profilePic()}
          {nameInfo()}
          {emailInfo()}
          {mobileNumberInfo()}
          {user.type == 'driver' && busZoneInfo()}
          {user.type != 'user' &&<>
          {vehicleNumberInfo()}
          {licenceInfo()}
          </>}
          {saveButton()}
        </ScrollView>
        {profilePicOptionSheet()}
      </View>
    </SafeAreaView>
  );
  function licenceInfo() {
    return (
      <View
        style={{
          marginTop: Sizes.fixPadding + 5.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}
      >
        <Text
          style={{
            marginBottom: Sizes.fixPadding - 5.0,
            ...Fonts.grayColor14Regular,
          }}
        >
          License
        </Text>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            setShowing("license");
            setShowProfileOptionsSheet(true);
          }}
          style={styles.licenceInfoWrapStyle}
        >
          <Text style={{ ...Fonts.blackColor16Medium, flex: 1 }}>
           {license?license.split('/')[license.split('/').length-1]:''}
          </Text>
          <MaterialCommunityIcons
            name="shield-check"
            size={20}
            color="#087F23"
          />
        </TouchableOpacity>
      </View>
    );
  }
  function busZoneInfo() {
    return (
        <View style={{ marginTop: Sizes.fixPadding + 5.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
            <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Regular }}>
                Bus Zone
            </Text>
            <Menu
                visible={showBusZone}
                style={{ paddingTop: Sizes.fixPadding, width: width - 40.0, maxHeight: height - 100.0, }}
                anchor={
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => setShowBusZone(true)}
                        style={styles.licenceInfoWrapStyle}
                    >
                        <Text style={{ ...Fonts.blackColor16Medium, }}>
                            {busZone?.zone ?(busZone.origin.name+' -  ' + busZone.destination.name) :"Select"}
                        </Text>
                        <MaterialIcons
                            name="arrow-drop-down"
                            color={Colors.primaryColor}
                            size={24}
                        />
                    </TouchableOpacity>
                }
                onRequestClose={() => setShowBusZone(false)}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        bus_zones.map((item, index) => (
                            <MenuItem
                                key={index}
                                textStyle={{ marginTop: Sizes.fixPadding - 20.0, ...Fonts.blackColor16Medium}}
                                onPress={() => {
                                    setBusZone(item)
                                    setShowBusZone(false)
                                }}
                            >
                                {item.origin.name+' -  ' + item.destination.name}
                            </MenuItem>
                        ))
                    }
                </ScrollView>
            </Menu>
        </View>
    )
}
  function profilePicOptionSheet() {
    return (
      <BottomSheet
        isVisible={showProfileOptionsSheet}
        containerStyle={{ backgroundColor: "rgba(0.5, 0.50, 0, 0.50)" }}
        onBackdropPress={() => {
          setShowProfileOptionsSheet(false);
        }}
      >
        <View
          style={{
            paddingVertical: Sizes.fixPadding + 5.0,
            backgroundColor: Colors.whiteColor,
          }}
        >
          <Text
            onPress={() => setShowProfileOptionsSheet(false)}
            style={{ textAlign: "center", ...Fonts.blackColor20Bold }}
          >
            Change Profile Photo
          </Text>
          {divider()}

          <Pressable onPress={() => setImage("")}>
            <Text style={{ textAlign: "center", ...Fonts.redColor16Regular }}>
              Remove Current Photo
            </Text>
          </Pressable>
          {divider()}
          <Pressable onPress={() => pickImage("camera",)}>
            <Text style={{ textAlign: "center", ...Fonts.blackColor16Regular }}>
              Take Photo
            </Text>
          </Pressable>
          {divider()}
          <Pressable onPress={() => pickImage("gallery",)}>
            <Text style={{ textAlign: "center", ...Fonts.blackColor16Regular }}>
              Choose From Library
            </Text>
          </Pressable>
        </View>
      </BottomSheet>
    );
  }

  function divider() {
    return (
      <View
        style={{
          backgroundColor: "rgba(111, 111, 111, 0.2)",
          height: 1.0,
          marginVertical: Sizes.fixPadding + 5.0,
        }}
      />
    );
  }

  function saveButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={handleUpdateProfile}
        style={styles.buttonStyle}
      >
        <Text style={{ ...Fonts.whiteColor20SemiBold }}>Save</Text>
      </TouchableOpacity>
    );
  }

  function mobileNumberInfo() {
    return (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
        <Text
          style={{
            marginBottom: Sizes.fixPadding - 5.0,
            ...Fonts.grayColor14Regular,
          }}
        >
          Mobile Number
        </Text>
        <TextInput
          value={mobileNumber}
          onChangeText={(value) => setMobileNumber(value)}
          selectionColor={Colors.primaryColor}
          style={styles.textFieldStyle}
          keyboardType="phone-pad"
        />
      </View>
    );
  }

  function emailInfo() {
    return (
      <View
        style={{
          marginVertical: Sizes.fixPadding + 5.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}
      >
        <Text
          style={{
            marginBottom: Sizes.fixPadding - 5.0,
            ...Fonts.grayColor14Regular,
          }}
        >
          Email
        </Text>
        <TextInput
          value={email}
          onChangeText={(value) => setEmail(value)}
          selectionColor={Colors.primaryColor}
          style={styles.textFieldStyle}
          keyboardType="email-address"
        />
      </View>
    );
  }

  function nameInfo() {
    return (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
        <Text
          style={{
            marginBottom: Sizes.fixPadding - 5.0,
            ...Fonts.grayColor14Regular,
          }}
        >
          Full Name
        </Text>
        <TextInput
          value={name}
          onChangeText={(value) => setFullName(value)}
          selectionColor={Colors.primaryColor}
          style={styles.textFieldStyle}
        />
      </View>
    );
  }
 
  function vehicleNumberInfo() {
    return (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
        <Text
          style={{
            marginBottom: Sizes.fixPadding - 5.0,
            ...Fonts.grayColor14Regular,
          }}
        >
          Vehicle Number
        </Text>
        <TextInput
          value={vehicleNumber}
          onChangeText={(value) => setVehicleNumber(value)}
          selectionColor={Colors.primaryColor}
          style={styles.textFieldStyle}
        />
      </View>
    );
  }

  function profilePic() {
    return (
      <View
        style={{
          marginBottom: Sizes.fixPadding * 2.0,
          alignSelf: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: image }}
          style={{
            width: 100.0,
            height: 100.0,
            borderRadius: 50.0,
            backgroundColor: "#bbb",
          }}
        />
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {setShowProfileOptionsSheet(true);
            setShowing("dp");}}
          style={styles.cameraIconWrapStyle}
        >
          <MaterialIcons
            name="camera-alt"
            size={15}
            color={Colors.whiteColor}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function header() {
    return (
      <View
        style={{
          margin: Sizes.fixPadding * 2.0,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.pop()}
          style={styles.backIconWrapStyle}
        >
          <MaterialIcons
            name="keyboard-arrow-left"
            size={24}
            color={Colors.blackColor}
          />
        </TouchableOpacity>
        <Text
          style={{ textAlign: "center", flex: 1, ...Fonts.blackColor20Bold }}
        >
          Edit Profile
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  backIconWrapStyle: {
    width: 36.0,
    height: 36.0,
    borderRadius: 18.0,
    backgroundColor: "rgba(111, 111, 111, 0.05)",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    zIndex: 1,
  },
  cameraIconWrapStyle: {
    position: "absolute",
    bottom: 0.0,
    right: 5.0,
    backgroundColor: Colors.primaryColor,
    width: 32.0,
    height: 32.0,
    borderRadius: 16.0,
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.whiteColor,
    borderWidth: 2.5,
  },
  textFieldStyle: {
    backgroundColor: "rgba(111, 111, 111, 0.05)",
    borderRadius: Sizes.fixPadding - 5.0,
    ...Fonts.blackColor16Medium,
    padding: Sizes.fixPadding + 2.0,
  },
  buttonStyle: {
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding - 5.0,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Sizes.fixPadding + 3.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginVertical: Sizes.fixPadding * 3.0,
    elevation: 1.5,
    shadowColor: Colors.primaryColor,
  },
  bottomSheetWrapStyle: {
    paddingBottom: Sizes.fixPadding - 5.0,
    paddingTop: Sizes.fixPadding + 5.0,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    borderTopLeftRadius: 0.0,
    borderTopRightRadius: 0.0,
  },
  licenceInfoWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(111, 111, 111, 0.05)",
    borderRadius: Sizes.fixPadding - 5.0,
    padding: Sizes.fixPadding + 2.0,
  },
});

export default EditProfileScreen;
