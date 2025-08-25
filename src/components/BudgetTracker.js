import React, { useState } from 'react';

function BudgetTracker({ budget, setBudget, totalExpenses, remainingBudget }) {
    const [newBudget, setNewBudget] = useState(budget || '');

    const handleBudgetSubmit = (e) => {
        e.preventDefault();
        const budgetAmount = parseFloat(newBudget);

        if (budgetAmount <= 0) {
            alert('Please enter a valid budget amount');
            return;
        }

        setBudget(budgetAmount);
        alert('Budget updated successfully!');
    };

    const budgetUsedPercentage = budget > 0 ? (totalExpenses / budget) * 100 : 0;
    const isOverBudget = budgetUsedPercentage > 100;

    const getBudgetStatus = () => {
        if (budgetUsedPercentage >= 90) {
            return { message: 'Warning: You\'re close to your budget limit!', color: '#ff6b6b' };
        } else if (budgetUsedPercentage >= 75) {
            return { message: 'Heads up: You\'ve used 75% of your budget', color: '#f9ca24' };
        } else if (budgetUsedPercentage >= 50) {
            return { message: 'You\'re halfway through your budget', color: '#45b7d1' };
        }
        return { message: 'You\'re doing great with your budget!', color: '#51cf66' };
    };

    const budgetStatus = getBudgetStatus();

    return (
        <div>
            <div className="card">
                <h2>Set Monthly Budget</h2>
                <form onSubmit={handleBudgetSubmit}>
                    <div className="form-group">
                        <label htmlFor="budget">Monthly Budget ($)</label>
                        <input
                            type="number"
                            id="budget"
                            value={newBudget}
                            onChange={(e) => setNewBudget(e.target.value)}
                            placeholder="Enter your monthly budget"
                            step="0.01"
                            min="0"
                            required
                        />
                    </div>
                    <button type="submit" className="btn">
                        {budget > 0 ? 'Update Budget' : 'Set Budget'}
                    </button>
                </form>
            </div>

            {budget > 0 && (
                <div className="card">
                    <h2>Budget Progress</h2>

                    <div style={{
                        background: budgetStatus.color,
                        color: 'white',
                        padding: '1rem',
                        borderRadius: '8px',
                        marginBottom: '1.5rem',
                        textAlign: 'center',
                        fontWeight: 'bold'
                    }}>
                        {budgetStatus.message}
                    </div>

                    <div className="budget-progress">
                        <div
                            className={`budget-progress-bar ${isOverBudget ? 'over-budget' : ''}`}
                            style={{
                                width: `${Math.min(budgetUsedPercentage, 100)}%`,
                            }}
                        >
                            {budgetUsedPercentage.toFixed(1)}%
                        </div>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                        gap: '1rem',
                        marginTop: '1.5rem'
                    }}>
                        <div style={{ textAlign: 'center' }}>
                            <h4 style={{ color: '#667eea', margin: '0 0 0.5rem 0' }}>Budget</h4>
                            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
                                ${budget.toFixed(2)}
                            </p>
                        </div>

                        <div style={{ textAlign: 'center' }}>
                            <h4 style={{ color: '#ff6b6b', margin: '0 0 0.5rem 0' }}>Spent</h4>
                            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
                                ${totalExpenses.toFixed(2)}
                            </p>
                        </div>

                        <div style={{ textAlign: 'center' }}>
                            <h4 style={{ color: remainingBudget >= 0 ? '#51cf66' : '#ff6b6b', margin: '0 0 0.5rem 0' }}>
                                {remainingBudget >= 0 ? 'Remaining' : 'Over Budget'}
                            </h4>
                            <p style={{
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                                margin: 0,
                                color: remainingBudget >= 0 ? '#51cf66' : '#ff6b6b'
                            }}>
                                ${Math.abs(remainingBudget).toFixed(2)}
                            </p>
                        </div>
                    </div>

                    {isOverBudget && (
                        <div style={{
                            background: '#ffe0e0',
                            border: '1px solid #ff6b6b',
                            borderRadius: '8px',
                            padding: '1rem',
                            marginTop: '1.5rem'
                        }}>
                            <h4 style={{ color: '#ff6b6b', margin: '0 0 0.5rem 0' }}>
                                Budget Exceeded!
                            </h4>
                            <p style={{ margin: 0, color: '#333' }}>
                                You've spent <strong>${(totalExpenses - budget).toFixed(2)}</strong> more than your budget.
                                Consider reviewing your spending or adjusting your budget for next month.
                            </p>
                        </div>
                    )}

                    <div style={{ marginTop: '2rem' }}>
                        <h3>Budget Tips</h3>
                        <ul style={{ color: '#666', lineHeight: '1.6' }}>
                            <li>Review your spending weekly to stay on track</li>
                            <li>Set aside 20% of your budget for unexpected expenses</li>
                            <li>Use the category breakdown to identify your biggest spending areas</li>
                            <li>Consider the 50/30/20 rule: 50% needs, 30% wants, 20% savings</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BudgetTracker
