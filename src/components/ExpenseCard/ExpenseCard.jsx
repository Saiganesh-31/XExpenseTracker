import React, { useState } from "react";
import "./ExpenseCard.css";

function ExpenseCard ({ expenses, openExpenseForm }) {
    return (
        <div className="expenseCard">
            <h3>Expenses: <span>₹{expenses}</span> </h3>
            <button type="button" onClick={openExpenseForm}>+ Add Expense</button>
        </div>
    );
}

export default ExpenseCard;