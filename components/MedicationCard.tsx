import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

type Medication = {
  id: string;
  name: string;
  time: string;
};

type Props = {
  medication: Medication;
  onDelete: () => void;
};

export default function MedicationCard({
  medication,
  onDelete,
}: Props) {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.name}>
          {medication.name}
        </Text>

        <Text style={styles.time}>
          Hora: {medication.time}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={onDelete}
      >
        <Text style={styles.deleteText}>
          Eliminar
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  time: {
    marginTop: 5,
    color: '#666',
  },

  deleteButton: {
    backgroundColor: '#E74C3C',
    padding: 10,
    borderRadius: 8,
  },

  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});