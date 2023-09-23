import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
// import { apiService } from "../../components/Api/apiService";
import { ProductCard } from "../../components/ProductCard/ProductCard";

import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/selectors";

export const ListOfProducts = React.memo(() => {
  const navigation = useNavigation();

  const products = useSelector(getProducts);
  // const dispatch = useDispatch();

  // const [products, setProducts] = useState([]);

  // console.log(products);

  // useEffect(() => {
  //   apiService()
  //     .then((cards) => setProducts([...products, ...cards]))
  //     .catch((err) => console.error(err))
  //     .finally(() => console.log("ok"));
  // }, []);

  console.log(products);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        title="Додати товар"
        style={styles.button}
        onPress={() => navigation.navigate("ProductAdd")}
      >
        <Text style={styles.buttonText}> Додати товар</Text>
      </TouchableOpacity>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductCard title={item.id} image={item.image} price={item.price} />
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",

    width: "100%",
    height: "100%",
  },
  button: {
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,

    backgroundColor: "#FF6C00",
    width: 200,
    height: 51,
    padding: 12,

    borderColor: "#FFFFFF",
    borderWidth: 2,
    borderRadius: 100,
    elevation: 10,
  },
  buttonText: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 20,
    lineHeight: 19,
    textAlign: "center",
    color: "#FFFFFF",
  },
});
