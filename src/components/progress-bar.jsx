import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProgressBar({ label, percentage }) {

    let barColor = '#4caf50'; 
    if (percentage < 20) barColor = '#f44336'; 
    else if (percentage < 50) barColor = '#ff9800'; 

    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                <View style={[styles.bar, { width: `${percentage}%`, backgroundColor: barColor }]} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        margin: 20,
        width: '90%',
        alignSelf: 'center'
    },
    labelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    labelText: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
    },
    percentageText: {
        fontSize: 16,
        color: '#666',
    },
    container: {
        height: 20,
        width: '100%',
        backgroundColor: '#e0e0de',
        borderRadius: 50,
        overflow: 'hidden',
    },
    bar: {
        height: '100%',
        borderRadius: 50,
    },
});