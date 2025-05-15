import { useLocalSearchParams } from 'expo-router';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function ServiceDetail(){
  const { id } = useLocalSearchParams();
  const [service, setService] = useState(null);

  const baseURL = 'http://127.0.0.1:8000/';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/apibarber/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'getcatuilbyid',
            barbershopid: id,
          }),
        });

        const result = await response.json();
        if (result.resultCode === 200) {
          setService(result.data);
        } else {
          console.warn(result.resultMessage);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchData();
  }, [id]);

  if (!service) return <Text style={styles.loadingText}>Уншиж байна...</Text>;

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: `${baseURL}${service.image}` }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.titleRow}>
        <Text style={styles.titleText}>{service.uilchilgeename}</Text>
        <Text style={styles.titleText}>{service.une}₮</Text>
      </View>
      <View style={styles.underline} />
      <Text style={styles.description}>{service.uilchilgeedescription}</Text>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Үргэлжлэх хугацаа:</Text>
        <Text>{service.hugatsaa}</Text>
      </View>
      <View style={styles.underline} />
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Урьдчилгаа төлбөр:</Text>
        <Text>{Number(service.uridchilgaa_tolbor).toLocaleString()}₮</Text>
      </View>

      <View style={styles.paymentNoteContainer}>
        <View style={styles.iconCircle}>
          <Ionicons name="cash-outline" size={24} color="green" />
        </View>
        <View style={styles.paymentNoteBox}>
          <Text style={styles.paymentNoteText}>
            Та урьдчилгаа төлбөрөө төлснөөр таны цаг баталгаажих ба үйлчилгээ авсны дараа тус дүн нь төлөх нийт үнийн дүнгээс хасагдаж тооцогдоно.
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            console.log('Цаг сонгох товч дарагдлаа');
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Цаг сонгох</Text>
          <Ionicons
            name="arrow-forward"
            size={20}
            color="white"
            style={styles.buttonIcon}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loadingText: {
    padding: 16,
    fontSize: 16,
    textAlign: 'center',
  },
  container: {
    padding: 16,
  },
  image: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 12,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  underline: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 12,
  },
  description: {
    fontSize: 16,
    color: '#888',
    marginTop: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  infoLabel: {
    fontWeight: 'bold',
  },
  paymentNoteContainer: {
    marginTop: 24,
    alignItems: 'center',
    position: 'relative',
  },
  iconCircle: {
    position: 'absolute',
    top: -20,
    zIndex: 2,
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 4,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  paymentNoteBox: {
    marginTop: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 16,
    backgroundColor: '#f8f8f8',
    width: '100%',
  },
  paymentNoteText: {
    fontSize: 13,
    color: '#3f3f3f',
    textAlign: 'center',
    lineHeight: 20,
  },
  buttonContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonIcon: {
    marginLeft: 8,
  },
});


