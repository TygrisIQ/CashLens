import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavBar from '../components/nav-bar';
import ProgressBar from '../components/progress-bar';
import SummaryCard from '../components/summary-card';
import ActionButton from '../components/action-button';
import {styles} from '../ui/shared/styles';

export default function HomeScreen() {

    return (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
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
