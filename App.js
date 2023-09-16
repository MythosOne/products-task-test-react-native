import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { ListOfProducts } from "./screens/mainScreen/ListOfProducts";
import { ProductAdd } from "./screens/nestedScreen/ProductAdd";
import { ProductDetails } from "./screens/nestedScreen/ProductDetails";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const MainStack = createStackNavigator();

  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="ListOfProducts">
        <MainStack.Screen
          name="ListOfProducts"
          component={ListOfProducts}
          options={{ title: "Список Товарів" }}
        />
        <MainStack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={{ title: "Перегляд деталей товару" }}
        />
        <MainStack.Screen
          name="ProductAdd"
          component={ProductAdd}
          options={{ title: "Додати товар" }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
