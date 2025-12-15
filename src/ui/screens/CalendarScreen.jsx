import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavBar from '../components/nav-bar';
import { styles } from '../shared/styles';
export default function CalendarScreen() {
  const [transactions, setTransactions] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

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

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  const getDayCashflow = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayTransactions = transactions.filter(t => t.date === dateStr);
    
    const income = dayTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = dayTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    return { income, expenses, net: income - expenses, transactions: dayTransactions };
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDate(null);
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDate(null);
  };

  const handleDayClick = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(dateStr);
  };

  const renderCalendarDays = () => {
    const days = [];
    
    for (let i = 0; i < firstDay; i++) {
      days.push(<View key={`empty-${i}`} style={styles.calendarDay} />);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const cashflow = getDayCashflow(day);
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isSelected = selectedDate === dateStr;
      const isToday = new Date().toISOString().split('T')[0] === dateStr;
      
      days.push(
        <TouchableOpacity
          key={day}
          style={[
            styles.calendarDay,
            isSelected && styles.calendarDaySelected,
            isToday && styles.calendarDayToday
          ]}
          onPress={() => handleDayClick(day)}
        >
          <Text style={styles.dayNumber}>{day}</Text>
          {cashflow.transactions.length > 0 && (
            <View style={styles.cashflowIndicator}>
              <View style={[
                styles.cashflowDot,
                { backgroundColor: cashflow.net >= 0 ? '#198754' : '#dc3545' }
              ]} />
            </View>
          )}
        </TouchableOpacity>
      );
    }
    
    return days;
  };

  const selectedDateData = selectedDate ? (() => {
    const day = parseInt(selectedDate.split('-')[2]);
    return getDayCashflow(day);
  })() : null;

  return (
    <ScrollView style={styles.mainContainer}>
        <NavBar active="Calendar" />
      <View style={styles.calendarCard}>
        <View style={styles.calendarHeader}>
          <TouchableOpacity style={styles.monthNavButton} onPress={goToPreviousMonth}>
            <Text style={styles.monthNavText}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.monthTitle}>{monthNames[month]} {year}</Text>
          <TouchableOpacity style={styles.monthNavButton} onPress={goToNextMonth}>
            <Text style={styles.monthNavText}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.weekdaysRow}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <Text key={day} style={styles.weekday}>{day}</Text>
          ))}
        </View>

        <View style={styles.calendarGrid}>
          {renderCalendarDays()}
        </View>

        {selectedDate && selectedDateData && (
          <View style={styles.dayDetails}>
            <Text style={styles.dayDetailsTitle}>
              {new Date(selectedDate).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </Text>
            
            <View style={styles.dayStats}>
              <View style={styles.dayStatItem}>
                <Text style={styles.dayStatLabel}>Income:</Text>
                <Text style={[styles.dayStatValue, styles.successText]}>
                  +${selectedDateData.income.toFixed(2)}
                </Text>
              </View>
              <View style={styles.dayStatItem}>
                <Text style={styles.dayStatLabel}>Expenses:</Text>
                <Text style={[styles.dayStatValue, styles.dangerText]}>
                  -${selectedDateData.expenses.toFixed(2)}
                </Text>
              </View>
              <View style={styles.dayStatItem}>
                <Text style={styles.dayStatLabel}>Net:</Text>
                <Text style={[
                  styles.dayStatValue,
                  { color: selectedDateData.net >= 0 ? '#198754' : '#dc3545', fontWeight: 'bold' }
                ]}>
                  ${selectedDateData.net.toFixed(2)}
                </Text>
              </View>
            </View>

            {selectedDateData.transactions.length > 0 && (
              <View style={styles.dayTransactions}>
                <Text style={styles.dayTransactionsTitle}>Transactions</Text>
                {selectedDateData.transactions.map(t => (
                  <View key={t.id} style={styles.dayTransaction}>
                    <Text>{t.dayTransaction}</Text>
                    <Text style={{
                      color: t.type === 'income' ? '#198754' : '#dc3545',
                      fontWeight: 'bold'
                    }}>
                      {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
};
