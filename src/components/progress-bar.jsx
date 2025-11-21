import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProgressBar({ progress }) {
    return (
        <View style={styles.container}>
            <View style={[styles.bar, { width: `${progress}%` }]} />
            <Text style={styles.text}>{`${progress}%`}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 20,
        width: '100%',
        backgroundColor: '#e0e0de',
        borderRadius: 50,
        margin: 10,
    },
    bar: {
        height: '100%',
        borderRadius: 50,
        backgroundColor: '#3b5998',
    },
    text: {
        position: 'absolute',
        alignSelf: 'center',
        color: 'black',
        fontWeight: 'bold',
    },
});