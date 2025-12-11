import { View, Text, ScrollView } from 'react-native';
import NavBar from '../components/nav-bar';
import ProgressBar from '../components/progress-bar';
import SummaryCard from '../components/summary-card';
import ActionButton from '../components/action-button';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// theme & styles
import { styles } from '../ui/shared/styles';
import useTheme from '../ui/shared/themeSelect';

export default function HomeScreen() {

  const { theme, themeName, setThemeName } = useTheme();

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
      const loadData = async () => {
        try {
          const savedData = await AsyncStorage.getItem("transactions");
          if (savedData) {
            setTransactions(JSON.parse(savedData));
          }
        } catch (error) {
          console.error("Failed to load data:", error);
        }
      };
      loadData();
  }, []);

  const income = (transactions || [])
    .filter(tx => tx.type === 'income')
    .reduce((sum, tx) => sum + (tx.amount || 0), 0);

  const expenses = (transactions || [])
    .filter(tx => tx.type === 'expense')
    .reduce((sum, tx) => sum + (tx.amount || 0), 0);

  const handleSubmit = () => {
    if (!description.trim() || !amount || isNaN(parseFloat(amount))) return;

    const newAmount = parseFloat(amount);
    const newTransaction = {
      id: Date.now().toString(),
      description: description.trim(),
      amount: newAmount,
      type,
    };

    onAddTransaction(newTransaction);
    setDescription('');
    setAmount('');
    setImmediate(new Date().toDateString());
  };

  const savings = income - expenses;
  const percentageRemaining = income > 0 ? Math.max(0, Math.min(100, Math.round(((income - expenses) / income) * 100))) : 100;

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      
      
      <NavBar active="Home" theme={theme} />

      <ScrollView
        style={[styles.scrollView, { backgroundColor: theme.background }]}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={[styles.header, { backgroundColor: theme.card }]}>
          <Text style={[styles.title, { color: theme.text }]}>CashLens</Text>
          <Text style={[styles.subtitle, { color: theme.subtitle }]}>
            Track your spending, save smarter and reach your goals!
          </Text>
        </View>

        <View style={{ width: "100%", paddingHorizontal: 20, marginBottom: 30 }}>  
          <View style={{ marginBottom: 15 }}>
             <SummaryCard 
                label="Current Savings" 
                value={`$${savings.toFixed(2)}`} 
                color={theme.accent} 
                theme={theme} 
             />
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ width: '48%' }}>
               <SummaryCard 
                  label="Income" 
                  value={`$${income.toFixed(2)}`} 
                  color="green" 
                  theme={theme} 
               />
            </View>
            <View style={{ width: '48%' }}>
               <SummaryCard 
                  label="Expenses" 
                  value={`$${expenses.toFixed(2)}`} 
                  color="red" 
                  theme={theme} 
               />
            </View>
            
          </View>
        </View>
        <View>
          <ProgressBar
            label="Budget Remaining"
            percentage={percentageRemaining}
          />
        </View>

        
        <Text style={[styles.footer, { color: theme.subtitle }]}>
          © 2025 CashLens. All rights reserved.
        </Text>

      </ScrollView>
    </View>
  );
}
