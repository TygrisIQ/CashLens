import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native/types_generated/index';

export default function Calendar() {
  const dates = 
  [
    { weekday: 'Sun', date: newDate()},
    { weekday: 'Mon', date: newDate()},
    { weekday: 'Tue', date: newDate()},
    { weekday: 'Wed', date: newDate()},
    { weekday: 'Thu', date: newDate()},
    { weekday: 'Fri', date: newDate()},
    { weekday: 'Sat', date: newDate()},
    ];


  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  const startingDayIndex = firstDayOfMonth.getDay();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{format(currentDate, 'MMMM yyyy')}</Text>
        </View>

        <View style={styles.picker}>
          {dates.map((day) => (
              <TouchableWithoutFeedback>
                  <View key={day.weekday} style={styles.day}>
                      <Text>{day.weekday}</Text>
                  </View>
            </TouchableWithoutFeedback>
          ))}
        </View>

        <View style={styles.daysGrid}>
          {Array.from({ length: startingDayIndex }).map((_, index) => (
            <View key={`empty-${index}`} style={styles.day} />
          ))}

          {daysInMonth.map((day, index) => (
            <View key={index} style={styles.day}>
              <Text>{format(day, 'd')}</Text>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
  },
  header: {
    paddingHorizontal: 16,
  },
  title: {
    fontsize: 32,
    fontWeight: 'bold',
    color: '#1d1d1d',
    marginBottom: 12,
  },
  itemRow: {
    width,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginHorizontal: -4,
  },
});
