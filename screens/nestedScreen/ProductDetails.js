import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

export const ProductDetails = () => {
  const {
    params: { image, title, price, description },
  } = useRoute();

  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />
      </View>
      <Text>Product Name: {title}</Text>
      <Text>Product price in $: {price}</Text>
      <Text>Product description: {description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    borderWidth: 1,
    borderRadius: 6,
  },
});
