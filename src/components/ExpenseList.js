import React, {useState} from 'react';

function ExpenseList({expenses, onDeleteExpense}) {
    const [filterCategory, setFilterCategory] = useState('all');
    const [sortBy, setSortBy] = useState('date');

    const categories = [
        {value: 'all', label: 'All Categories'},
        {value: 'food', label: 'Food and Dining'},
        {value: 'transportation', label: 'Transportation'},
        {value: 'entertainment', label: 'Entertainment'},
        {value: 'utilities', label: 'Utilities'},
        {value: 'shopping', label: 'Shopping'},
        {value: 'other', label: 'Other'},
    ];

    //Filter and sort expenses
    let filteredExpenses = expenses;

    if (filterCategory !== 'all') {
        filteredExpenses = expenses.filter(expense => expense.category === filterCategory);
    }

    //Sort
    filteredExpenses = [...filteredExpenses].sort((a, b) => {
        if (sortBy === 'amount') {
            return b.amount - a.amount;
        } else if (sortBy === 'title') {
            return a.title.localeCompare(b.title);
        }
        return b.id - a.id; // Default: newest first
    });

    const totalFiltered = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

    const getCategoryIcon = (category) => {
        const icons = {
            food: '🍕',
            transport: '🚗',
            entertainment: '🎬',
            utilities: '⚡',
            shopping: '🛍️',
            other: '📦'
        };
        return icons[category] || '📦';
    };

    const handleDelete = (id, title) => {
        if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
            onDeleteExpense(id);
        }
    };

    return (
        <div className="card">
            <h2>All Expenses ({filteredExpenses.length})</h2>

            {/* Filters */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                <div className="form-group" style={{ marginBottom: 0, minWidth: '200px' }}>
                    <label htmlFor="filter-category">Filter by Category:</label>
                    <select
                        id="filter-category"
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                    >
                        {categories.map(cat => (
                            <option key={cat.value} value={cat.value}>
                                {cat.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group" style={{ marginBottom: 0, minWidth: '150px' }}>
                    <label htmlFor="sort-by">Sort by:</label>
                    <select
                        id="sort-by"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="date">Newest First</option>
                        <option value="amount">Highest Amount</option>
                        <option value="title">Title A-Z</option>
                    </select>
                </div>
            </div>

            {/* Summary */}
            {filterCategory !== 'all' && (
                <div style={{
                    background: '#f8f9fa',
                    padding: '1rem',
                    borderRadius: '8px',
                    marginBottom: '1.5rem',
                    textAlign: 'center'
                }}>
                    <strong>
                        {categories.find(cat => cat.value === filterCategory)?.label} Total:
                        <span style={{ color: '#ff6b6b', marginLeft: '0.5rem' }}>
              ${totalFiltered.toFixed(2)}
            </span>
                    </strong>
                </div>
            )}

            {/* Expense List */}
            {filteredExpenses.length === 0 ? (
                <div className="no-expenses">
                    {filterCategory === 'all' ? (
                        <>
                            <h3>No expenses yet!</h3>
                            <p>Click "Add Expense" to get started tracking your spending.</p>
                        </>
                    ) : (
                        <>
                            <h3>No expenses in this category</h3>
                            <p>Try selecting a different category or add a new expense.</p>
                        </>
                    )}
                </div>
            ) : (
                <div>
                    {filteredExpenses.map(expense => (
                        <div key={expense.id} className="expense-item">
                            <div className="expense-info">
                                <h4>
                  <span style={{ marginRight: '0.5rem' }}>
                    {getCategoryIcon(expense.category)}
                  </span>
                                    {expense.title}
                                </h4>
                                <p>
                  <span className={`category-${expense.category}`}>
                    {categories.find(cat => cat.value === expense.category)?.label.replace(/^.+?\s/, '')}
                  </span>
                                    {expense.description && (
                                        <span style={{ marginLeft: '1rem', color: '#999' }}>
                      • {expense.description}
                    </span>
                                    )}
                                </p>
                            </div>

                            <div className="expense-amount">
                                <span className="amount">${expense.amount.toFixed(2)}</span>
                                <span className="date">{expense.date}</span>
                                <button
                                    className="btn btn-danger"
                                    style={{ marginTop: '0.5rem', padding: '0.25rem 0.75rem', fontSize: '0.8rem' }}
                                    onClick={() => handleDelete(expense.id, expense.title)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ExpenseList;
