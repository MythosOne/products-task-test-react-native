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
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.price}>Price: {price}$</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",

    // minWidth: "100%",
    minWidth: 340,
    // height: 140,
    backgroundColor: "white",

    borderColor: "#FF6C00",
    borderRadius: 14,
    borderWidth: 1,

    padding: 20,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  title: {
    marginTop: 10,
    color: "#767676",
    textAlign: "center",
    fontSize: 22,
  },
  price: {
    marginTop: 10,
    color: "#FF6C00",
    textAlign: "center",
    fontSize: 24,
  },
  description: {
    textAlign: "center",
    fontSize: 18,
  },
});
