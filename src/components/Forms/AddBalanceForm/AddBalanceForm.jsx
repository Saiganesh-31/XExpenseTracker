import React, { useState } from "react";
import { useSnackbar } from "notistack";
import "./AddBalanceForm.css";

function AddBalanceForm ({ closeBalanceForm, onSubmitIncome }) {
    const [amount, setAmount] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const numericAmount = Number(amount);

        if(!isNaN(numericAmount) && numericAmount > 0){
            onSubmitIncome(numericAmount);
            setAmount("");
            closeBalanceForm();
        }
    }

    return (
        <div className="formWrapper">
            <h3>Add Balance</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    placeholder="Income Amount"
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
                <button type="submit">Add Balance</button>
                <button className="cancelButton" onClick={closeBalanceForm}>Cancel</button>
            </form>
        </div>
    );
}

export default AddBalanceForm;