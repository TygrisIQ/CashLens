import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function NavBar({ active }) {

    const navigation = useNavigation();

    return (
        <View style={styles.navBar}>
            
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Text style={[styles.link, active === "Home" && styles.activeLink]}>
                    Home
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Budget")}>
                <Text style={[styles.link, active === "Budget" && styles.activeLink]}>
                    Budget
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                <Text style={[styles.link, active === "Profile" && styles.activeLink]}>
                    Profile
                </Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: "center",
        padding: 12,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        width: "100%",
        marginBottom: 25,
    },
    link: {
        fontSize: 18,
        color: '#007AFF',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 15,
    },
    activeLink: {
        fontWeight: 'bold',
        backgroundColor: '#e0e0e0',
        color: '#000',
    },
});
