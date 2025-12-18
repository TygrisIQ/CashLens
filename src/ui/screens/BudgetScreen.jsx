import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { styles } from '../shared/styles';
import useTheme from '../shared/themeSelect';
import useTransactionStats from '../../hooks/useTransactionsStats';
import useTransactions from '../../hooks/useTransactions';

export default function BudgetScreen() {
  const { theme } = useTheme();
  const { transactions, add, remove } = useTransactions();
  const { income, expenses, balance } = useTransactionStats(transactions);

  const [modalVisible, setModalVisible] = useState(false);
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('income');

  const handleAdd = async () => {
    if (!desc || !amount) return;
    await add({
      id: Date.now().toString(),
      desc,
      amount: parseFloat(amount),
      type,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    });
    setDesc('');
    setAmount('');
    setModalVisible(false);
  };

  const renderHeader = () => (
    <View style={{ paddingBottom: 20 }}>
      <View
        style={{
          backgroundColor: theme.accent, 
          padding: 24,
          borderRadius: 24,
          marginBottom: 20,
          elevation: 4,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        }}
      >
        <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: '500' }}>
          Total Balance
        </Text>
        <Text style={{ fontSize: 34, fontWeight: '800', color: '#fff', marginVertical: 8 }}>
          ${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </Text>
        
        <View style={{ flexDirection: 'row', marginTop: 10, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)', paddingTop: 15 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>Income</Text>
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600' }}>+${income.toFixed(0)}</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>Expenses</Text>
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600' }}>-${expenses.toFixed(0)}</Text>
          </View>
        </View>
      </View>

      <Text style={{ fontSize: 18, fontWeight: '700', color: theme.text, marginBottom: 12 }}>
        Recent Activity
      </Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.background, paddingHorizontal: 20, paddingTop: 60 }}>
      
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TransactionItem item={item} theme={theme} onDelete={remove} />
        )}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 40 }}>
            <Text style={{ color: theme.subtitle }}>No transactions yet. Tap + to start.</Text>
          </View>
        }
      />

      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
          position: 'absolute',
          bottom: 30,
          right: 20,
          backgroundColor: theme.accent,
          width: 56,
          height: 56,
          borderRadius: 28,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 5,
        }}
      >
        <Text style={{ color: '#fff', fontSize: 30, lineHeight: 32 }}>+</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={{ backgroundColor: theme.card, borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: 25 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: '700', color: theme.text }}>Add Transaction</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={{ color: theme.subtitle }}>Close</Text>
                </TouchableOpacity>
              </View>

              <TextInput
                placeholder="Description"
                placeholderTextColor={theme.subtitle}
                value={desc}
                onChangeText={setDesc}
                style={{ backgroundColor: theme.background, padding: 15, borderRadius: 12, color: theme.text, marginBottom: 12 }}
              />

              <TextInput
                placeholder="0.00"
                placeholderTextColor={theme.subtitle}
                keyboardType="decimal-pad"
                value={amount}
                onChangeText={setAmount}
                style={{ backgroundColor: theme.background, padding: 15, borderRadius: 12, color: theme.text, marginBottom: 20, fontSize: 18 }}
              />

              <View style={{ flexDirection: 'row', marginBottom: 25 }}>
                {['income', 'expense'].map((t) => (
                  <TouchableOpacity
                    key={t}
                    onPress={() => setType(t)}
                    style={{
                      flex: 1,
                      padding: 12,
                      borderRadius: 12,
                      marginHorizontal: 5,
                      backgroundColor: type === t ? (t === 'income' ? '#2ecc71' : '#e74c3c') : theme.background,
                      borderWidth: 1,
                      borderColor: type === t ? 'transparent' : 'rgba(0,0,0,0.05)',
                    }}
                  >
                    <Text style={{ textAlign: 'center', color: type === t ? '#fff' : theme.text, fontWeight: '600', textTransform: 'capitalize' }}>
                      {t}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                onPress={handleAdd}
                style={{ backgroundColor: theme.accent, padding: 16, borderRadius: 15, alignItems: 'center' }}
              >
                <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>Save Transaction</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </View>
  );
}

function TransactionItem({ item, theme, onDelete }) {
  const isIncome = item.type === 'income';
  return (
    <View
      style={{
        backgroundColor: theme.card,
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <View style={{ 
        width: 44, height: 44, borderRadius: 12, 
        backgroundColor: isIncome ? 'rgba(46, 204, 113, 0.1)' : 'rgba(231, 76, 60, 0.1)',
        justifyContent: 'center', alignItems: 'center', marginRight: 15
      }}>
        <Text style={{ fontSize: 18 }}>{isIncome ? '💰' : '💸'}</Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={{ color: theme.text, fontWeight: '600', fontSize: 15 }}>{item.desc}</Text>
        <Text style={{ color: theme.subtitle, fontSize: 12, marginTop: 2 }}>{item.date}</Text>
      </View>

      <View style={{ alignItems: 'flex-end' }}>
        <Text style={{ color: isIncome ? '#2ecc71' : '#e74c3c', fontWeight: '700', fontSize: 16 }}>
          {isIncome ? '+' : '-'}${item.amount.toFixed(2)}
        </Text>
        <TouchableOpacity onPress={() => onDelete(item.id)} style={{ marginTop: 4 }}>
          <Text style={{ color: '#e74c3c', fontSize: 11, opacity: 0.7 }}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}