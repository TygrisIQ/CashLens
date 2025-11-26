import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { styles } from "../ui/shared/styles";


export default function CalendarScreen() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const getDayCashFlow = (day) => {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dailyTransactions = transactions.filter(tx => tx.date === dateStr);

        const income = dailyTransactions
            .filter(tx => tx.type === 'income')
            .reduce((sum, tx) => sum + tx.amount, 0);
        const expenses = dailyTransactions
            .filter(tx => tx.type === 'expense')
            .reduce((sum, tx) => sum + tx.amount, 0);

        return { income, expenses, net: income - expenses, transactions: dailyTransactions};
    };

    const goToPreviousMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
        setSelectedDate(null);
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
        setSelectedDate(null);
    };

    const handleDateSelect = (day) => {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        setSelectedDate(dateStr);
    };

    const renderCalendar = () => {
        const calendarDays = [];  
        
        for (let i = 0; i < firstDay; i++) {
            calendarDays.push(<View key={`empty-${i}`} style={styles.calendarDayEmpty} />);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const cashflow = getDayCashFlow(day);
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();
            const isSelected = selectedDate === dateStr;

            calendarDays.push(
                <TouchableOpacity
                    key={day}
                    style={{
                        ...styles.calendarDay,
                        ...(isSelected ? styles.calendarDaySelected : {}),
                        ...(isToday ? styles.calendarDayToday : {}),
                        cursor: 'pointer',
                    }}
                    onPress={() => handleDateSelect(day)}
                >
                    <Text style={styles.calendarDayNumber}>{day}</Text>
                    {cashflow.transactions.length > 0 && (
                        <View style={styles.cashflowIndicator}>
                            <View style={{ ...styles.cashflowDot, backgroundColor: cashflow.net >= 0 ? "green" : "red" }} />
                        </View>
                    )}
                </TouchableOpacity>
            )
        }

        return calendarDays;
    };

    const selectedDateData = selectedDate ? (() => {
        const day = parseInt(selectedDate.split('-')[2], 10);
        return getDayCashFlow(day);
    })() : null;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.calendarCard}>
                <View style={styles.calendarHeader}>
                    <TouchableOpacity onPress={goToPreviousMonth}>
                        <Text style={styles.calendarNavButton}>{"<"}</Text>
                    </TouchableOpacity>
                    <Text style={styles.calendarMonthYear}>{`${monthNames[month]} ${year}`}</Text>
                    <TouchableOpacity onPress={goToNextMonth}>
                        <Text style={styles.calendarNavButton}>{">"}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.calendarGrid}>
                    {renderCalendar()}
                </View>

                
                {selectedDate && selectedDateData && (
                    <View style={styles.selectedDateDetails}>
                        <Text style={styles.selectedDateTitle}>
                            {new Date(selectedDate).toLocaleDateString('en-US', {   month: 'long',
                                day: 'numeric',
                                year: 'numeric' 
                                })}
                        </Text>

                        <View style={styles.dayStats}>
                            <Text style={styles.dayStatItem}>Income: ${selectedDateData.income.toFixed(2)}</Text>
                            <Text style={styles.dayStatItem}>Expenses: ${selectedDateData.expenses.toFixed(2)}</Text>
                            <Text style={styles.dayStatItem}>Net: ${selectedDateData.net.toFixed(2)}</Text>
                        </View>

                        {selectedDateData.transactions.length > 0 && (
                            <View style={styles.dayTransactions}>
                                <Text style={styles.dayTransactionsTitle}>Transactions:</Text>
                                {selectedDateData.transactions.map((tx, index) => (
                                    <View key={index} style={styles.transactionItem}>
                                        <Text style={styles.transactionDesc}>{tx.description}</Text>
                                        <Text style={{
                                            color: tx.type === 'income' ? 'green' : 'red'
                                        }}>
                                            ${tx.amount.toFixed(2)}
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
}