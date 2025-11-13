import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MyCalendar from '../components/calendar';


export default function BudgetScreen() {
    const nav = useNavigation();

    return (
        <View>
            <MyCalendar />
            <Button 
                style={styles.button}
                title="Go to Expenses" 
                onPress={() => nav.navigate('Expenses')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 20,
        width: '50%',
        alignSelf: 'center',
    },
});