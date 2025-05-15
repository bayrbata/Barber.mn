import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';

export default function HaircutServices() {
  const { id } = useLocalSearchParams(); 
   const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory !== null) {
      fetchServices(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/apibarber/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "getuilchilgeecat", barbershop_id: id }),
      });

      const json = await res.json();
      if (json.resultCode === 200) {
        setCategories(json.data);
        const firstCategoryId = json.data[0].uilchilgeecategoryid;
        setSelectedCategory(firstCategoryId);
        fetchServices(firstCategoryId);
      }
    } catch (e) {
      console.error("Category fetch error:", e);
    }
  };

  const fetchServices = async (categoryId: number) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/apibarber/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "getuilchilgeebyid",
          uilchilgeecategoryid: categoryId,
        }),
      });

      const json = await res.json();
      if (json.resultCode === 200) {
        setServices(json.data);
      } else {
        setServices([]);
      }
    } catch (e) {
      console.error("Service fetch error:", e);
    }
  };

  return (
  <ScrollView style={styles.container}>
    {/* Категори табууд */}
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

    {/* Үйлчилгээний жагсаалт */}
    <View style={{ marginTop: 16 }}>
      {services.map((service) => (
        <TouchableOpacity
          key={service.uilchilgeeid}
          onPress={() => router.push(`/serdetail/${service.uilchilgeeid}`)}
          style={{
            backgroundColor: '#ffffff',
            padding: 16,
            borderRadius: 16,
            marginBottom: 16,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 10,
            elevation: 4,
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{ fontSize: 16, fontWeight: '600', flex: 1 }}
            >
              {service.uilchilgeename}
            </Text>
            <Text style={{ fontSize: 16, fontWeight: '600' }}>
              {service.une.toLocaleString()}₮
            </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{ color: '#777', marginTop: 4 }}
          >
            {service.uilchilgeedescription}
          </Text>
          <Text style={{ color: '#999', marginTop: 8, fontSize: 13 }}>
            {service.hugatsaa} 
          </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>

  </ScrollView>
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
  serviceCard: {
    backgroundColor: "#F9FAFB",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 13,
    color: "#4B5563",
    marginBottom: 4,
  },
  servicePrice: {
    fontSize: 13,
    color: "#111827",
  },
  serviceDuration: {
    fontSize: 13,
    color: "#6B7280",
  },
});
