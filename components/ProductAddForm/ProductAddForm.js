import React from "react";
import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";

import { addProduct } from "../../redux/operations";
import { getProducts } from "../../redux/selectors";
import { useDispatch, useSelector } from "react-redux";

// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';

export const ProductAddForm = () => {
  const dispatch = useDispatch();
  const products = useSelector(getProducts);
  const navigation = useNavigation();

  // const products = useSelector(getProducts);

  const handleSubmit = ({ title, price, description }, { resetForm }) => {
    const loweredCase = title.toLowerCase().trim();
    const searchProduct = products.some(
      (product) => product.title.toLowerCase().trim() === loweredCase
    );

    if (searchProduct) {
      alert(`${title} is already in products list`);
    } else if (title.length === 0) {
      alert("Fields must be filled!");
    } else {
      dispatch(
        addProduct({
          title,
          price,
          description,
        })
      );
      alert("Product added!");
    }
    resetForm();
  };

  const formValidationSchema = Yup.object().shape({
    title: Yup
      .string()
      .min(2, "Занадто коротке")
      .required("Заповніть будь ласка"),
      price: Yup
      .number()
      .required("Заповніть будь ласка"),
      description: Yup
      .string()
      .max(200, "Повинно бути не більше 200 символів"),
  });

  return (
    // <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    // <ScrollView style={styles.form}>
      <Formik
        validationSchema={formValidationSchema}
        initialValues={{
          title: "",
          price: "",
          description: "",
        }}
        // onSubmit={(values) => console.log(values)}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleSubmit, handleBlur, values }) => (
          <View style={styles.form}>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <TextInput
                // name="productName"
                onChangeText={handleChange("title")}
                onBlur={handleBlur("title")}
                value={values.title}
                placeholder="Назва товару"
                style={styles.textInput}
              />
              <TextInput
                // name="productPrice"
                onChangeText={handleChange("price")}
                onBlur={handleBlur("price")}
                value={values.price}
                placeholder="Ціна товару"
                style={styles.textInput}
              />
              <TextInput
                // name="productDescription"
                onChangeText={handleChange("description")}
                onBlur={handleBlur("description")}
                value={values.description}
                placeholder="Опис товару"
                multiline={true}
                style={styles.inputDescription}
              />
            </KeyboardAvoidingView>
            <TouchableOpacity
              style={styles.button}
              onPress={
                // ()=> navigation.navigate("ListOfProducts");
                handleSubmit
              }
              title="Додати товар"
            >
              <Text style={styles.buttonText}> Додати товар</Text>
            </TouchableOpacity>
            {/* <Button onPress={handleSubmit} title="Додати товар" /> */}
          </View>
        )}
      </Formik>
    // </ScrollView>
    // </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    width: "100%",
    height: "100%",
    // alignItems: "center",
    // justifyContent: "center",
    padding: 10,
    elevation: 10,
    backgroundColor: "#FFF",
  },
  textInput: {
    height: 40,
    width: "80%",
    margin: 10,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
  inputDescription: {
    height: 200,
    width: "80%",
    margin: 10,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
  button: {
    alignSelf: "center",
    // alignItems: "center",

    backgroundColor: "#FF6C00",
    width: 260,
    height: 51,
    padding: 12,

    borderColor: "#FFFFFF",
    borderWidth: 2,
    borderRadius: 100,
  },
  buttonText: {
    // height: 19,

    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 18,
    lineHeight: 19,
    textAlign: "center",
    color: "#FFFFFF",
  },
  // textInput: {
  //   width: "78%",
  //   fontFamily: "Roboto",
  //   fontStyle: "normal",
  //   fontWeight: "400",
  //   fontSize: 16,
  //   lineHeight: 19,
  //   color: "#212121",
  // },
});
