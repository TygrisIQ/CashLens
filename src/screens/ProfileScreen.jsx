import { ScrollView, View, Text, Image } from "react-native";

import {styles} from "../ui/shared/styles";
import NavBar from "../components/nav-bar";

export default function ProfileScreen() {

    const defaultAvatar = require("../assets/profile_placeholder.png");

    return (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>

            {/* Header */}
            <View style={styles.header}>
                <Image 
                    source={defaultAvatar} 
                    style={{ width: 120, height: 120, borderRadius: 60, marginBottom: 15 }}
                />
                <Text style={styles.title}>John Doe</Text>
                <Text style={styles.subtitle}>Manage your info and see your financial stats.</Text>
            </View>

            <NavBar active="Home" />
            <View style={{ width: "100%", marginBottom: 30 }}>
                <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 10 }}>Your Stats</Text>

                <View style={{ 
                    backgroundColor: "#fff",
                    padding: 15,
                    borderRadius: 10,
                    marginBottom: 15 
                }}>
                    <Text>Total Income: $0</Text>
                </View>

                <View style={{ 
                    backgroundColor: "#fff",
                    padding: 15,
                    borderRadius: 10,
                    marginBottom: 15 
                }}>
                    <Text>Total Expenses: $0</Text>
                </View>

                <View style={{ 
                    backgroundColor: "#fff",
                    padding: 15,
                    borderRadius: 10,
                }}>
                    <Text>Savings: $0</Text>
                </View>
            </View>

           
            

            <Text style={styles.footer}>© 2025 CashLens. All rights reserved.</Text>

        </ScrollView>
    )
};