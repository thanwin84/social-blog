import React from "react";

export default function Alert({
    type = 'success',
    message,
    className = ""
}){
    const styles = {
        success: "bg-green-300 text-green-600 rounded-sm p-2",
        danger: "bg-red-300 text-red-600 rounded-sm p-2 "
    }
    return (
        <p className={`${styles[type]} ${className}`}>
            {message}
        </p>
    )
}