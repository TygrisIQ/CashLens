import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ExpensesCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Expenses</Text>
      <Text style={styles.amount}>$0.00</Text>
      <Text style={styles.date}>01/01/2024</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    width: '50%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  amount: {
    fontSize: 16,
    color: 'green',
  },
  date: {
    fontSize: 14,
    color: 'gray',
  },
});
