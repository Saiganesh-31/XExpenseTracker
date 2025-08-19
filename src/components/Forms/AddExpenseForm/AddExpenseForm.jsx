import React, { useState } from "react";
import "./AddExpenseForm.css";

function AddExpenseForm ({ closeExpenseForm, onSubmitExpenseForm, defaultExpense }) {
    const [formData, setFormData] = useState(() => ({
        title: defaultExpense?.title || "",
        amount: defaultExpense?.amount || "",
        category: defaultExpense?.category || "Food",
        date: defaultExpense?.date || ""
    }));

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Expense details", formData);
        onSubmitExpenseForm(formData);

        closeExpenseForm();

        setFormData({
            title: "",
            amount: "",
            category: "",
            date: ""
        });
    };

    return (
        <div className="form-Wrapper">
            <h3>Add Expenses</h3>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                <input 
                    type="number"
                    name="amount"
                    placeholder="Price"
                    value={formData.amount}
                    onChange={handleChange}
                    required  
                />
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                >
                    <option>Food</option>
                    <option>Entertainment</option>
                    <option>Travel</option>
                </select>
                <input 
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required  
                />
                <button type="submit">Add Expense</button>
                <button className="cancelButton" onClick={closeExpenseForm}>Cancel</button>
            </form>
        </div>
    );
}

export default AddExpenseForm;