import React from 'react';  
import { View, Text } from "react-native";

export default function BudgetScreen() {

    const nav = useNavigation();

    return (
        <View>
            <Text>Budget Screen</Text>
            <Button title="Go to Expenses" onPress={() => nav.navigate("Expenses")} />
        </View>
    );
}