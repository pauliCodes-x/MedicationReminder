import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
 Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import * as Notifications from 'expo-notifications';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'AddMedication'
>;

export default function AddMedicationScreen({
  navigation,
}: Props) {
  const [name, setName] = useState('');
  const [time, setTime] = useState('');

  const saveMedication = async () => {
    if (!name || !time) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
  }

  const hour = Number(time);

  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

  if (!timeRegex.test(time)) {
    Alert.alert(
      'Error',
      'Ingresa una hora válida (HH:MM)'
    );
    return;
  }

  const newMedication = {
    id: Date.now().toString(),
    name,
    time,
  };

    const stored =
      await AsyncStorage.getItem('medications');

    const medications = stored
      ? JSON.parse(stored)
      : [];

    medications.push(newMedication);

    await AsyncStorage.setItem(
      'medications',
      JSON.stringify(medications)
    );

    await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Recordatorio 💊',
      body: `Es hora de tomar ${name}`,
    },
      trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 10,
    },
  });
    console.log('Notificación programada test');

    Alert.alert('Éxito', 'Medicación agregada');

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Nueva medicación
      </Text>

      <TextInput
        placeholder="Nombre"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

<TextInput
  placeholder="Hora (ej: 08:30)"
  style={styles.input}
  keyboardType="numbers-and-punctuation"
  value={time}
  onChangeText={setTime}
/>

      <TouchableOpacity
        style={styles.button}
        onPress={saveMedication}
      >
        <Text style={styles.buttonText}>
          Guardar
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#F5F7FB',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },

  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },

  button: {
    backgroundColor: '#43B97F',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});