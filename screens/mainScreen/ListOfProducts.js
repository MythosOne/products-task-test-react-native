import React, {useEffect}from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ProductCard } from '../../components/ProductCard/ProductCard';

import { useSelector, useDispatch} from 'react-redux';
import { getProducts } from '../../redux/selectors';

import * as Icon from 'react-native-feather';

export const ListOfProducts = React.memo(() => {
  const navigation = useNavigation();
  
  const products = useSelector(getProducts);

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductCard
            title={item.title}
            image={item.image}
            price={item.price}
            description={item.description}
          />
        )}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity
        title="Додати товар"
        style={styles.button}
        onPress={() => navigation.navigate('ProductAdd')}
      >
        <Icon.Plus width={32} height={32} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 20,
    right: 20,
    marginTop: 10,
    marginBottom: 10,
    padding: 0,

    backgroundColor: '#FF6C00',

    padding: 10,
    margin: 0,

    borderColor: '#FFFFFF',
    borderWidth: 2,
    borderRadius: 50,
    elevation: 10,
  },
  buttonText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 19,
    textAlign: 'center',
    color: '#FFFFFF',
  },
});
