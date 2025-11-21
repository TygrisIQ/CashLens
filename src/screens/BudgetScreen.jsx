import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import NavBar from '../components/nav-bar';

export default function BudgetScreen() {

    const [transactions, setTransactions] = useState([]);
    const [desc, setDesc] =useState('');
    const  [amount, setAmount] = useState('');
    const [type, setType] = useState('income');

    const income = transactions
        .filter(t => t.type === 'income')
        .reduce((a, b) => a + parseFloat(b.amount), 0);

    const expenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((a, b) => a + parseFloat(b.amount), 0);

    const balance = income - expenses;

    const addTransaction = () => {
        if (!desc || !amount) return;

    const newTransaction = {
        id: transactions.length + 1,
        description: desc,
        amount: parseFloat(amount),
        type,
    };

    setTransactions([...transactions, newTransaction]);
    setDesc('');
    setAmount('');
    setType('income');
};

    return (
        <View style={styles.container}>
            <NavBar active="Budget" />

            <View style={styles.card}>
                <Text style={styles.heading}>Budget Overview</Text>
                <Text style={styles.balance}>
                    Balance:{" "}
                    <Text style={{ color: balance >= 0 ? 'green' : 'red' }}>
                        ${balance.toFixed(2)}
                    </Text>
                </Text>

                <View style={styles.row}>
                    <View>
                        <Text style={styles.label}>Total Income</Text>
                        <Text style={styles.income}>${income.toFixed(2)}</Text>
                    </View>

                    <View>
                        <Text style={styles.label}>Total Expenses</Text>
                        <Text style={styles.expenses}>${expenses.toFixed(2)}</Text>
                    </View>
                </View>

                <View style={styles.form}>
                    <TextInput
                        value={desc}
                        onChangeText={setDesc}
                        placeholder="Description"
                        style={styles.input}
                    />
                    <TextInput
                        value={amount}
                        onChangeText={setAmount}
                        placeholder="Amount"
                        style={styles.input}
                        keyboardType="numeric"
                    />
                    <View>
                        <TouchableOpacity
                            style={[styles.typeButton, type === 'income' && styles.activeType]}
                            onPress={() => setType('income')}
                        >
                            <Text>Income</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.typeButton, type === 'expense' && styles.activeType]}
                            onPress={() => setType('expense')}
                        >
                            <Text>Expense</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 20,
        width: '50%',
        alignSelf: 'center',
    },
});