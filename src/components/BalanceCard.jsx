import React, { useState } from "react";
import "./BalanceCard.css";

function BalanceCard ({ balance, openBalanceForm}) {
    return (
        <div className="balanceCard">
            <h3>Wallet Balance: <span>₹{balance}</span></h3>
            <button onClick={openBalanceForm}>+Add Income</button>
        </div>
    );
}

export default BalanceCard;