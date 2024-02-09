import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../store/authSlice";
import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";

export default function LogoutButton(){
    const dispatch = useDispatch()
    const logoutHandler = ()=>{
        authService.logout()
        .then(()=> dispatch(logout()))
    }
    return (
        <button 
         className="ml-3 text-gray-600 font-medium"
         onClick={logoutHandler}
        >
            Logout
        </button>
    )
}

