import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../shared/styles";
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

            <TouchableOpacity onPress={() => navigation.navigate("Calendar")}>
                <Text style={[styles.link, active === "Calendar" && styles.activeLink]}>
                    Calendar
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


