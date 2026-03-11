import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import { useExpenses } from '../context/ExpenseContext';

export default function DashboardScreen({ navigation }) {
    const { expenses, deleteExpense, totalExpense } = useExpenses();

    const renderItem = ({ item }) => (
        <View style={styles.expenseCard}>
            <View style={styles.expenseInfo}>
                <Text style={styles.expenseTitle}>{item.title}</Text>
                <Text style={styles.expenseCategory}>{item.category}</Text>
            </View>
            <View style={styles.expenseAction}>
                <Text style={styles.expenseAmount}>${parseFloat(item.amount).toFixed(2)}</Text>
                <TouchableOpacity onPress={() => deleteExpense(item.id)} style={styles.deleteButton}>
                    <Text style={styles.deleteButtonText}>✕</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Total Expense Header */}
            <View style={styles.summaryContainer}>
                <Text style={styles.summaryLabel}>Total Expenses</Text>
                <Text style={styles.summaryAmount}>${totalExpense.toFixed(2)}</Text>
            </View>

            {/* Expense List */}
            <FlatList
                data={expenses}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No expenses yet. Add some!</Text>
                    </View>
                }
            />

            {/* Floating Action Button */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('AddExpense')}
            >
                <Text style={styles.fabIcon}>+</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F172A',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    summaryContainer: {
        padding: 24,
        backgroundColor: '#1E293B',
        borderBottomWidth: 1,
        borderBottomColor: '#334155',
        alignItems: 'center',
    },
    summaryLabel: {
        color: '#94A3B8',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    summaryAmount: {
        color: '#F8FAFC',
        fontSize: 36,
        fontWeight: 'bold',
    },
    listContent: {
        padding: 16,
        paddingBottom: 80, // Space for FAB
    },
    expenseCard: {
        backgroundColor: '#1E293B',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    expenseInfo: {
        flex: 1,
    },
    expenseTitle: {
        color: '#F8FAFC',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    expenseCategory: {
        color: '#94A3B8',
        fontSize: 13,
    },
    expenseAction: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    expenseAmount: {
        color: '#F8FAFC',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 12,
    },
    deleteButton: {
        backgroundColor: '#EF4444',
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
    emptyContainer: {
        padding: 40,
        alignItems: 'center',
    },
    emptyText: {
        color: '#64748B',
        fontSize: 16,
    },
    fab: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        backgroundColor: '#3B82F6',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#3B82F6',
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 5,
    },
    fabIcon: {
        color: '#FFFFFF',
        fontSize: 28,
        lineHeight: 30,
        fontWeight: 'bold',
    },
});
