import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons, Entypo } from '@expo/vector-icons';

const salons = [
  {
    id: '1',
    name: 'berd barber shop',
    distance: '8.8км',
    views: 2019,
    hours: 'Амарна',
    image: 'https://via.placeholder.com/300x200.png?text=berd',
    description: 'Энэ бол berd barber shop дэлгэрэнгүй танилцуулга юм.',
  },
  {
    id: '2',
    name: 'Esa Vip Hair color salon',
    distance: '8.8км',
    views: 707,
    hours: 'Амарна',
    image: 'https://via.placeholder.com/300x200.png?text=esa',
    description: 'Esa салон нь үсний будалт дээр мэргэшсэн.',
  },
  {
    id: '3',
    name: 'L&A Barber Shop',
    distance: '9.3км',
    views: 4326,
    hours: '10:00–21:00',
    image: 'https://via.placeholder.com/300x200.png?text=L%26A',
    description: 'L&A бол залуусын дунд алдартай шоп юм.',
  },
  {
    id: '4',
    name: 'Бодь мутар',
    distance: '10.3км',
    views: 648,
    hours: '09:00–21:00',
    image: 'https://via.placeholder.com/300x200.png?text=Бодь',
    description: 'Бариа засал, уламжлалт аргаар үйлчилдэг газар.',
  },
  {
    id: '5',
    name: "Jonny's barbershop",
    distance: '10.3км',
    views: 0,
    hours: 'Амарна',
    image: 'https://via.placeholder.com/300x200.png?text=Jonny',
    description: 'Jonny\'s бол шинээр нээгдсэн гоо сайхны салон.',
  },
];

export default function DetailPage() {
  const { id } = useLocalSearchParams();

  const salon = salons.find((s) => s.id === id);

  if (!salon) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Салон олдсонгүй</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: salon.image }} style={styles.image} />
      <Text style={styles.name}>{salon.name}</Text>
      <View style={styles.row}>
        <Entypo name="location-pin" size={18} color="#004080" />
        <Text style={styles.infoText}>{salon.distance}</Text>
      </View>
      <View style={styles.row}>
        <Entypo name="eye" size={18} color="#004080" />
        <Text style={styles.infoText}>{salon.views.toLocaleString()} үзэлт</Text>
      </View>
      <View style={styles.row}>
        <Ionicons name="time-outline" size={18} color="#004080" />
        <Text style={styles.infoText}>{salon.hours}</Text>
      </View>
      <Text style={styles.description}>{salon.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#004080',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 8,
    color: '#333',
  },
  description: {
    fontSize: 16,
    marginTop: 20,
    lineHeight: 22,
    color: '#555',
  },
  error: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40,
    color: 'red',
  },
});
