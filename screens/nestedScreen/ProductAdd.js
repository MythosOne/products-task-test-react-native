import React from "react";
import { View, StyleSheet } from "react-native";
import { ProductAddForm } from "../../components/ProductAddForm/ProductAddForm";
// import { Formik } from "formik";

export const ProductAdd = () => {
  return (
    <View style={styles.container}>
      <ProductAddForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
