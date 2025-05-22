import {
  View,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Text,
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
    <View style={styles.fullscreenContainer}>
      <ImageBackground
        source={{
          uri: barberData?.image
            ? base_URL + barberData.image
            : 'https://via.placeholder.com/300x200',
        }}
        style={styles.fullscreenImage}
        resizeMode="cover"
      >
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Title and Buttons */}
        <View style={styles.overlay}>
          <Text style={styles.title}>{barberData?.description}</Text>
          <View style={styles.underline} />
          <Text style={styles.subtitle}>{barberData?.descriptionimage}</Text>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.button} onPress={() => router.push(`/service/${barberData.barbershopid}`)}>
              <Text style={styles.buttonText}>Үйлчилгээ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => router.push(`/about/${id}`)}>
              <Text style={styles.buttonText}>Бидний тухай</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  fullscreenContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  fullscreenImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
backButton: {
  position: 'absolute',
  top: 12,
  left: 12,
  backgroundColor: 'rgba(0,0,0,0.5)',
  padding: 8,
  borderRadius: 24,
  zIndex: 10,
  borderColor: '#fff',  
  borderWidth: 1,   
},
overlay: {
  flex: 1,
  justifyContent: 'center', // босоогоор голд
  alignItems: 'center',     // хөндлөнгөөр голд
  paddingHorizontal: 20,
},
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
  },
  underline: {
  width: '100%',
  height: 1,
  backgroundColor: '#fff',
  marginTop: 6,
  marginBottom: 10,
},
  
 footer: {
  position: 'absolute',
  bottom: 60, // доош нь байрлуулах
  left: 20,
  right: 20,
  alignItems: 'center',
  justifyContent: 'center',
},

button: {
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  borderColor: '#fff',
  borderWidth: 1,
  borderRadius: 25,
  paddingVertical: 12,
  paddingHorizontal: 40,
  marginVertical: 5,
  width: '100%',
  alignItems: 'center',
},

buttonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: '600',
},

  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eaf4f8',
  },
});
