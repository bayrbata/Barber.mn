import {
  View,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/apibarber/';
const base_URL = 'http://127.0.0.1:8000/';

export default function BarberDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [barberData, setBarberData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
 


  const fetchBarberById = async () => {
    try {
      setError('');
      const res = await axios.post(API_URL, {
        action: 'getbarberbyid',
        barbershopid: id,
      });

      if (res.data && res.data.data) {
        setBarberData(res.data.data);
      } else {
        setError('Мэдээлэл олдсонгүй.');
      }
    } catch (err) {
      console.error('Алдаа:', err);
      setError('Сервертэй холбогдож чадсангүй.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBarberById();
  }, [id]);

  const workingHours = [
    { day: 'Ням', time: '11:00 - 20:00' },
    { day: 'Даваа', time: '11:00 - 20:00' },
    { day: 'Мягмар', time: '10:00 - 20:00' },
    { day: 'Лхагва', time: '10:00 - 20:00' },
    { day: 'Пүрэв', time: '10:00 - 20:00' },
    { day: 'Баасан', time: '10:30 - 20:00' },
    { day: 'Бямба', time: '10:00 - 20:00' },
  ];

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#004080" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ImageBackground
        source={{
          uri: barberData?.image
            ? base_URL + barberData.image
            : 'https://via.placeholder.com/300x200',
        }}
        style={styles.fullscreenImage}
        resizeMode="cover"
      >
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={30} color="#fff" />
        </TouchableOpacity>
      </ImageBackground>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Бидний тухай</Text>
        <Text style={styles.description}>
          {barberData?.descriptionimage}
        </Text>

        <View style={styles.underline} />

        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={20} color="#004080" />
          <Text style={styles.locationText}>
            Хаяг: {barberData?.location || 'Хаяг оруулаагүй байна'}
          </Text>
        </View>

        <View style={styles.scheduleContainer}>
          <Text style={styles.scheduleTitle}>Цагийн хуваарь</Text>
          {workingHours.map((item, index) => (
            <View key={index} style={styles.scheduleRow}>
              <Text style={styles.scheduleDay}>{item.day}</Text>
              <Text style={styles.scheduleTime}>{item.time}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fullscreenImage: {
    width: '100%',
    height: 200,
    justifyContent: 'flex-start',
  },
  backButton: {
    marginTop: 40,
    marginLeft: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 25,
    borderColor: '#fff',
    borderWidth: 1,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004080',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
  },
  underline: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  locationText: {
    fontSize: 14,
    marginLeft: 8,
    color: '#004080',
  },
  scheduleContainer: {
    backgroundColor: '#f1f5f9',
    borderRadius: 10,
    padding: 15,
  },
  scheduleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004080',
    marginBottom: 10,
  },
  scheduleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  scheduleDay: {
    fontSize: 14,
    color: '#333',
  },
  scheduleTime: {
    fontSize: 14,
    color: '#333',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});