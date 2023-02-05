import LoadingScreen from "./components/loadingScreen";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import homeScreen from "./screens/home/homeScreen";
import editProfileScreen from "./screens/editProfile/editProfileScreen";
import addDestinationScreen from "./screens/addDestination/addDestinationScreen";
import nearByStationsScreen from "./screens/nearByStations/nearByStationsScreen";
import busStopDetailScreen from "./screens/busStopDetail/busStopDetailScreen";
import busRouteScreen from "./screens/busRoute/busRouteScreen";
import paymentMethodScreen from "./screens/paymentMethod/paymentMethodScreen";
import ticketBookedScreen from "./screens/ticketBooked/ticketBookedScreen";
import trackBusScreen from "./screens/trackBus/trackBusScreen";
import walletScreen from "./screens/wallet/walletScreen";
import ticketsScreen from "./screens/tickets/ticketsScreen";
import dailyReminderScreen from "./screens/dailyReminder/dailyReminderScreen";
import rewardsScreen from "./screens/rewards/rewardsScreen";
import contactUsScreen from "./screens/contactUs/contactUsScreen";
import termsAndConditionsScreen from "./screens/termsAndConditions/termsAndConditionsScreen";
import splashScreen from "./screens/splashScreen";
import onboardingScreen from "./screens/onboarding/onboardingScreen";
import loginScreen from "./screens/auth/loginScreen";
import registerScreen from "./screens/auth/registerScreen";
import verificationScreen from "./screens/auth/verificationScreen";
import store from "./redux/store";
import { Provider } from "react-redux";
import SelectUser from "./screens/onboarding/SelectUser";

const Stack = createStackNavigator();

function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator
      // initialRouteName="EditProfile"
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen
          name="Splash"
          component={splashScreen}
          options={{ ...TransitionPresets.DefaultTransition }}
        />
        <Stack.Screen
          name="Onboarding"
          component={onboardingScreen}
          options={{ ...TransitionPresets.DefaultTransition }}
        />
        <Stack.Screen
          name="SelectUser"
          component={SelectUser}
          options={{ ...TransitionPresets.DefaultTransition }}
        />
        <Stack.Screen
          name="Login"
          component={loginScreen}
          options={{ ...TransitionPresets.DefaultTransition }}
        />
        <Stack.Screen name="Register" component={registerScreen} />
        <Stack.Screen name="Verification" component={verificationScreen} />
        <Stack.Screen
          name="Home"
          component={homeScreen}
          options={{ ...TransitionPresets.DefaultTransition }}
        />
        <Stack.Screen name="AddDestination" component={addDestinationScreen} />
        <Stack.Screen name="NearByStations" component={nearByStationsScreen} />
        <Stack.Screen name="BusStopDetail" component={busStopDetailScreen} />
        <Stack.Screen name="BusRoute" component={busRouteScreen} />
        <Stack.Screen name="PaymentMethod" component={paymentMethodScreen} />
        <Stack.Screen name="TicketBooked" component={ticketBookedScreen} />
        <Stack.Screen name="TrackBus" component={trackBusScreen} />
        <Stack.Screen
          name="EditProfile"
          component={editProfileScreen}
          options={{ ...TransitionPresets.DefaultTransition }}
        />
        <Stack.Screen
          name="Wallet"
          component={walletScreen}
          options={{ ...TransitionPresets.DefaultTransition }}
        />
        <Stack.Screen
          name="Tickets"
          component={ticketsScreen}
          options={{ ...TransitionPresets.DefaultTransition }}
        />
        <Stack.Screen
          name="DailyReminder"
          component={dailyReminderScreen}
          options={{ ...TransitionPresets.DefaultTransition }}
        />
        <Stack.Screen
          name="Rewards"
          component={rewardsScreen}
          options={{ ...TransitionPresets.DefaultTransition }}
        />
        <Stack.Screen
          name="ContactUs"
          component={contactUsScreen}
          options={{ ...TransitionPresets.DefaultTransition }}
        />
        <Stack.Screen
          name="TermsAndConditions"
          component={termsAndConditionsScreen}
          options={{ ...TransitionPresets.DefaultTransition }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const AppWrapper = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default AppWrapper;
