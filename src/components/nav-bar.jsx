import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function NavBar({ active }) {

    const navigation = useNavigation();

    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Text style={[styles.link, active === "Home" && styles.activeLink]}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Budget")}>
            <Text style={[styles.link, active === "Budget" && styles.activeLink]}>Budget</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Text style={[styles.link, active === "Profile" && styles.activeLink]}>Profile</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        backgroundColor: '#f8f8f8',
    },
    link: {
        fontSize: 18,
        color: '#007AFF',
    },
    activeLink: {
        fontWeight: 'bold',
        backgroundColor: '#e0e0e0',
        color: '#000',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 20,
    },
});