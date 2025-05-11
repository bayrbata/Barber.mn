// screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const MenuItem = ({ icon, text, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.iconContainer}>{icon}</View>
    <Text style={styles.menuText}>{text}</Text>
    <MaterialIcons name="keyboard-arrow-right" size={24} color="#999" />
  </TouchableOpacity>
);

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <MenuItem 
          icon={<MaterialIcons name="person" size={24} color="#333" />} 
          text="Профайл" 
          onPress={() => {}} 
        />
        <MenuItem 
          icon={<MaterialIcons name="assignment" size={24} color="#333" />} 
          text="Захиалга" 
          onPress={() => navigation.navigate('history')} 
        />
        <MenuItem 
          icon={<MaterialIcons name="info" size={24} color="#333" />} 
          text="Үйлчилгээний нөхцөл" 
          onPress={() => {}} 
        />
        <MenuItem 
          icon={<MaterialIcons name="logout" size={24} color="#333" />} 
          text="Гарах" 
          onPress={() => navigation.navigate('index')} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef6fb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 16,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  iconContainer: {
    width: 30,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
});
