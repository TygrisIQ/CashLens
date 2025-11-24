import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native';
import NavBar from '../components/nav-bar';

export default function BudgetScreen() {

    const [transactions, setTransactions] = useState([]);
    const [desc, setDesc] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('income');

    const income = transactions
        .filter(t => t.type === 'income')
        .reduce((a, b) => a + parseFloat(b.amount || 0), 0);

    const expenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((a, b) => a + parseFloat(b.amount || 0), 0);

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
                    <View style={styles.typeRow}>
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

                    <TouchableOpacity style={styles.button} onPress={addTransaction}>
                        <Text style={styles.buttonText}>Add Transaction</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.heading}>Recent Transactions</Text>
                {transactions.length === 0 ? (
                    <Text style={styles.empty}>No transactions yet.</Text>
                ) : (
                    <FlatList
                        data={transactions}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.transaction}>
                                <Text style={styles.transactionDesc}>{item.description}</Text>
                                <Text style={{ color: item.type === 'income' ? 'green' : 'red' }}>
                                    {item.type === 'income' ? '+' : '-'}${Number(item.amount).toFixed(2)}
                                </Text>
                            </View>
                        )}
                    />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: 40,
    },
    card: {
        backgroundColor: '#fff',
        margin: 16,
        padding: 16,
        borderRadius: 8,
        elevation: 2,
    },
    heading: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
    },
    balance: {
        fontSize: 16,
        marginBottom: 12,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    label: {
        fontSize: 12,
        color: '#666',
    },
    income: {
        color: 'green',
        fontSize: 16,
    },
    expenses: {
        color: 'red',
        fontSize: 16,
    },
    form: {
        marginVertical: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 8,
        marginBottom: 8,
        borderRadius: 4,
    },
    typeRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 8,
    },
    typeButton: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        minWidth: 100,
        alignItems: 'center',
    },
    activeType: {
        backgroundColor: '#e6f7ff',
        borderColor: '#91d5ff',
    },
    button: {
        padding: 12,
        width: '50%',
        alignSelf: 'center',
        backgroundColor: '#007bff',
        borderRadius: 6,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
    empty: {
        textAlign: 'center',
        color: '#666',
        paddingVertical: 8,
    },
    transaction: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    transactionDesc: {
        flex: 1,
    },
});