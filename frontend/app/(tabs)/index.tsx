import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, FlatList, Image,
  TouchableOpacity, SafeAreaView, ScrollView
} from 'react-native';
import { Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { fetchData, BASE_URL } from "../../utils/needful";

export default function Barber() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('nearby');
  const [originalData, setOriginalData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    try {
      const data = await fetchData({
        url: BASE_URL + "/apibarber/",
        method: "POST",
        body: { action: "getallbarber" },
      });
      const barberList = data["data"];
      setOriginalData(barberList);
      setFilteredData(barberList);
    } catch (err: any) {
      setError(err.message || "Алдаа гарлаа.");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterPress = (filter: string) => {
    setActiveFilter(filter);
    let data = [...originalData];

    switch (filter) {
      case 'rating':
        data = data.filter(item => item.rate > 0);
        data.sort((a, b) => b.rate - a.rate);
        break;
      case 'new':
        data = data.filter(item => item.type?.toLowerCase() === 'new');
        break;
      case 'tattoo':
        data = data.filter(item => item.type?.toLowerCase() === 'tattoo');
        break;
      case 'massage':
        data = data.filter(item => item.type?.toLowerCase() === 'massage');
        break;
      default:
        data = originalData;
    }

    setFilteredData(data);
  };

  const renderSalon = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: BASE_URL + item.image }} style={styles.logo} />
      <View style={{ flex: 1, paddingHorizontal: 10 }}>
        <Text style={styles.name}>{item.description}</Text>
        <View style={styles.row}>
          <Entypo name="location-pin" size={14} color="#004080" />
          <Text style={styles.infoText}>{item.location}</Text>
        </View>
        <View style={styles.row}>
          <Entypo name="eye" size={14} color="#004080" />
          <Text style={styles.infoText}>{item.rate}</Text>
        </View>
        <View style={styles.row}>
          <Ionicons name="time-outline" size={14} color="#004080" />
          <Text style={styles.infoText}>{item.time}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => router.push(`/detail/${item.barbershopid}`)}>
        <MaterialIcons name="arrow-forward-ios" size={16} color="#004080" />
      </TouchableOpacity>
    </View>
  );

  const renderFilterButtons = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ alignItems: "center", paddingVertical: 10 }}
    >
      <View style={styles.filterContainer}>
        {[
          { key: 'nearby', label: '📍 Надад ойр' },
          { key: 'rating', label: '✨ Үнэлгээ их' },
          { key: 'tattoo', label: '✏️ Шивээс' },
          { key: 'new', label: '🆕 Шинэ' },
          { key: 'massage', label: '💆 Бариа засал' },
        ].map(({ key, label }) => (
          <TouchableOpacity
            key={key}
            style={[styles.filterBtn, activeFilter === key && styles.activeBtn]}
            onPress={() => handleFilterPress(key)}
          >
            <Text style={[styles.filterText, activeFilter === key && styles.activeText]}>
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f4f6' }}>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.barbershopid.toString()}
        renderItem={renderSalon}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={renderFilterButtons()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    paddingHorizontal: 10,
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
    marginHorizontal: 6,
  },
  activeBtn: {
    backgroundColor: '#1f8a70',
  },
  filterText: {
    fontSize: 14,
    color: '#333',
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
