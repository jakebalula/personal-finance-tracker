import React, {useState} from 'react';

function ExpenseForm({onAddExpense}) {
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        description: '',
        category: ''
    });

    const categories = [
        {value: 'food', label: 'Food and Dining'},
        {value: 'transportation', label: 'Transportation'},
        {value: 'entertainment', label: 'Entertainment'},
        {value: 'utilities', label: 'Utilities'},
        {value: 'shopping', label: 'Shopping'},
        {value: 'others', label: 'Other'},
    ];

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title || !formData.amount) {
            alert("Please enter a title and amount");
            return;
        }

        const expense = {
            ...formData,
            amount: parseFloat(formData.amount)
        };

        onAddExpense(expense);

        setFormData({
            title: '',
            amount: '',
            description: '',
            category: ''
        });

        alert('Expense added successfully.');
    };
    return (
        <div className="card">
            <h2>Add New Expense</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Expense Title *</label>
                    <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., Lunch at restaurant"
                    required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount *</label>
                    <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0.01"
                    required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description (Optional)</label>\
                    <input
                    type="text"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Additonal details..."
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        >
                        {categories.map(cat => (
                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                            ))}
                    </select>
                </div>
                <button type="submit" className="btn">
                    Add Expense
                </button>
            </form>
        </div>
    );
}

export default ExpenseForm;
