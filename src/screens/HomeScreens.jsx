import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ExpensesCard from '../components/expenses-card';


export default function HomeScreen() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Button 
                title="Go to Budget"
                onPress={() => navigation.navigate('Budget')}
            />
            <ExpensesCard />
            <ExpensesCard />
            <ExpensesCard />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    button: {
        marginTop: 20,
        width: '50%',
        alignSelf: 'center',
    },
    ExpensesCard: {
        marginTop: 20,
    },
});