import React, {useState, useEffect} from 'react';
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import Dashboard from './components/Dashboard';
import ExpenseList from './components/ExpenseList';
import BudgetTracker from './components/BudgetTracker';

function App() {
    const [expenses, setExpenses] = useState([]);
    const [budget, setBudget] = useState(0);
    const [activeTab, setActiveTab] = useState('dashboard');

    //Load data from local storage
    useEffect(() => {
        const savedExpenses = localStorage.getItem('expenses');
        const savedBudget = localStorage.getItem('budget');

        if (savedExpenses) {
            setExpenses(JSON.parse(savedExpenses));
        }
        if (savedBudget) {
            setBudget(parseFloat(savedBudget));
        }
    }, []);

    //Save expenses to local storage
    useEffect(() => {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }, [expenses]);
    useEffect(() => {
        localStorage.setItem('budget', budget.toString());
    }, [budget]);

    const addExpense = (expense) => {
        const newExpense = {
            ...expense,
            id: Date.now(),
            date: new Date().toLocaleDateString()
        };
        setExpenses([...expenses, newExpense]);
    };

    const deleteExpense = (id) => {
        setExpenses(expenses.filter(expense => expense.id !== id));
    };

    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const remainingBudget = budget - totalExpenses;

    return (
        <div className="App">
            <header className = "App-header">
                <h1>Personal Finance Tracker</h1>
                <nav className="nav-tabs">
                    <button className ={activeTab === 'dashboard' ? 'active' : ''}
                            onClick={() => setActiveTab('dashboard')}>
                        Dashboard
                        </button>
                    <button className ={activeTab === 'add-expense' ? 'active' : ''}
                            onClick={() => setActiveTab('add-expense')}>
                        Add Expense
                        </button>
                    <button className ={activeTab === 'expenses' ? 'active' : ''}
                            onClick={() => setActiveTab('expenses')}>
                        All Expenses
                        </button>
                    <button className ={activeTab === 'budget' ? 'active' : ''}
                            onClick={() => setActiveTab('budget')}>
                        Budget
                        </button>
                </nav>
            </header>
            <main className="main-content">
                {activeTab === 'dashboard' && (
                    <Dashboard
                        expenses={expenses}
                        budget={budget}
                        totalExpenses={totalExpenses}
                        remainingBudget={remainingBudget}
                        />
                ) }

                {activeTab === 'add-expense' && (
                    <ExpenseForm onAddExpense={addExpense} />
                )}
                {activeTab === 'expenses' && (
                    <ExpenseList
                        expenses={expenses}
                        onDeleteExpense={deleteExpense} />
                )}
                {activeTab === 'budget' && (
                    <BudgetTracker
                        budget={budget}
                        setBudget={setBudget}
                        totalExpenses={totalExpenses}
                        remainingBudget={remainingBudget}
                    />
                )}
            </main>
        </div>
    )
}
export default App;
