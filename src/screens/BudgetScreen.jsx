import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

import NavBar from "../components/nav-bar";

import {styles} from "../ui/shared/styles";
export default function BudgetScreen() {
  const [transactions, setTransactions] = useState([]);
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

  const balance = income - expenses;

  const addTransaction = () => {
    if (!desc || !amount) return;

    const newTx = {
      id: Date.now().toString(),
      desc,
      amount: parseFloat(amount),
      type,
    };

    setTransactions([newTx, ...transactions]);
    setDesc("");
    setAmount("");
    if (type === "income") {
      setIncome(income + newTx.amount);
    } else {
      setExpenses(expenses + newTx.amount);
    }
  };

  return (
    <View style={styles.container}>
      <NavBar active="budget" />

      <View style={styles.card}>
        <Text style={styles.heading}>Monthly Budget Overview</Text>

        <Text style={styles.balance}>
          Total Balance:{" "}
          <Text style={{ color: balance >= 0 ? "green" : "red" }}>
            ${balance.toFixed(2)}
          </Text>
        </Text>

        <View style={styles.row}>
          <View>
            <Text style={styles.label}>Income</Text>
            <Text style={styles.income}>${income.toFixed(2)}</Text>
          </View>
          <View>
            <Text style={styles.label}>Expenses</Text>
            <Text style={styles.expenses}>${expenses.toFixed(2)}</Text>
          </View>
        </View>

        {/* Form */}
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
            keyboardType="numeric"
            style={styles.input}
          />

          <View style={styles.typeRow}>
            <TouchableOpacity
              style={[styles.typeButton, type === "income" && styles.activeType]}
              onPress={() => setType("income")}
            >
              <Text style={styles.typeText}>Income</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.typeButton, type === "expense" && styles.activeType]}
              onPress={() => setType("expense")}
            >
              <Text style={styles.typeText}>Expense</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.addBtn} onPress={addTransaction}>
            <Text style={styles.addText}>Add</Text>
          </TouchableOpacity>
        </View>

        {/* Transactions */}
        <Text style={styles.txTitle}>Recent Transactions</Text>
        {transactions.length === 0 ? (
          <Text style={styles.empty}>No transactions yet</Text>
        ) : (
          <FlatList
            data={transactions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.txItem}>
                <Text>{item.desc}</Text>
                <Text style={{ color: item.type === "income" ? "green" : "red" }}>
                  {item.type === "income" ? "+" : "-"}${item.amount.toFixed(2)}
                </Text>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
}


