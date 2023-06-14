import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./Pages/HomeScreen";
import ForecastPage from "./Pages/ForecastPage";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (

      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false ,navigationBarHidden: true}}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="forecastPage" component={ForecastPage}/>
        </Stack.Navigator>
      </NavigationContainer>

  );
}
