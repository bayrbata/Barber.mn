import { Tabs } from 'expo-router';
import { Ionicons, MaterialIcons  } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#000',
        tabBarLabelPosition: 'beside-icon', // Бичвэрийг icon-ийн хажууд гаргана
        tabBarShowLabel: true, // Бичвэр харагдах ёстой
        tabBarIconStyle: {
          marginRight: -4, // icon болон бичвэрийг ойртуулах
        },
        tabBarLabelStyle: {
          fontSize: 14,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Нүүр',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'Захиалга',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="assignment" size={28} color="#333" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Профайл',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
