import React, { createContext, useState, useContext } from 'react';

const ExpenseContext = createContext();

export const useExpenses = () => useContext(ExpenseContext);

export const ExpenseProvider = ({ children }) => {
    const [expenses, setExpenses] = useState([
        { id: '1', title: 'Groceries', category: 'Food', amount: 85.50, date: new Date().toISOString() },
        { id: '2', title: 'Uber', category: 'Transport', amount: 24.00, date: new Date().toISOString() },
    ]);

    const addExpense = (expense) => {
        setExpenses(prev => [{ ...expense, id: Date.now().toString(), date: new Date().toISOString() }, ...prev]);
    };

    const deleteExpense = (id) => {
        setExpenses(prev => prev.filter(e => e.id !== id));
    };

    const totalExpense = expenses.reduce((sum, item) => sum + parseFloat(item.amount), 0);

    return (
        <ExpenseContext.Provider value={{ expenses, addExpense, deleteExpense, totalExpense }}>
            {children}
        </ExpenseContext.Provider>
    );
};
