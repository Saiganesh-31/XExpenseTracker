import React, { useState } from "react";
import { Modal, Box } from "@mui/material";


function CustomModal ({ open, onClose, children }) {
    return (
        <div className="CustomWrapper">
            <Modal 
                open={open} 
                onClose={onClose}
                slotProps={{
                    backdrop: {
                        sx: {
                            backgroundColor: "rgba(255, 255, 255, 0.77)"
                        },
                    },
                }}
                >
                <Box sx={{
                    position: "absolute",
                    width: "95%",
                    maxWidth: "572px",
                    top: "50%",
                    left: "50%",
                    transform: "translateX(-50%) translateY(-50%)",
                    height: "fit-content",
                    maxHeight: "90vh",
                    background: "#eeeeee",
                    border: "none",
                    borderRadius: "15px",
                    padding: "2rem"
                }}>
                    {children}
                </Box>
            </Modal>
        </div>
    );
}

export default CustomModal;
