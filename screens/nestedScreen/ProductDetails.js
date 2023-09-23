import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

export const ProductDetails = () => {
  const {
    params: { image, title, price, description },
  } = useRoute();
  console.log(price, description);

  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Image source={{ uri: image }} style={{ width: 340, height: 340 }} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>Price $: {price}</Text>
      <Text style={styles.description}>Product description: {description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "start",

    backgroundColor: "#fff",
  },
  image: {
    marginTop: 20,

    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#FF6C00",
    backgroundSize: 'cover',  
  },
  title:{
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
    marginTop: 10,
    textAlign: "center",
    color: "#767676",
    fontSize: 18,
  },
});
