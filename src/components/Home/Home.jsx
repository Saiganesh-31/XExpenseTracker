import React, { useEffect, useState } from "react";
import "./Home.css";
import BalanceCard from "../BalanceCard";
import ExpenseCard from "../ExpenseCard/ExpenseCard";
import AddBalanceForm from "../Forms/AddBalanceForm/AddBalanceForm";
import CustomModal from "../CustomModal";
import { getItem, setItem } from "../Utils/localStorage";
import AddExpenseForm from "../Forms/AddExpenseForm/AddExpenseForm";
import PieChartComponent from "../PieChart/PieChart";
import Pagination from "../Pagination/Pagination";
import "../Pagination/Pagination.css";
import TransactionList from "../TransactionList/TranactionList";
import BarChartComponent from "../BarChart/BarChart";

function Home() {
const [balance, setBalance] = useState(() => {
  const item = getItem("balance");
  return Number(item) || 5000;
});

const [expenses, setExpenses] = useState(() => {
  const item = getItem("expenses");
  return Number(item) || 0;
});

const [expenseList, setExpenseList] = useState(() => {
  const item = getItem("expenseList");
  return item || [];
});

const [pageNum, setPageNum] = useState(1);
const itemsPerPage = 3;

const totalPages = Math.ceil(expenseList.length / itemsPerPage);

const [isOpenBalnce, setIsOpenBalance] = useState(false);
const [isOpenExpenseForm, setIsOpenExpenseForm] = useState(false);

const [editIndex, setEditIndex] = useState(null);

const handleBalance = () => {
  setIsOpenBalance(true);
}

const handleExpense = () => {
  setIsOpenExpenseForm(true);
}

const handleCloseBalanceForm = () => {
  setIsOpenBalance(false);
}

const handleCloseExpenseForm = () => {
  setIsOpenExpenseForm(false);
}

const handleAddBalance = (price) => {
  setBalance(prev => prev + Number(price));
}

const handleAddExpense = (newExpense) => {
  if(editIndex != null){
    const oldExpense = expenseList[editIndex];

    const priceDiff = Number(newExpense.price) - Number(oldExpense.price);

    const updatedList = [...expenseList];
    updatedList[editIndex] = newExpense;

    setExpenseList(updatedList);
    setExpenses(prev => prev + priceDiff);
    setBalance(prev => prev - priceDiff);

    setEditIndex(null);
  }
  else{
    setExpenseList((prev) => [...prev, newExpense]);

    setExpenses((prev) => prev + Number(newExpense.price));

    setBalance((prev) => prev - Number(newExpense.price));
  }
  setIsOpenExpenseForm(false);
}

const onEditExpense = (index) => {
  setEditIndex(index);
  setIsOpenExpenseForm(true);
}

const onDeleteExpense = (index) => {
  const expenseToDelete = expenseList[index];

  const price = Number(expenseToDelete.price);
  setBalance(prev => prev + price);
  setExpenses(prev => prev - price);

  const updatedList = expenseList.filter((_, i) => i != index);
  setExpenseList(updatedList);

  if((updatedList.length % itemsPerPage === 0) && pageNum > 1){
    setPageNum(prev => prev - 1);
  }
}

const pieData = [
  {name: "Food", value: expenseList.filter(e => e.category === "Food").reduce((acc, curr) => acc + Number(curr.price), 0)},
  {name: "Entertainment", value: expenseList.filter(e => e.category === "Entertainment").reduce((acc, curr) => acc + Number(curr.price), 0)},
  {name: "Travel", value: expenseList.filter(e => e.category === "Travel").reduce((acc, curr) => acc + Number(curr.price), 0)},
];

const barChartData = [
  {name: "Entertainment", value: expenseList.filter(e => e.category === "Entertainment").reduce((acc, curr) => acc + Number(curr.price), 0)},
  {name: "Food", value: expenseList.filter(e => e.category === "Food").reduce((acc, curr) => acc + Number(curr.price), 0)},
  {name: "Travel", value: expenseList.filter(e => e.category === "Travel").reduce((acc, curr) => acc + Number(curr.price), 0)},
];

useEffect(() => {
  setItem("balance", balance);
  setItem("expenses", expenses);
  setItem("expenseList", expenseList);
}, [balance, expenses, expenseList]);

  return (
    <div>
      <h1>Expense Tracker</h1>
      <div className="cardsWrapper">
        <BalanceCard balance={balance} openBalanceForm={handleBalance} />
        <ExpenseCard expenses={expenses} openExpenseForm={handleExpense} />
        <PieChartComponent data={pieData} />
      </div>
      <CustomModal open={isOpenBalnce} onClose={handleCloseBalanceForm}>
        <AddBalanceForm closeBalanceForm={handleCloseBalanceForm} onSubmitIncome={handleAddBalance} />
      </CustomModal>
      <CustomModal open={isOpenExpenseForm} onClose={handleCloseExpenseForm}>
        <AddExpenseForm 
          closeExpenseForm={handleCloseExpenseForm} 
          onSubmitExpenseForm={handleAddExpense}
          defaultExpense={editIndex != null ? expenseList[editIndex] : null}
        />
      </CustomModal>
      <div className="dashBoardLayout">
      {expenseList.length <= 0 ? (
        <div className="transactionSection">
            <h1>Recent Transactions</h1>
            <div className="paginationWrapper" 
                  style={{
                    justifyContent: "flex-start", 
                    backgroundColor: "rgba(255, 255, 255, 1)",
                    borderRadius: "10px",
                    }}>
                <p style={{
                  fontFamily: "ubuntu",
                  fontSize: "1rem",
                  padding: "10px"
                }}>No Transactions!</p>
            </div>
        </div>  
      ) : (
        <div className="transactionSection">
          <h1>Recent Transactions</h1>
          <div style={{
            background: "#ffffff",
            borderRadius: "10px",
          }}>
            <TransactionList 
              expenseList={expenseList} 
              pageNum={pageNum} 
              itemsPerPage={itemsPerPage} 
              onEditExpense={onEditExpense}
              onDeleteExpense={onDeleteExpense}
            />
            <div style={{
              display: "flex",
              justifyContent: "center"
            }}>
              <Pagination pageNum={pageNum} setPageNum={setPageNum} totalPages={totalPages} />
            </div>
          </div>
        </div>
      )}
      <div className="chartSection">
        <h2 style={{
          fontFamily: "ubuntu",
          color: "white",
          fontSize: "2rem",
          fontWeight: "700",
          fontStyle: "italic"
        }}>Top Expenses</h2>
        <div style={{
          backgroundColor: "rgba(255, 255, 255, 1)",
          borderRadius: "10px",
          padding: "10px",
        }}>
          <BarChartComponent data={barChartData} />
        </div>
      </div>
      </div>
    </div>
  );
}

export default Home;
