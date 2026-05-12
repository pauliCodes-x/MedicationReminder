import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import MedicationCard from '../components/MedicationCard';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;

type Medication = {
  id: string;
  name: string;
  time: string;
};

export default function HomeScreen({ navigation }: Props) {
  const [medications, setMedications] = useState<Medication[]>([]);

  const loadMedications = async () => {
    const data = await AsyncStorage.getItem('medications');

    if (data) {
      setMedications(JSON.parse(data));
    }
  };

  const deleteMedication = async (id: string) => {
    const updated = medications.filter(
      (item) => item.id !== id
    );

    setMedications(updated);

    await AsyncStorage.setItem(
      'medications',
      JSON.stringify(updated)
    );
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener(
      'focus',
      () => {
        loadMedications();
      }
    );

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('AddMedication')
        }
      >
        <Text style={styles.buttonText}>
          Agregar medicación
        </Text>
      </TouchableOpacity>

      <FlatList
        data={medications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MedicationCard
            medication={item}
            onDelete={() =>
              deleteMedication(item.id)
            }
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No hay medicaciones
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F7FB',
  },

  button: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  empty: {
    textAlign: 'center',
    marginTop: 50,
    color: '#777',
  },
});