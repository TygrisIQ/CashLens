import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';

import ProgressBar from '../components/progress-bar';
import { styles } from '../shared/styles';
import useTheme from '../shared/themeSelect';

import useTransactions from '../../hooks/useTransactions';
import useProfile from '../../hooks/useProfile';
import useTransactionStats from '../../hooks/useTransactionsStats';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { theme } = useTheme();

  const { transactions } = useTransactions();
  const { income, expenses, balance } = useTransactionStats(transactions);
  const { profile } = useProfile();

  const percentageRemaining =
    income > 0
      ? Math.max(0, Math.min(100, Math.round((balance / income) * 100)))
      : 0;

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <View
        style={{
          backgroundColor: theme.card,
          paddingTop: 60,
          paddingHorizontal: 25,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          elevation: 5,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ fontSize: 14, color: theme.subtitle, fontWeight: '500' }}>
              Welcome back,
            </Text>
            <Text style={{ fontSize: 28, fontWeight: '800', color: theme.text }}>
              {profile.firstName || 'CashLens'}
            </Text>
          </View>

          <View
            style={{
              width: 45,
              height: 45,
              borderRadius: 25,
              backgroundColor: theme.accent,
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
            }}
          >
            {profile.avatarUri ? (
              <Image
                source={{ uri: profile.avatarUri }}
                style={{ width: 45, height: 45 }}
              />
            ) : (
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                {(profile.firstName?.[0] || 'C')}
                {(profile.lastName?.[0] || 'L')}
              </Text>
            )}
          </View>
        </View>

        <View style={{ marginVertical: 25, alignItems: 'center' }}>
          <Text
            style={{
              color: theme.subtitle,
              fontSize: 13,
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            Current Balance
          </Text>
          <Text style={{ fontSize: 42, fontWeight: '800', color: theme.text, marginTop: 5 }}>
            ${balance.toFixed(2)}
          </Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={{ flexDirection: 'row', padding: 20, justifyContent: 'space-between' }}>
          <StatSquare label="Income" value={income} color="#2ecc71" icon="↑" theme={theme} />
          <StatSquare label="Expenses" value={expenses} color="#e74c3c" icon="↓" theme={theme} />
        </View>

        <View
          style={{
            marginHorizontal: 20,
            padding: 20,
            backgroundColor: theme.card,
            borderRadius: 20,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 15,
            }}
          >
            <Text style={{ fontWeight: '700', color: theme.text, fontSize: 16 }}>
              Budget Health
            </Text>
            <Text style={{ color: theme.accent, fontWeight: '600' }}>
              {percentageRemaining}% left
            </Text>
          </View>

          <ProgressBar label="" percentage={percentageRemaining} />

          <Text
            style={{
              color: theme.subtitle,
              fontSize: 12,
              marginTop: 15,
              textAlign: 'center',
            }}
          >
            {percentageRemaining > 20
              ? "You're doing great! Keep it up."
              : "Warning: You've spent most of your income."}
          </Text>
        </View>

        <View style={{ padding: 20 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              color: theme.text,
              marginBottom: 15,
            }}
          >
            Quick Insights
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <InsightCard
              title="Daily Avg"
              value={`$${transactions.length ? (expenses / 30).toFixed(0) : 0}`}
              theme={theme}
            />
            <InsightCard
              title="Transactions"
              value={transactions.length}
              theme={theme}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function StatSquare({ label, value, color, icon, theme }) {
  return (
    <View
      style={{
        width: '47%',
        backgroundColor: theme.card,
        padding: 16,
        borderRadius: 20,
        borderLeftWidth: 4,
        borderLeftColor: color,
      }}
    >
      <View
        style={{
          backgroundColor: color + '20',
          width: 30,
          height: 30,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
        }}
      >
        <Text style={{ color: color, fontWeight: 'bold' }}>{icon}</Text>
      </View>
      <Text style={{ color: theme.subtitle, fontSize: 12 }}>{label}</Text>
      <Text
        style={{
          color: theme.text,
          fontSize: 18,
          fontWeight: '700',
          marginTop: 2,
        }}
      >
        ${value.toFixed(0)}
      </Text>
    </View>
  );
}

function InsightCard({ title, value, theme }) {
  return (
    <View
      style={{
        width: '48%',
        backgroundColor: theme.card,
        padding: 15,
        borderRadius: 15,
        marginBottom: 15,
        alignItems: 'center',
      }}
    >
      <Text style={{ color: theme.subtitle, fontSize: 12 }}>{title}</Text>
      <Text
        style={{
          color: theme.text,
          fontSize: 20,
          fontWeight: '700',
          marginTop: 5,
        }}
      >
        {value}
      </Text>
    </View>
  );
}
