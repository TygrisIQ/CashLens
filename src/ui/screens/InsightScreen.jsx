import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import useTheme from '../shared/themeSelect';

import useTransactionStats from '../../hooks/useTransactionsStats';
import useTransactions from '../../hooks/useTransactions';
export default function InsightsScreen() {
  const { theme } = useTheme();
  const { transactions } = useTransactions();
  const { income, expenses, balance } = useTransactionStats(transactions);

  const avgDailySpend =
    expenses > 0 ? expenses / 30 : 0;

  const biggestExpense =
    transactions
      .filter(t => t.type === 'expense')
      .sort((a, b) => b.amount - a.amount)[0];

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20 }}
      >
        <Text
          style={{
            fontSize: 26,
            fontWeight: '800',
            paddingTop: 60,
            color: theme.text,
            marginBottom: 6,
          }}
        >
          Insights
        </Text>

        <Text
          style={{
            color: theme.subtitle,
            marginBottom: 20,
          }}
        >
          Understand your spending habits
        </Text>

        <InsightCard
          title="Net Balance"
          value={`$${balance.toFixed(2)}`}
          color={balance >= 0 ? '#2ecc71' : '#e74c3c'}
          theme={theme}
        />

        <Row>
          <MiniCard
            label="Income"
            value={`$${income.toFixed(2)}`}
            color="#2ecc71"
            theme={theme}
          />
          <MiniCard
            label="Expenses"
            value={`$${expenses.toFixed(2)}`}
            color="#e74c3c"
            theme={theme}
          />
        </Row>

        <InsightCard
          title="Average Daily Spending"
          value={`$${avgDailySpend.toFixed(2)}`}
          theme={theme}
        />

        <InsightCard
          title="Largest Expense"
          value={
            biggestExpense
              ? `${biggestExpense.desc} — $${biggestExpense.amount.toFixed(2)}`
              : 'No expenses yet'
          }
          theme={theme}
        />

        <InsightCard
          title="Total Transactions"
          value={transactions.length}
          theme={theme}
        />
      </ScrollView>
    </View>
  );
}

function InsightCard({ title, value, theme, color }) {
  return (
    <View
      style={{
        backgroundColor: theme.card,
        padding: 18,
        borderRadius: 16,
        marginBottom: 16,
      }}
    >
      <Text
        style={{
          color: theme.subtitle,
          fontSize: 12,
          marginBottom: 6,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          color: color || theme.text,
          fontSize: 20,
          fontWeight: '700',
        }}
      >
        {value}
      </Text>
    </View>
  );
}

function MiniCard({ label, value, theme, color }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.card,
        padding: 16,
        borderRadius: 14,
        marginHorizontal: 6,
      }}
    >
      <Text
        style={{
          color: theme.subtitle,
          fontSize: 12,
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          color,
          fontSize: 18,
          fontWeight: '700',
          marginTop: 4,
        }}
      >
        {value}
      </Text>
    </View>
  );
}

function Row({ children }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginBottom: 16,
      }}
    >
      {children}
    </View>
  );
}
