import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";

import NavBar from "../components/nav-bar";
import { styles } from "../ui/shared/styles";
import useTheme from "../ui/shared/themeSelect";

export default function BudgetScreen() {
  const { theme } = useTheme();

  // Load transactions from AsyncStorage on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedData = await AsyncStorage.getItem("transactions");
        if (savedData) {
          setTransactions(JSON.parse(savedData));
        }
      } catch (error) {
        console.log("Error loading data:", error);
      }
    };
    loadData();
  }, []);

  const [transactions, setTransactions] = useState([]);
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = income - expenses;

  // Function to add a new transaction
  const addTransaction = async () => {
    if (!desc || !amount) return;

    const newTx = {
      id: Date.now().toString(),
      desc,
      amount: parseFloat(amount),
      type,
      date: new Date().toISOString().split('T')[0]
    };
    
    // create array with new transaction at the front
    const updatedTransactions = [newTx, ...transactions];

    setTransactions(updatedTransactions);
     
    try {
      await AsyncStorage.setItem("transactions", JSON.stringify(updatedTransactions));
    } catch (error) {
      console.log("Error saving data:", error);
    }

    setDesc("");
    setAmount("");
  };

  // Delete transaction function 

  const deleteTransaction = async (id) => {
    const updatedTransactions = transactions.filter((t) => t.id !== id);

    //Update the UI 
    setTransactions(updatedTransactions);

    //Update Local Storage
    try {
      await AsyncStorage.setItem("transactions", JSON.stringify(updatedTransactions));
    } catch (error) {
      console.log("Error deleting item:", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>

      {/* NavBar with theme */}
      <NavBar active="Budget" theme={theme} />

      <View style={[styles.card, { backgroundColor: theme.card }]}>

        {/* Monthly Overview */}
        <Text style={[styles.heading, { color: theme.accent }]}>
          Monthly Budget Overview
        </Text>

        <Text style={[styles.balance, { color: theme.text }]}>
          Total Balance:{" "}
          <Text style={{ color: balance >= 0 ? "green" : "red" }}>
            ${balance.toFixed(2)}
          </Text>
        </Text>

        <View style={styles.row}>
          <View>
            <Text style={[styles.label, { color: theme.subtitle }]}>Income</Text>
            <Text style={[styles.income, { color: "green" }]}>
              ${income.toFixed(2)}
            </Text>
          </View>

          <View>
            <Text style={[styles.label, { color: theme.subtitle }]}>Expenses</Text>
            <Text style={[styles.expenses, { color: "red" }]}>
              ${expenses.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Form */}
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
                type === "income" && { backgroundColor: theme.accent },
              ]}
              onPress={() => setType("income")}
            >
              <Text
                style={[
                  styles.typeText,
                  { color: type === "income" ? "#fff" : theme.text },
                ]}
              >
                Income
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.typeButton,
                { backgroundColor: theme.card, borderColor: theme.subtitle, borderWidth: 1 },
                type === "expense" && { backgroundColor: theme.accent },
              ]}
              onPress={() => setType("expense")}
            >
              <Text
                style={[
                  styles.typeText,
                  { color: type === "expense" ? "#fff" : theme.text },
                ]}
              >
                Expense
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.addBtn, { backgroundColor: theme.accent }]}
            onPress={addTransaction}
          >
            <Text style={styles.addText}>Add</Text>
          </TouchableOpacity>
        </View>
        <Text style={[styles.txTitle, { color: theme.text }]}>
          Recent Transactions
        </Text>

        {transactions.length === 0 ? (
          <Text style={[styles.empty, { color: theme.subtitle }]}>
            No transactions yet
          </Text>
        ) : (
          <FlatList
            data={transactions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.txItem,
                  {
                    borderColor: theme.subtitle,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  },
                ]}
              >                  
                            {/* Delete transaction */}
                  <Text style={{ color: theme.text, flex: 1 }}>{item.desc}</Text>
                  <View style ={{ flexDirection: "row", alignItems: "center"}}>
                <Text
                  style={{
                    color: item.type === "income" ? "green" : "red",
                    marginRight: 15,
                    fontWeight: "bold",
                  }}
                >
                  {item.type === "income" ? "+" : "-"}${item.amount.toFixed(2)}
                </Text>
                <TouchableOpacity onPress={() => deleteTransaction(item.id)}>
                  <Text style={{ color: "red", fontWeight: "bold" }}> 
                    X 
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            )}
          />
        )}
      </View>

    </View>
  );
}
