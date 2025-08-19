import React, { useState } from "react";
import { PiPizza } from "react-icons/pi";
import { FiEdit2 } from "react-icons/fi";
import { LiaTimesCircleSolid } from "react-icons/lia";
import { IoGiftOutline } from "react-icons/io5";
import { IoCarSportOutline } from "react-icons/io5";
import "./TransactionList.css";

function TransactionList ({ expenseList, pageNum, itemsPerPage, onEditExpense, onDeleteExpense }) {
    const StartIndex = (pageNum - 1) * itemsPerPage;
    const currentItems = expenseList.slice(StartIndex, StartIndex + itemsPerPage);

    const getCategoryIcon = (category) => {
        const iconStyle = {
            height: "38px",
            width: "38px",
            borderRadius: "50%",
            backgroundColor: "rgba(217, 217, 217, 1)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "10px"
        };

        switch (category) {
            case "Food": 
                return <div style={iconStyle}><PiPizza size={20} /></div>;

            case "Entertainment":
                return <div style={iconStyle}><IoGiftOutline size={20} /></div>;

            case "Travel":
                return <div style={iconStyle}><IoCarSportOutline size={20} /></div>;
            
            default:
                return null;
        }
    };

    return (
        <div className="transactionListWrapper">
            {currentItems.map((item, index) => (
                <div className="transactionItem" key={index}>
                    {
                        getCategoryIcon(item.category)
                    }
                    <div style={{
                        flex: 1
                    }}>
                        <p style={{margin: "0", fontWeight: "bold"}}>{item.title}</p>
                        <p style={{margin: 0, color: "rgba(155, 155, 155, 1)"}}>{item.date}</p>
                    </div>
                    <p style={{marginRight: "10px", color: "rgba(244, 187, 74, 1)"}}>₹{item.amount}</p>
                    <div className="deleteIcon"
                        onClick={() => onDeleteExpense(StartIndex + index)}
                    >
                        <LiaTimesCircleSolid size={14} />
                    </div>
                    <div className="editIcon"
                        onClick={() => onEditExpense(index)}
                    >
                        <FiEdit2 size={14} />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TransactionList;