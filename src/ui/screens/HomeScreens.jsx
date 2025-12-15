import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';

import ProgressBar from '../components/progress-bar';
import SummaryCard from '../components/summary-card';

import { styles } from '../shared/styles';
import useTheme from '../shared/themeSelect';
import { loadTransactions } from '../../data/DataController';

export default function HomeScreen() {
  const { theme } = useTheme();

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    loadTransactions().then(setTransactions);
  }, []);

  const { income, expenses, savings, percentageRemaining } = useMemo(() => {
    const income = transactions
      .filter(tx => tx.type === 'income')
      .reduce((sum, tx) => sum + (tx.amount || 0), 0);

    const expenses = transactions
      .filter(tx => tx.type === 'expense')
      .reduce((sum, tx) => sum + (tx.amount || 0), 0);

    const savings = income - expenses;

    const percentageRemaining =
      income > 0
        ? Math.max(
            0,
            Math.min(100, Math.round(((income - expenses) / income) * 100))
          )
        : 100;

    return { income, expenses, savings, percentageRemaining };
  }, [transactions]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      

      <ScrollView
        style={[styles.scrollView, { backgroundColor: theme.background }]}
        contentContainerStyle={styles.contentContainer}
      >
        <View
          style={[
            styles.header,
            { width: '100%', paddingHorizontal: 20, backgroundColor: theme.card },
          ]}
        >
          <Text style={[styles.title, { color: theme.text }]}>CashLens</Text>
          <Text style={[styles.subtitle, { color: theme.subtitle }]}>
            Track your spending!
          </Text>
        </View>

        <View style={{ width: '100%', paddingHorizontal: 20, marginBottom: 30 }}>
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

        <View style={{ width: '100%', paddingHorizontal: 20, marginBottom: 30 }}>
          <ProgressBar
            label="Savings Remaining"
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
