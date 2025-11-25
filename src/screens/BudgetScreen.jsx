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

const styles = StyleSheet.create({
  container: { backgroundColor: "#f4f6f8", flex: 1 },
  card: {
    margin: 20,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  heading: {
    color: "#0d6efd",
    textAlign: "center",
    fontSize: 22,
    marginBottom: 20,
  },
  balance: { fontSize: 18, textAlign: "center" },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  label: { color: "#777", textAlign: "center" },
  income: { color: "green", fontSize: 20, textAlign: "center" },
  expenses: { color: "red", fontSize: 20, textAlign: "center" },
  form: { marginBottom: 20 },
  input: {
    backgroundColor: "#eee",
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
  },
  typeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  typeButton: {
    flex: 1,
    backgroundColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  activeType: {
    backgroundColor: "#0d6efd",
  },
  typeText: { color: "white", textAlign: "center" },
  addBtn: {
    backgroundColor: "navy",
    padding: 12,
    borderRadius: 8,
    marginTop: 6,
  },
  addText: { color: "white", textAlign: "center", fontSize: 16 },
  txTitle: { fontSize: 18, color: "#555", marginTop: 10 },
  empty: {
    textAlign: "center",
    color: "#888",
    marginVertical: 20,
  },
  txItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
});
