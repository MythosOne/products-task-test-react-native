import React, { useState } from 'react';
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
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';

import { addProduct } from "../../redux/operations";
import { getProducts } from '../../redux/selectors';
import { useDispatch, useSelector } from 'react-redux';

import { addProducts } from '../../redux/productsSlice';
import uuid from 'react-native-uuid';

export const ProductAddForm = () => {
  const dispatch = useDispatch();
  const products = useSelector(getProducts);
  const navigation = useNavigation();

  const [isInputFocused, setFocus] = useState(false);

  const handleSubmit = ({ title, price, description }, { resetForm }) => {
    const loweredCase = title.toLowerCase().trim();
    const searchProduct = products.some(
      product => product.title.toLowerCase().trim() === loweredCase
    );

    if (searchProduct) {
      alert(`${title} is already in products list`);
    } else if (title.length === 0) {
      alert('Fields must be filled!');
    } else {
      dispatch(
        addProducts({
          id: uuid.v4(),
          title,
          price,
          description,
        })
      );
      alert('Product added!');
    }
    resetForm();
  };

  console.log(products);

  const productValidationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Заповніть будь ласка')
      .min(2, 'Занадто коротке'),
    price: Yup.number().positive().required('Заповніть будь ласка'),
    description: Yup.string()
      .required('Заповніть будь ласка')
      .max(200, ({ max }) => `Повинно бути не більше ${max} символів`),
  });

  return (
    // <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ScrollView style={styles.container}>
      <Formik
        initialValues={{
          title: '',
          price: '',
          description: '',
        }}
        validationSchema={productValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleSubmit, values, errors }) => (
          <View style={styles.form}>
            <KeyboardAvoidingView
              behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            >
              <View>
                <TextInput
                  name="title"
                  onChangeText={handleChange('title')}
                  value={values.title}
                  placeholder="Назва товару"
                  style={
                    isInputFocused.input1
                      ? styles.inputOnFocus
                      : styles.inputOnBlur
                  }
                  onFocus={prev => {
                    setFocus({ ...prev, input1: true });
                  }}
                  onBlur={prev => {
                    setFocus({ ...prev, input1: false });
                  }}
                />
                {errors.title &&(<Text style={styles.errorTxt}>{errors.title}</Text>)}
              </View>
              <View>
              <TextInput
                name="price"
                onChangeText={handleChange('price')}
                value={values.price}
                placeholder="Ціна товару"
                style={
                  isInputFocused.input2
                    ? styles.inputOnFocus
                    : styles.inputOnBlur
                }
                onFocus={prev => {
                  setFocus({ ...prev, input2: true });
                }}
                onBlur={prev => {
                  setFocus({ ...prev, input2: false });
                }}
              />
              {errors.price &&(<Text style={styles.errorTxt}>{errors.price}</Text>)}
              </View>
              <View>
              <TextInput
                name="description"
                editable
                multiline
                maxLength={200}
                onChangeText={handleChange('description')}
                value={values.description}
                placeholder="Опис товару"
                style={
                  isInputFocused.input3
                    ? styles.inputOnFocusDescription
                    : styles.inputOnBlurDescription
                }
                onFocus={prev => {
                  setFocus({ ...prev, input3: true });
                }}
                onBlur={prev => {
                  setFocus({ ...prev, input3: false });
                }}
              />
              {errors.description &&(<Text style={styles.errorTxt}>{errors.description}</Text>)}
              </View>
            </KeyboardAvoidingView>
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
              title="Додати товар"
            >
              <Text style={styles.buttonText}> Додати товар</Text>
            </TouchableOpacity>
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
    width: '100%',
    // height: "100%",
    backgroundColor: '#FFF',
  },
  errorTxt:{
    fontSize: 14,
    color:"red",
    marginTop: 5,
    marginLeft: 20,
  },
  inputOnBlur: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: '90%',
    height: 50,
    borderWidth: 1,
    backgroundColor: '#F6F6F6',
    borderColor: '#E8E8E8',
    borderRadius: 8,
    padding: 10,
    marginTop: 20,
    elevation: 10,

    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 19,
    color: '#BDBDBD',
  },

  inputOnFocus: {
    flexDirection: 'row',
    alignItems: 'baseline',
    alignSelf: 'center',
    width: '90%',
    height: 50,
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    borderColor: '#FF6C00',
    borderRadius: 8,
    padding: 10,
    marginTop: 20,
    elevation: 10,

    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 19,
    color: '#212121',
  },
  inputOnBlurDescription: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: '90%',
    height: 200,
    borderWidth: 1,
    backgroundColor: '#F6F6F6',
    borderColor: '#E8E8E8',
    borderRadius: 8,
    padding: 10,
    marginTop: 20,
    elevation: 10,
    textAlignVertical: 'top',

    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 19,
    color: '#BDBDBD',
  },

  inputOnFocusDescription: {
    alignSelf: 'center',
    width: '90%',
    height: 200,
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    borderColor: '#FF6C00',
    borderRadius: 8,
    padding: 10,
    marginTop: 20,
    elevation: 10,
    textAlignVertical: 'top',

    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 19,
    color: '#212121',
  },
  button: {
    alignSelf: 'center',
    // alignItems: "center",

    backgroundColor: '#FF6C00',
    width: 200,
    height: 51,
    padding: 12,
    marginTop: 20,
    marginBottom: 20,

    borderColor: '#FFFFFF',
    borderWidth: 2,
    borderRadius: 100,
    elevation: 10,
  },
  buttonText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 19,
    textAlign: 'center',
    color: '#FFFFFF',
  },
});
