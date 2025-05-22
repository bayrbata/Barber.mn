import { Tabs } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#000',
        tabBarLabelPosition: 'beside-icon', // Icon-ийн хажууд бичвэр
        tabBarShowLabel: true,
        tabBarIconStyle: {
          marginRight: -4,
        },
        tabBarLabelStyle: {
          fontSize: 14,
        },
        headerTitleAlign: 'center', // Гарчгийг төвд байршуулах
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
            <MaterialIcons name="assignment" size={28} color={color} />
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
       <Tabs.Screen
    name="service/[id]"
    options={{
      title: 'Үйлчилгээ',
      href: null, // tab-аас устгах
      tabBarStyle: { display: 'none' }, // tab-ыг нуух
    }}
  />
    </Tabs>
  );
}
