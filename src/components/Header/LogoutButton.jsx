import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../store/authSlice";
import {populate} from '../../store/postsSlice'
import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function LogoutButton(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logoutHandler = ()=>{
        authService.logout()
        .then(()=> {
            dispatch(logout())
            dispatch(populate([]))
            navigate('/login')
        })
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

