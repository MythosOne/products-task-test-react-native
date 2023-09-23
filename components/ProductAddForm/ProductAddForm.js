import React, { useState } from "react";
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

  const [isInputFocused, setFocus] = useState(false);

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

  console.log(products);

  // const formValidationSchema = Yup.object().shape({
  //   title: Yup
  //     .string()
  //     .min(2, "Занадто коротке")
  //     .required("Заповніть будь ласка"),
  //     price: Yup
  //     .number()
  //     .required("Заповніть будь ласка"),
  //     description: Yup
  //     .string()
  //     .max(200, "Повинно бути не більше 200 символів"),
  // });

  return (
    // <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ScrollView style={styles.container}>
      <Formik
        initialValues={{
          title: "",
          price: "",
          description: "",
        }}
        validationSchema={Yup.object({
          title: Yup.string()
            .min(2, "Must be at least 2 characters.")
            .required("Required"),
          price: Yup.number().required("Required"),
          description: Yup.string().max(200, "Must be 200 characters or less"),
        })}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleSubmit, values }) => (
          <View style={styles.form}>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <TextInput
                // name="productName"
                onChangeText={handleChange("title")}
                // onBlur={handleBlur("title")}
                value={values.title}
                placeholder="Назва товару"
                // style={styles.textInput}
                style={
                  isInputFocused.input1
                    ? styles.inputOnFocus
                    : styles.inputOnBlur
                }
                onFocus={(prev) => {
                  setFocus({ ...prev, input1: true });
                }}
                onBlur={(prev) => {
                  setFocus({ ...prev, input1: false });
                }}
              />
              <TextInput
                // name="productPrice"
                onChangeText={handleChange("price")}
                // onBlur={handleBlur("price")}
                value={values.price}
                placeholder="Ціна товару"
                // style={styles.textInput}
                style={
                  isInputFocused.input2
                    ? styles.inputOnFocus
                    : styles.inputOnBlur
                }
                onFocus={(prev) => {
                  setFocus({ ...prev, input2: true });
                }}
                onBlur={(prev) => {
                  setFocus({ ...prev, input2: false });
                }}
              />
              <TextInput
                editable
                multiline
                maxLength={200}
                // name="productDescription"
                onChangeText={handleChange("description")}
                // onBlur={handleBlur("description")}
                value={values.description}
                placeholder="Опис товару"
                style={
                  isInputFocused.input3
                    ? styles.inputOnFocusDescription
                    : styles.inputOnBlurDescription
                }
                onFocus={(prev) => {
                  setFocus({ ...prev, input3: true });
                }}
                onBlur={(prev) => {
                  setFocus({ ...prev, input3: false });
                }}
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
    </ScrollView>
    // </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    // height: "100%",
    backgroundColor: "#FFF",
  },
  // textInput: {
  //   height: 40,
  //   width: "80%",
  //   marginTop: 20,
  //   backgroundColor: "white",
  //   borderColor: "gray",
  //   borderWidth: StyleSheet.hairlineWidth,
  //   borderRadius: 10,
  // },
  // inputDescription: {
  //   height: 200,
  //   width: "94%",
  //   margin: 10,
  //   backgroundColor: "white",
  //   borderColor: "gray",
  //   borderWidth: StyleSheet.hairlineWidth,
  //   borderRadius: 10,
  // },
  button: {
    alignSelf: "center",
    // alignItems: "center",

    backgroundColor: "#FF6C00",
    width: 200,
    height: 51,
    padding: 12,
    marginTop: 20,
    marginBottom: 20,

    borderColor: "#FFFFFF",
    borderWidth: 2,
    borderRadius: 100,
    elevation: 10,
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

  inputOnBlur: {
    flexDirection: "row",
    alignSelf: "center",
    width: "90%",
    height: 50,
    borderWidth: 1,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderRadius: 8,
    padding: 10,
    marginTop: 20,
    elevation: 10,

    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 18,
    lineHeight: 19,
    color: "#BDBDBD",
  },

  inputOnFocus: {
    flexDirection: "row",
    alignItems: "baseline",
    alignSelf: "center",
    width: "90%",
    height: 50,
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    borderColor: "#FF6C00",
    borderRadius: 8,
    padding: 10,
    marginTop: 20,
    elevation: 10,

    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 18,
    lineHeight: 19,
    color: "#212121",
  },
  inputOnBlurDescription: {
    flexDirection: "row",
    alignSelf: "center",
    width: "90%",
    height: 200,
    borderWidth: 1,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderRadius: 8,
    padding: 10,
    marginTop: 20,
    elevation: 10,
    textAlignVertical: "top",

    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 18,
    lineHeight: 19,
    color: "#BDBDBD",
  },

  inputOnFocusDescription: {
    // flexDirection: "row",
    // alignItems: "baseline",
    alignSelf: "center",
    width: "90%",
    height: 200,
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    borderColor: "#FF6C00",
    borderRadius: 8,
    padding: 10,
    marginTop: 20,
    elevation: 10,
    textAlignVertical: "top",

    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 18,
    lineHeight: 19,
    color: "#212121",
  },
});
