import React from "react";
import { Button, TextInput, View, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";

export const ProductAddForm = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.form}>
      <Formik
        initialValues={{
          product: "",
          price: "",
          descr: "",
        }}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleChange, handleSubmit, handleBlur, values }) => (
          <View>
            <TextInput
              onChangeText={handleChange("product")}
              onBlur={handleBlur("product")}
              value={values.product}
              placeholder="Назва товару"
            />
            <TextInput
              onChangeText={handleChange("price")}
              onBlur={handleBlur("price")}
              value={values.price}
              placeholder="Ціна товару"
            />
            <TextInput
              onChangeText={handleChange("descr")}
              onBlur={handleBlur("descr")}
              value={values.descr}
              placeholder="Опис товару"
              multiline={true}
            />
            <Button
              onPress={
                // ()=> navigation.navigate("ListOfProducts");
                handleSubmit
              }
              title="Додати товар"
            />
            {/* <Button onPress={handleSubmit} title="Додати товар" /> */}
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    width: "80%",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    elevation: 10,
    backgroundColor: "#e6e6e6",
  },
  textInput: {
    height: 40,
    width: "100%",
    margin: 10,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
});
