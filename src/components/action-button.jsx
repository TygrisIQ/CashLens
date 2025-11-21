import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ActionButton({ title }) {
    return (
        <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'navy',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        margin: 6,
    },
    text: {
        color: '#fff',
        fontSize: 18,
    },
});