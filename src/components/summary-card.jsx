import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SummaryCard({ label, value, color }) {
    return (
        <View style={styles.card}>
            <Text style={styles.label}>
                {label}
            </Text>
            <Text style={[styles.value, { color }]}>
                {value}
            </Text>
        </View>
  ); 
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    label: {
        fontSize: 16,
        color: '#666',
        marginBottom: 8,

    },
    value: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});
