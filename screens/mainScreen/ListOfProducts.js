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
import { apiService } from "../../components/Api/apiService";
import { ProductCard } from "../../components/ProductCard/ProductCard";

import { useSelector } from 'react-redux';
import { getProducts } from '../../redux/selectors';

export const ListOfProducts = () => {
  const navigation = useNavigation();

  // const products = useSelector(getProducts);

  const [products, setProducts] = useState([]);

  console.log(products);

  useEffect(() => {
    apiService()
      .then((cards) => setProducts([...products, ...cards]))
      .catch((err) => console.error(err))
      .finally(() => console.log("ok"));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* <Button
        title="Додати товар"
        onPress={() => navigation.navigate("ProductAdd")}
      /> */}
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductCard
            title={item.title}
            image={item.image}
            price={item.price}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",

    width: "100%",
    height: "100%",
  },
});
