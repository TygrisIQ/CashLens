import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavBar from '../components/nav-bar';
import ProgressBar from '../components/progress-bar';
import SummaryCard from '../components/summary-card';
import ActionButton from '../components/action-button';


export default function HomeScreen() {

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>CashLens</Text>
                <Text style={styles.subtitle}>Track your spending, save smarter and reach your goals!</Text>
            </View>

            <NavBar active="Home" />

            <View>
                <SummaryCard label="Total Income" value="" color="green" />
                <SummaryCard label="Total Expenses" value="" color="red" />
                <SummaryCard label="Savings" value="" color="#0d6efd" />
            </View>

            <View>
                <Text></Text>
                <ProgressBar progress={0} />
                <Text></Text>
            </View>

            <View>
                <Text></Text>
                <View>
                    <ActionButton title="Add Expense" />
                    <ActionButton title="View Reports" />
                    <ActionButton title="Set Budget Goals" />
                    <ActionButton title="Manage Categories" />
                </View>
            </View>

            <Text style={styles.footer}>© 2025 CashLens. All rights reserved.</Text>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    header: {
        backgroundColor: '#f5f5f5',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginTop: 10,
        opacity: 0.8,
    },
});