import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
const salons = [
  {
    id: '1',
    name: 'berd barber shop',
    distance: '8.8км',
    views: 2019,
    hours: 'Амарна',
    image: 'https://via.placeholder.com/60x60.png?text=berd',
  },
  {
    id: '2',
    name: 'Esa Vip Hair color salon',
    distance: '8.8км',
    views: 707,
    hours: 'Амарна',
    image: 'https://via.placeholder.com/60x60.png?text=esa',
  },
  {
    id: '3',
    name: 'L&A Barber Shop',
    distance: '9.3км',
    views: 4326,
    hours: '10:00–21:00',
    image: 'https://via.placeholder.com/60x60.png?text=L%26A',
  },
  {
    id: '4',
    name: 'Бодь мутар',
    distance: '10.3км',
    views: 648,
    hours: '09:00–21:00',
    image: 'https://via.placeholder.com/60x60.png?text=Бодь',
  },
  {
    id: '5',
    name: "Jonny's barbershop",
    distance: '10.3км',
    views: 0,
    hours: 'Амарна',
    image: 'https://via.placeholder.com/60x60.png?text=Jonny',
  },
];

export default function Barber() {
  const [activeFilter, setActiveFilter] = useState('nearby');
  const router = useRouter();

  const handleFilterPress = (filter) => {
    setActiveFilter(filter);
    // энд шүүлтүүрийн логик нэмэх боломжтой
  };

  const renderSalon = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.logo} />
      <View style={{ flex: 1, paddingHorizontal: 10 }}>
        <Text style={styles.name}>{item.name}</Text>
      <View style={styles.row}>
          <Entypo name="location-pin" size={14} color="#004080" />
          <Text style={styles.infoText}>{item.distance}</Text>
      </View>
      <View style={styles.row}>
          <Entypo name="eye" size={14} color="#004080" />
          <Text style={styles.infoText}>{item.views.toLocaleString()}</Text>
      </View>
      <View style={styles.row}>
          <Ionicons name="time-outline" size={14} color="#004080" />
          <Text style={styles.infoText}>{item.hours}</Text>
      </View>
      </View >
      <TouchableOpacity onPress={() => router.push(`/detail/${item.id}`)}>
      <MaterialIcons name="arrow-forward-ios" size={16} color="#004080" />
    </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f4f6' }}>
    
      <ScrollView horizontal={true}
      showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
          // justifyContent: "space-around",
          flexDirection: "row",

          //height: 150,
          //borderWidth: 1,
          
        }}
      >
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterBtn, activeFilter === 'nearby' && styles.activeBtn]}
          onPress={() => handleFilterPress('nearby')}
        >
          
          <Text style={[styles.filterText, activeFilter === 'nearby' && styles.activeText]}>📍 Надад ойр</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterBtn, activeFilter === 'rating' && styles.activeBtn]}
          onPress={() => handleFilterPress('rating')}
        >
          
          <Text style={[styles.filterText, activeFilter === 'rating' && styles.activeText]}>✨ Үнэлгээ их</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterBtn, activeFilter === 'tattoo' && styles.activeBtn]}
          onPress={() => handleFilterPress('tattoo')}
        >
          
          <Text style={[styles.filterText, activeFilter === 'tattoo' && styles.activeText]}>✏️ Шивээс</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterBtn, activeFilter === 'new' && styles.activeBtn]}
          onPress={() => handleFilterPress('new')}
        >
          <Text style={[styles.filterText, activeFilter === 'new' && styles.activeText]}>✏️ Шинэ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterBtn, activeFilter === 'massage' && styles.activeBtn]}
          onPress={() => handleFilterPress('massage')}
        >
          <Text style={[styles.filterText, activeFilter === 'massage' && styles.activeText]}>✏️ Бариа засал</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
      <FlatList
        data={salons}
        keyExtractor={(item) => item.id}
        renderItem={renderSalon}
        contentContainerStyle={styles.listContent}
      />
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
    marginVertical: 4,
    marginHorizontal: 10,
  },
  activeBtn: {
    backgroundColor: '#1f8a70',
  },
  filterText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 6,
    textAlign: 'center', // текстийг голлуулах
  },
  activeText: {
    color: '#fff',
    fontWeight: '600',
  },
  listContent: {
    padding: 12,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  infoText: {
    fontSize: 13,
    color: '#333',
    marginLeft: 6,
  },
});
