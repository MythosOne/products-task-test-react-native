import React from 'react';
import { View, ScrollView, Text, Image, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

export const ProductDetails = () => {
  const {
    params: { image, title, price, description },
  } = useRoute();

  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Image source={{ uri: image }} resizeMode="contain" style={{ minWidth: 320, minHeight: 320 }} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>Price $: {price}</Text>
      <ScrollView
        style={{ width: '100%' }}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
        }}
      >
        <Text style={styles.description}>
          Product description: {description}
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'start',

    backgroundColor: '#fff',
  },
  image: {
    marginTop: 20,
    padding: 5,

    borderWidth: 2,
    borderRadius: 6,
    borderColor: '#FF6C00',
    backgroundSize: 'cover',
  },
  title: {
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
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
    flexGrow: 1,

    width: '90%',
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    textAlign: 'center',
    color: '#767676',
    fontSize: 18,
  },
});
