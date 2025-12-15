import { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";


export default function PastExpenses() {

    const [expense, setExpense] = useState('');
    const addExpense = (expense) => {
        console.log("Expense added:", expense);
    };

    return (
        <View style={styles.form}>
            <TextInput 
            style={styles.input}
            placeholder= "How much did you spend?"
             />
             <Button 
             title="Add Expense"
             onPress={() => addExpense(expense)}/>
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 20,
    },

    input: {

    }
})