import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'transactions';


//load data if exists,empty array otherwise
export const loadTransactions = async() => {
    const data = await AsyncStorage.getItem(KEY);
    return data ? JSON.parse(data) : [];
}

export const saveTransactions = async(transactions) =>{
    await AsyncStorage.setItem(KEY, JSON.stringify(transactions));
}


export const addTransaction = async (newTr) => {
    //load existing transactions
    const existing = await loadTransactions();
    //add updated to the existing transations
    const updated = [newTr, ...existing];
    //save 
    await saveTransactions(updated);
    //return updated transactions
    return updated;
}

export const deleteTransaction = async (id) => {
    const existing = await loadTransactions();
    const updated = existing.filter(tr => tr.id !== id);
    await saveTransactions(updated);
    return updated;
}