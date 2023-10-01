import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { ListOfProducts } from '../screens/mainScreen/ListOfProducts';
import { ProductAdd } from '../screens/nestedScreen/ProductAdd';
import { ProductDetails } from '../screens/nestedScreen/ProductDetails';

import { fetchProducts } from '../redux/productsSlice';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const MainStack = createStackNavigator();

export const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  },[dispatch]);

  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="ListOfProducts">
        <MainStack.Screen
          name="ListOfProducts"
          component={ListOfProducts}
          options={{
            title: 'Список Товарів',
            headerTintColor: '#FF6C00',
            // headerTitleStyle: {
            //   marginRight: 109,
            // },
          }}
        />
        <MainStack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={{
            title: 'Перегляд деталей товару',
            headerTintColor: '#FF6C00',
          }}
        />
        <MainStack.Screen
          name="ProductAdd"
          component={ProductAdd}
          options={{
            title: 'Додати товар',
            headerTintColor: '#FF6C00',
          }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};
