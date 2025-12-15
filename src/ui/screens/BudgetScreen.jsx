import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import NavBar from '../components/nav-bar';
import { styles } from '../shared/styles';
import useTheme from '../shared/themeSelect';
import {
  loadTransactions,
  addTransaction,
  deleteTransaction,
} from '../../data/DataController';

function Summary({ label, value, color }) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.income, { color }]}>
        ${value.toFixed(2)}
      </Text>
    </View>
  );
}

function TransactionItem({ item, theme, onDelete }) {
  return (
    <View
      style={[
        styles.txItem,
        {
          borderColor: theme.subtitle,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
      ]}
    >
      <Text style={{ color: theme.text, flex: 1 }}>{item.desc}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text
          style={{
            color: item.type === 'income' ? 'green' : 'red',
            marginRight: 15,
            fontWeight: 'bold',
          }}
        >
          {item.type === 'income' ? '+' : '-'}${item.amount.toFixed(2)}
        </Text>
        <TouchableOpacity onPress={() => onDelete(item.id)}>
          <Text style={{ color: 'red', fontWeight: 'bold' }}>X</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function TransactionForm({
  theme,
  desc,
  setDesc,
  amount,
  setAmount,
  type,
  setType,
  onAdd,
}) {
  return (
    <View style={styles.form}>
      <TextInput
        value={desc}
        onChangeText={setDesc}
        placeholder="Description"
        placeholderTextColor={theme.subtitle}
        style={[
          styles.input,
          {
            backgroundColor: theme.card,
            color: theme.text,
            borderWidth: 1,
            borderColor: theme.subtitle,
          },
        ]}
      />

      <TextInput
        value={amount}
        onChangeText={setAmount}
        placeholder="Amount"
        keyboardType="numeric"
        placeholderTextColor={theme.subtitle}
        style={[
          styles.input,
          {
            backgroundColor: theme.card,
            color: theme.text,
            borderWidth: 1,
            borderColor: theme.subtitle,
          },
        ]}
      />

      <View style={styles.typeRow}>
        <TouchableOpacity
          style={[
            styles.typeButton,
            { backgroundColor: theme.card, borderColor: theme.subtitle, borderWidth: 1 },
            type === 'income' && { backgroundColor: theme.accent },
          ]}
          onPress={() => setType('income')}
        >
          <Text
            style={[
              styles.typeText,
              { color: type === 'income' ? '#fff' : theme.text },
            ]}
          >
            Income
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.typeButton,
            { backgroundColor: theme.card, borderColor: theme.subtitle, borderWidth: 1 },
            type === 'expense' && { backgroundColor: theme.accent },
          ]}
          onPress={() => setType('expense')}
        >
          <Text
            style={[
              styles.typeText,
              { color: type === 'expense' ? '#fff' : theme.text },
            ]}
          >
            Expense
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.addBtn, { backgroundColor: theme.accent }]}
        onPress={onAdd}
      >
        <Text style={styles.addText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function BudgetScreen() {
  const { theme } = useTheme();

  const [transactions, setTransactions] = useState([]);
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('income');

  useEffect(() => {
    loadTransactions().then(setTransactions);
  }, []);

  const { income, expenses, balance } = useMemo(() => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      income,
      expenses,
      balance: income - expenses,
    };
  }, [transactions]);

  const handleAdd = async () => {
    if (!desc || !amount) return;

    const tx = {
      id: Date.now().toString(),
      desc,
      amount: parseFloat(amount),
      type,
      date: new Date().toISOString().split('T')[0],
    };

    setTransactions(await addTransaction(tx));
    setDesc('');
    setAmount('');
  };

  const handleDelete = async (id) => {
    setTransactions(await deleteTransaction(id));
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <NavBar active="Budget" theme={theme} />

      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.heading, { color: theme.accent }]}>
          Monthly Budget Overview
        </Text>

        <Text style={[styles.balance, { color: theme.text }]}>
          Total Balance:{' '}
          <Text style={{ color: balance >= 0 ? 'green' : 'red' }}>
            ${balance.toFixed(2)}
          </Text>
        </Text>

        <View style={styles.row}>
          <Summary label="Income" value={income} color="green" />
          <Summary label="Expenses" value={expenses} color="red" />
        </View>

        <TransactionForm
          theme={theme}
          desc={desc}
          setDesc={setDesc}
          amount={amount}
          setAmount={setAmount}
          type={type}
          setType={setType}
          onAdd={handleAdd}
        />

        <Text style={[styles.txTitle, { color: theme.text }]}>
          Recent Transactions
        </Text>

        <FlatList
          data={transactions}
          keyExtractor={item => item.id}
          ListEmptyComponent={
            <Text style={[styles.empty, { color: theme.subtitle }]}>
              No transactions yet
            </Text>
          }
          renderItem={({ item }) => (
            <TransactionItem
              item={item}
              theme={theme}
              onDelete={handleDelete}
            />
          )}
        />
      </View>
    </View>
  );
}
