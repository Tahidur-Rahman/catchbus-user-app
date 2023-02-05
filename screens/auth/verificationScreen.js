import {
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  View,
  TextInput,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, createRef } from "react";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { Dialog } from "@rneui/themed";
import { useDispatch } from "react-redux";
import { setData } from "../../utils/AsyncStorageManager";
import { setUser } from "../../redux/features/rootSlice";
import { useUpdateProfileMutation } from "../../redux/features/api/authApi";

const { width } = Dimensions.get("window");

const VerificationScreen = ({ route, navigation }) => {
  const { pin, user } = route.params;
  const dispatch = useDispatch();
  const [setUpdateProfile] = useUpdateProfileMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [firstDigit, setFirstDigit] = useState("");
  const [secondDigit, setSecondDigit] = useState("");
  const [thirdDigit, setThirdDigit] = useState("");
  const [forthDigit, setForthDigit] = useState("");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {verificationInfo()}
          {otpInfo()}
          {continueButton()}
          {loadingDialog()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );

  function loadingDialog() {
    return (
      <Dialog
        visible={isLoading}
        onRequestClose={() => {
          setIsLoading(false);
        }}
        overlayStyle={styles.dialogStyle}
      >
        <View
          style={{ backgroundColor: Colors.whiteColor, alignItems: "center" }}
        >
          <ActivityIndicator color={Colors.primaryColor} size={56} />
          <Text
            style={{ ...Fonts.grayColor15Medium, marginTop: Sizes.fixPadding }}
          >
            Please wait...
          </Text>
        </View>
      </Dialog>
    );
  }

  function continueButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          setIsLoading(true);
          setTimeout(() => {
            setIsLoading(false);
            if (pin == firstDigit + secondDigit + thirdDigit + forthDigit) {
              setData("token", user.token);
              dispatch(setUser(user));
              navigation.replace("Home");
              
    setUpdateProfile({ verified:true });
            } else {
              Alert.alert("", "OTP doesn't match!");
              setFirstDigit("");
              setSecondDigit("");
              setThirdDigit("");
              setForthDigit("");
            }
          }, 2000);
        }}
        style={styles.buttonStyle}
      >
        <Text style={{ ...Fonts.whiteColor20SemiBold }}>Continue</Text>
      </TouchableOpacity>
    );
  }

  function otpInfo() {
    const secondTextInput = createRef();
    const thirdTextInput = createRef();
    const forthTextInput = createRef();
    return (
      <View style={styles.otpFieldsWrapStyle}>
        <View style={styles.textFieldWrapStyle}>
          <TextInput
            selectionColor={Colors.primaryColor}
            value={firstDigit}
            style={{ ...Fonts.blackColor18Medium }}
            onChangeText={(text) => {
              setFirstDigit(text);
              secondTextInput.current.focus();
            }}
            autoFocus
            keyboardType="numeric"
          />
        </View>

        <View style={styles.textFieldWrapStyle}>
          <TextInput
            selectionColor={Colors.primaryColor}
            value={secondDigit}
            style={{ ...Fonts.blackColor18Medium }}
            ref={secondTextInput}
            keyboardType="numeric"
            onChangeText={(text) => {
              setSecondDigit(text);
              thirdTextInput.current.focus();
            }}
          />
        </View>

        <View style={styles.textFieldWrapStyle}>
          <TextInput
            selectionColor={Colors.primaryColor}
            style={{ ...Fonts.blackColor18Medium }}
            keyboardType="numeric"
            value={thirdDigit}
            ref={thirdTextInput}
            onChangeText={(text) => {
              setThirdDigit(text);
              forthTextInput.current.focus();
            }}
          />
        </View>

        <View style={styles.textFieldWrapStyle}>
          <TextInput
            selectionColor={Colors.primaryColor}
            style={{ ...Fonts.blackColor18Medium }}
            keyboardType="numeric"
            value={forthDigit}
            ref={forthTextInput}
            onChangeText={(text) => {
              setForthDigit(text);
              setIsLoading(true);
              setTimeout(() => {
                setIsLoading(false);
                navigation.push("Home");
              }, 2000);
            }}
          />
        </View>
      </View>
    );
  }

  function verificationInfo() {
    return (
      <Text
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          ...Fonts.blackColor15Medium,
        }}
      >
        Enter 4 digit verification code. We just sent you on your email address.
      </Text>
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
          Verification
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
  otpFieldsWrapStyle: {
    flexDirection: "row",
    marginTop: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding,
  },
  textFieldWrapStyle: {
    height: width / 7.0,
    width: width / 7.0,
    borderRadius: Sizes.fixPadding - 5.0,
    backgroundColor: "rgba(111,111,111,0.05)",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: Sizes.fixPadding,
    paddingLeft: Sizes.fixPadding - 2.0,
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
  dialogStyle: {
    paddingVertical: Sizes.fixPadding + 5.0,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    backgroundColor: Colors.whiteColor,
    width: width - 40,
    borderRadius: Sizes.fixPadding - 5.0,
  },
});

export default VerificationScreen;
