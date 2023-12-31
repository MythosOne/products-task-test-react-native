import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const ProductCard = ({ image, title, price, description }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ProductDetails', { image, title, price, description})
      }
    >
      <View style={styles.item}>
        <Image
          source={{ uri: image }}
          resizeMode="contain"
          style={{
            width: 280,
            height: 240,
          }}
        />
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.price}>Price: {price}$</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
    // elevation: 5,

    backgroundColor: '#fff',

    borderColor: '#FF6C00',
    borderRadius: 14,
    borderWidth: 1,

    padding: 20,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  title: {
    marginTop: 10,
    color: '#767676',
    textAlign: 'center',
    fontSize: 22,
  },
  price: {
    marginTop: 10,
    color: '#FF6C00',
    textAlign: 'center',
    fontSize: 24,
  },
  description: {
    textAlign: 'center',
    fontSize: 18,
  },
});
