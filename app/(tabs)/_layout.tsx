import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons'; // アイコンのインポート例

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index" // app/(tabs)/index.tsx に対応
        options={{
          title: 'ホーム',
          tabBarIcon: ({ color }) => <MaterialIcons name="home" color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="explore" // app/(tabs)/explore.tsx に対応
        options={{
          title: '探索',
          tabBarIcon: ({ color }) => <MaterialIcons name="search" color={color} size={24} />,
        }}
      />
      {/* その他のタブを追加 */}
    </Tabs>
  );
}