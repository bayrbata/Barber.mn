import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function OrderScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Урьдчилгаа төлсөн</Text>
      </TouchableOpacity>
      {/* <View style={styles.emptyBox}>
        <MaterialIcons name="assignment" size={60} color="#ccc" />
      </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf3f3',
    alignItems: 'center',
    paddingTop: 40,
  },
  header: {
    position: 'absolute',
    top: 10,
    right: 20,
  },
  time: {
    fontSize: 14,
    color: '#000',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#3f7e59',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginBottom: 30,
    alignSelf: 'flex-start',
    marginLeft:20 
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  emptyBox: {
    width: 150,                     // өргөн
    height: 150, 
    backgroundColor: '#f0f0f0',      // саарал дэвсгэр
    padding: 20,                     // дотоод зай
    borderRadius: 12,               // булангийн дугуйлалт
    borderWidth: 1,                 // хүрээ
    borderColor: '#d0d0d0',         // хүрээний өнгө
    shadowColor: '#000',            // сүүдэр (заавал биш)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,                   // Android дээр сүүдэр
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:50,
    alignSelf: 'flex-start',
  },
  emptyText: {
    marginTop: 10,
    color: '#aaa',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    height: 70,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f0f2f2',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    paddingBottom: 10,
  },
  navText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#333',
  },
});
