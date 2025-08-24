import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function Dashboard({ expenses, budget, totalExpenses, remainingBudget }) {

    // Calculate spending by category
    const categoryData = expenses.reduce((acc, expense) => {
        const category = expense.category;
        acc[category] = (acc[category] || 0) + expense.amount;
        return acc;
    }, {});

    const pieData = Object.entries(categoryData).map(([category, amount]) => ({
        name: category.charAt(0).toUpperCase() + category.slice(1),
        value: amount,
        percentage: ((amount / totalExpenses) * 100).toFixed(1)
    }));

    // Recent expenses for chart (last 7 days)
    const recentExpenses = expenses.slice(-7).map((expense, index) => ({
        day: `Day ${index + 1}`,
        amount: expense.amount,
        title: expense.title
    }));

    const COLORS = {
        food: '#ff6b6b',
        transport: '#4ecdc4',
        entertainment: '#45b7d1',
        utilities: '#f9ca24',
        healthcare: '#6c5ce7',
        shopping: '#fd79a8',
        education: '#00b894',
        other: '#636e72'
    };

    return (
        <div>
            <div className="dashboard-grid">
                <div className="stat-card">
                    <h3>Monthly Budget</h3>
                    <p>${budget.toFixed(2)}</p>
                </div>

                <div className="stat-card expense">
                    <h3>Total Spent</h3>
                    <p>${totalExpenses.toFixed(2)}</p>
                </div>

                <div className={`stat-card remaining ${remainingBudget < 0 ? 'negative' : ''}`}>
                    <h3>Remaining</h3>
                    <p>${remainingBudget.toFixed(2)}</p>
                </div>

                <div className="stat-card">
                    <h3>Total Expenses</h3>
                    <p>{expenses.length}</p>
                </div>
            </div>

            {expenses.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div className="card">
                        <h2>Spending by Category</h2>
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={120}
                                        dataKey="value"
                                        label={({ name, percentage }) => `${name}: ${percentage}%`}
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={COLORS[entry.name.toLowerCase()] || '#8884d8'}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="card">
                        <h2>Recent Spending</h2>
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={recentExpenses}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="day" />
                                    <YAxis />
                                    <Tooltip
                                        formatter={(value, name, props) => [
                                            `$${value.toFixed(2)}`,
                                            props.payload.title || 'Amount'
                                        ]}
                                    />
                                    <Legend />
                                    <Bar dataKey="amount" fill="#667eea" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="card">
                    <div className="no-expenses">
                        <h3>No expenses yet!</h3>
                        <p>Start by adding your first expense to see your spending analysis.</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
