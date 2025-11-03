import { View } from "react-native/types_generated/index";
import { useNavigation } from '@react-navigation/native';
import { Text, Button, StyleSheet } from "react-native";


export default function HomeScreen() {

    const nav = useNavigation();

    return (
        <View>
            <Text>Home Screen</Text>
            <Button 
                title="Go to Budget"
                onPress={() => nav.navigate('Budget')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
      marginTop: 32,
        paddingHorizontal: 24,
    },

    Button: {
        marginTop: 20,
        width: '50%',
        alignSelf: 'flex-start',
    },});