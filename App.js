import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from './src/screens/DashboardScreen';
import AddExpenseScreen from './src/screens/AddExpenseScreen';
import { ExpenseProvider } from './src/context/ExpenseContext';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <ExpenseProvider>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="Dashboard"
                    screenOptions={{
                        headerStyle: { backgroundColor: '#1E293B' }, // Slate 800
                        headerTintColor: '#F8FAFC', // Slate 50
                        headerTitleStyle: { fontWeight: 'bold' },
                        contentStyle: { backgroundColor: '#0F172A' } // Slate 900
                    }}
                >
                    <Stack.Screen
                        name="Dashboard"
                        component={DashboardScreen}
                        options={{ title: 'Expense Tracker' }}
                    />
                    <Stack.Screen
                        name="AddExpense"
                        component={AddExpenseScreen}
                        options={{ title: 'New Expense', presentation: 'modal' }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </ExpenseProvider>
    );
}
