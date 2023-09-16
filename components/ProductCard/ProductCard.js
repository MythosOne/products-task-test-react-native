import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";


export const ProductCard = ({ image, title, price, description }) => {
    const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ProductDetails", { image, title, price })
        }
      >
        <View style={styles.item}>
          <Image source={ {uri: image}} style={{ width: 200, height: 200 }} />
          <View>
            <Text style={styles.title}>Title: {title}</Text>
            <Text style={styles.price}>Price: {price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",

    width: 300,
    // height: 140,
    backgroundColor: "white",

    borderColor: "#eee",
    borderRadius: 14,
    borderWidth: 1,

    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
  },
  price: {
    textAlign: "center",
    fontSize: 32,
  },
  description: {
    textAlign: "center",
    fontSize: 18,
  },
});
