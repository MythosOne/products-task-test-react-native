import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { Button, TouchableOpacity } from "react-native";
import * as Icon from "react-native-feather";

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

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

  const headerOptions = {
    title: "Список Товарів",
    headerTintColor: "#FF6C00",
    headerRight: () => (
      <TouchableOpacity
        onPress={() => alert("ListOfProducts")}
        // onPress={() => navigation.navigate("ProductAdd")}
        style={{ marginRight: 20 }}
      >
        <Icon.Plus width={28} height={28} color="#FF6C00" />
      </TouchableOpacity>
    ),
  };

  const MainStack = createStackNavigator();
  // const navigation = useNavigation();

  return (
    <Provider store={store}>
    {/* <PersistGate persistor={persistor}> */}
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="ListOfProducts">
        <MainStack.Screen
          name="ListOfProducts"
          component={ListOfProducts}
          options={headerOptions}
        />
        <MainStack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={{
            title: "Перегляд деталей товару",
            headerTintColor: "#FF6C00",
          }}
        />
        <MainStack.Screen
          name="ProductAdd"
          component={ProductAdd}
          options={{ title: "Додати товар", headerTintColor: "#FF6C00" }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
    {/* </PersistGate> */}
    </Provider>
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
