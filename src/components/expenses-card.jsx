import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ExpensesCard({ expense }) {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{expense.title}</Text>
            <Text style={styles.amount}>${expense.amount}</Text>
            <Text style={styles.date}>{expense.date}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        elevation: 2,
        marginVertical: 8,
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
