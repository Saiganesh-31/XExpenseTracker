import React, { useState } from "react";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import "./Pagination.css";

function Pagination ({ setPageNum, pageNum, totalPages }) {

    const handlePrev = () => {
        if(pageNum > 1){
            setPageNum(pageNum - 1);
        }
    }

    const handleNext = () => {
        if(pageNum < totalPages){
            setPageNum(pageNum + 1);
        }
    }

    return (
        <div>
            <div className="paginationWrapper">
                <button onClick={handlePrev} disabled={pageNum === 1}>
                    <IoIosArrowRoundBack />
                </button>
                <p className="currentPage">{pageNum}</p>
                <button onClick={handleNext} disabled={totalPages === pageNum}>
                    <IoIosArrowRoundForward />
                </button>
            </div>
        </div>  
    );
}

export default Pagination;