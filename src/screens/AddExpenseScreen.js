import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Alert
} from 'react-native';
import { useExpenses } from '../context/ExpenseContext';

const CATEGORIES = ['Food', 'Transport', 'Utilities', 'Entertainment', 'Shopping', 'Other'];

export default function AddExpenseScreen({ navigation }) {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState(CATEGORIES[0]);
    const { addExpense } = useExpenses();

    const handleSave = () => {
        if (!title.trim() || !amount.trim()) {
            Alert.alert('Error', 'Please enter a title and amount.');
            return;
        }

        if (isNaN(amount) || parseFloat(amount) <= 0) {
            Alert.alert('Error', 'Please enter a valid amount.');
            return;
        }

        addExpense({
            title: title.trim(),
            amount: parseFloat(amount),
            category
        });

        navigation.goBack();
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 80}
        >
            <View style={styles.form}>

                {/* Title Input */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. Coffee"
                        placeholderTextColor="#64748B"
                        value={title}
                        onChangeText={setTitle}
                    />
                </View>

                {/* Amount Input */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Amount ($)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="0.00"
                        placeholderTextColor="#64748B"
                        keyboardType="decimal-pad"
                        value={amount}
                        onChangeText={setAmount}
                    />
                </View>

                {/* Category Selector */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Category</Text>
                    <View style={styles.categoryContainer}>
                        {CATEGORIES.map((cat) => (
                            <TouchableOpacity
                                key={cat}
                                style={[
                                    styles.categoryPill,
                                    category === cat && styles.categoryPillActive
                                ]}
                                onPress={() => setCategory(cat)}
                            >
                                <Text style={[
                                    styles.categoryText,
                                    category === cat && styles.categoryTextActive
                                ]}>{cat}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Save Button */}
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Add Expense</Text>
                </TouchableOpacity>

            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F172A',
    },
    form: {
        padding: 24,
    },
    inputGroup: {
        marginBottom: 24,
    },
    label: {
        color: '#94A3B8',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#1E293B',
        color: '#F8FAFC',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#334155',
    },
    categoryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    categoryPill: {
        backgroundColor: '#1E293B',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#334155',
    },
    categoryPillActive: {
        backgroundColor: '#3B82F6',
        borderColor: '#3B82F6',
    },
    categoryText: {
        color: '#94A3B8',
        fontSize: 14,
        fontWeight: '500',
    },
    categoryTextActive: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
    saveButton: {
        backgroundColor: '#10B981', // Emerald 500
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 12,
        shadowColor: '#10B981',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 4,
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
