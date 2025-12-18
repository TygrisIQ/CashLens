import { ScrollView, View, Text, Image } from "react-native";
import { styles } from "../shared/styles";
import useTheme from "../shared/themeSelect";
import { ClearTransactionData,loadTransactions } from "../../data/DataController";
import { useEffect, useMemo, useState } from "react";
import { Button } from "react-native";
import { TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";




export default function ProfileScreen() {

    const defaultAvatar = require("../assets/profile_placeholder.png");
    const { theme } = useTheme();


    const [Transactions, SetTransactions] = useState([]);
    const reloadTransactions = async () => {
        const data = await loadTransactions();
        SetTransactions(data);
    };
    useFocusEffect(() => {
        reloadTransactions();
    });
      
     
    const handleClear = async () => {
        await ClearTransactionData();
        await reloadTransactions();
    };

   const { income, expenses, balance } = useMemo(() => {
    const income = Transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const expenses = Transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    return {
        income,
        expenses,
        balance: income - expenses,
    };
}, [Transactions]);

   
    return (
        <View style={{ flex: 1, backgroundColor: theme.background }}>
            
           

            <ScrollView
                style={[styles.scrollView, { backgroundColor: theme.background }]}
                contentContainerStyle={styles.contentContainer}
            >

                
                <View style={[styles.header, { backgroundColor: theme.card }]}>
                    <Image 
                        source={defaultAvatar} 
                        style={{ width: 120, height: 120, borderRadius: 60, marginBottom: 15 }}
                    />
                    <Text style={[styles.title, { color: theme.text }]}>John Doe</Text>
                    <Text style={[styles.subtitle, { color: theme.subtitle }]}>
                        Manage your info and see your financial stats.
                    </Text>
                </View>

               
                <View style={{ width: "100%", marginBottom: 30 }}>

                    <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 10, color: theme.text }}>
                        Your Stats
                    </Text>

                    <View style={{
                        backgroundColor: theme.card,
                        padding: 15,
                        borderRadius: 10,
                        marginBottom: 15
                    }}>
                        <Text style={{ color: theme.text }}>Total Income: ${income.toFixed(2)} {
                            
                            }</Text>
                    </View>

                    <View style={{
                        backgroundColor: theme.card,
                        padding: 15,
                        borderRadius: 10,
                        marginBottom: 15
                    }}>
                        <Text style={{ color: theme.text }}>Total Expenses: ${expenses.toFixed(2)}</Text>
                    </View>

                    <View style={{
                        backgroundColor: theme.card,
                        padding: 15,
                        borderRadius: 10
                    }}>
                        <Text style={{ color: theme.text }}>Savings: ${(income - expenses).toFixed(2)}</Text>
                    </View>
                </View>
                
               <TouchableOpacity
                       style={[styles.addBtn, { backgroundColor: theme.accent }]}
                       onPress={handleClear}
                     >
                       <Text style={styles.addText}>Delete All Transactions</Text>
                     </TouchableOpacity>
                <Text style={[styles.footer, { color: theme.subtitle }]}>
                    © 2025 CashLens. All rights reserved.
                </Text>

            </ScrollView>
        
        </View>
    );
}
