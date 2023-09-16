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

export const ListOfProducts = () => {
  const navigation = useNavigation();

  const [products, setProducts] = useState([]);

  console.log(products);

  useEffect(() => {
    apiService()
      .then((cards) => setProducts([...products, ...cards]))
      .catch((err) => console.error(err))
      .finally(() => console.log("ok"));
  }, []);

  // const Item = ({ image, title, price, description }) => (
  //   <TouchableOpacity
  //     onPress={() =>
  //       navigation.navigate("ProductDetails", { image, title, price })
  //     }
  //   >
  //     <View style={styles.item}>
  //       <Image source={{ image }} style={{ width: 200, height: 200 }} />
  //       <View>
  //         <Text style={styles.title}>Title: {title}</Text>
  //         <Text style={styles.price}>Price: {price}</Text>
  //         <Text style={styles.description}>Description: {description}</Text>
  //       </View>
  //     </View>
  //   </TouchableOpacity>
  // );

  return (
    <SafeAreaView style={styles.container}>
      <Button
        title="Додати товар"
        onPress={() => navigation.navigate("ProductAdd")}
      />
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  // item: {
  //   flex: 1,
  //   alignItems: "center",
  //   justifyContent: "center",

  //   width: 300,
  //   // height: 140,
  //   backgroundColor: "white",

  //   borderColor: "#eee",
  //   borderRadius: 14,
  //   borderWidth: 1,

  //   padding: 20,
  //   marginVertical: 8,
  //   marginHorizontal: 16,
  // },
  // title: {
  //   textAlign: "center",
  //   fontSize: 24,
  // },
  // price: {
  //   textAlign: "center",
  //   fontSize: 32,
  // },
  // description: {
  //   textAlign: "center",
  //   fontSize: 18,
  // },
});
