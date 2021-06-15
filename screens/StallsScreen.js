import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AddListScreen from './screens/AddListScreen';

function HomeScreen({ navigation }) {
  const [items, setItems] = React.useState([
    { name: 'TURQUOISE', code: '#1abc9c' },
    { name: 'EMERALD', code: '#2ecc71' },
    { name: 'PETER RIVER', code: '#3498db' },
    { name: 'TURQUOISE', code: '#1abc9c' },
    { name: 'EMERALD', code: '#2ecc71' },
    { name: 'PETER RIVER', code: '#3498db' },
    { name: 'TURQUOISE', code: '#1abc9c' },
    { name: 'EMERALD', code: '#2ecc71' },
    { name: 'PETER RIVER', code: '#3498db' },
    { name: 'TURQUOISE', code: '#1abc9c' },
    { name: 'EMERALD', code: '#2ecc71' },
    { name: 'PETER RIVER', code: '#3498db' },
    { name: 'TURQUOISE', code: '#1abc9c' },
    { name: 'EMERALD', code: '#2ecc71' },
    { name: 'PETER RIVER', code: '#3498db' },
    { name: 'TURQUOISE', code: '#1abc9c' },
    { name: 'EMERALD', code: '#2ecc71' },
    { name: 'PETER RIVER', code: '#3498db' },
  ]);

  function renderItem({ item }) {
    return (
      <TouchableOpacity
          onPress={() => {
          navigation.navigate('Details', { ...item });
        }}>
            <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemCode}>{item.code}</Text>
            </View>
          </TouchableOpacity>
    );
  }

  return (
      <FlatGrid
        itemDimension={130}
        data={items}
        style={styles.gridView}
        // staticDimension={300}
        // fixed
        spacing={10}
        renderItem={renderItem}
      />
  );
}

const Stack = createStackNavigator();

export default function StallsScreen() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Kueh Lapis" component={HomeScreen} />
        <Stack.Screen name="Details" component={AddListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});