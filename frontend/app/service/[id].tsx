import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams } from 'expo-router';
export default function HaircutServices() {
  const { id } = useLocalSearchParams(); //id avaad uur2 category haruulah
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/apibarber/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "getuilchilgeecat",barbershop_id :id }),
      });

      const json = await res.json();
      if (json.resultCode === 200) {
        setCategories(json.data);
        setSelectedCategory(json.data[0].uilchilgeecategoryid); // default эхний категори
      }
    } catch (e) {
      console.error("Category fetch error:", e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Үйлчилгээ</Text>

      {/* Категори таб хэсэг */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryScroll}
      >
        <View style={{ flexDirection: "row" }}>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.uilchilgeecategoryid;
            return (
              <TouchableOpacity
                key={cat.uilchilgeecategoryid}  
                onPress={() => setSelectedCategory(cat.uilchilgeecategoryid)}
                style={[
                  styles.categoryButton,
                  isSelected ? styles.selectedCategory : styles.unselectedCategory,
                ]}
              >
                <Text
                  style={
                    isSelected ? styles.selectedText : styles.unselectedText
                  }
                >
                  {cat.categoryname.trim()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  categoryScroll: {
    paddingHorizontal: 4,
    paddingVertical: 6,
  },
  categoryButton: {
    height: 36, 
    paddingHorizontal: 16,
    borderRadius: 18,
    borderWidth: 1,
    marginRight: 8,
    alignItems: "center",       
    justifyContent: "center",   
  },
  selectedCategory: {
    backgroundColor: "#047857",
    borderColor: "#047857",
  },
  unselectedCategory: {
    backgroundColor: "#F3F4F6",
    borderColor: "#E5E7EB",
  },
  selectedText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 13,
    lineHeight: 16, 
  },
  unselectedText: {
    color: "#374151",
    fontSize: 13,
    lineHeight: 16,
  },
});

