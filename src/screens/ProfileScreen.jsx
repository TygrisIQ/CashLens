import { ScrollView, View, Text, Image } from "react-native";
import { styles } from "../ui/shared/styles";
import NavBar from "../components/nav-bar";
import useTheme from "../ui/shared/themeSelect";

export default function ProfileScreen() {

    const defaultAvatar = require("../assets/profile_placeholder.png");
    const { theme } = useTheme();

    return (
        <View style={{ flex: 1, backgroundColor: theme.background }}>
            
           
            <NavBar active="Profile" theme={theme} />

            <ScrollView
                style={[styles.scrollView, { backgroundColor: theme.background }]}
                contentContainerStyle={styles.contentContainer}
            >

                
                <View style={[styles.header, { backgroundColor: theme.card }]}>
                    <Image 
                        source={defaultAvatar} 
                        style={{ width: 120, height: 120, borderRadius: 60, marginBottom: 15 }}
                    />
                    <Text style={[styles.title, { color: theme.text }]}>John Doe</Text>
                    <Text style={[styles.subtitle, { color: theme.subtitle }]}>
                        Manage your info and see your financial stats.
                    </Text>
                </View>

               
                <View style={{ width: "100%", marginBottom: 30 }}>

                    <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 10, color: theme.text }}>
                        Your Stats
                    </Text>

                    <View style={{
                        backgroundColor: theme.card,
                        padding: 15,
                        borderRadius: 10,
                        marginBottom: 15
                    }}>
                        <Text style={{ color: theme.text }}>Total Income: $0</Text>
                    </View>

                    <View style={{
                        backgroundColor: theme.card,
                        padding: 15,
                        borderRadius: 10,
                        marginBottom: 15
                    }}>
                        <Text style={{ color: theme.text }}>Total Expenses: $0</Text>
                    </View>

                    <View style={{
                        backgroundColor: theme.card,
                        padding: 15,
                        borderRadius: 10
                    }}>
                        <Text style={{ color: theme.text }}>Savings: $0</Text>
                    </View>
                </View>

                <Text style={[styles.footer, { color: theme.subtitle }]}>
                    © 2025 CashLens. All rights reserved.
                </Text>

            </ScrollView>

        </View>
    );
}
