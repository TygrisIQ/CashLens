import { View, Text, ScrollView } from 'react-native';
import NavBar from '../components/nav-bar';
import ProgressBar from '../components/progress-bar';
import SummaryCard from '../components/summary-card';
import ActionButton from '../components/action-button';

// theme & styles
import { styles } from '../ui/shared/styles';
import useTheme from '../ui/shared/themeSelect';

export default function HomeScreen() {

  const { theme, themeName, setThemeName } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      
      
      <NavBar active="Home" theme={theme} />

      <ScrollView
        style={[styles.scrollView, { backgroundColor: theme.background }]}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={[styles.header, { backgroundColor: theme.card }]}>
          <Text style={[styles.title, { color: theme.text }]}>CashLens</Text>
          <Text style={[styles.subtitle, { color: theme.subtitle }]}>
            Track your spending, save smarter and reach your goals!
          </Text>
        </View>
        <View style={{ width: "100%" }}>
          <SummaryCard label="Total Income" value="" color="green" theme={theme} />
          <SummaryCard label="Total Expenses" value="" color="red" theme={theme} />
          <SummaryCard label="Savings" value="" color={theme.accent} theme={theme} />
        </View>

        
        <Text style={[styles.footer, { color: theme.subtitle }]}>
          © 2025 CashLens. All rights reserved.
        </Text>

      </ScrollView>
    </View>
  );
}
