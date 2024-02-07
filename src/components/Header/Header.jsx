import React from "react";
import {Container, LogoutButton} from '../index'
import {useSelector} from 'react-redux'
import {  Link, NavLink } from "react-router-dom";
import { isPending } from "@reduxjs/toolkit";

export default function Header(){
    const authStatus = useSelector(state => state.auth.status)
    
    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus
        },
        {
            name: "All Post",
            slug: "/all-post",
            active: authStatus
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus
        }
    ]
    return (
        <header className="py-3 shadow bg-gray-100 ">
            <Container>
            <nav className="flex">
                <div>
                    <Link to='/'>
                        Logo
                    </Link>
                </div>
                <ul className="flex ml-auto">
                    {
                        navItems.map(item => (
                            item.active ? (
                                <li key={item.name}>
                                    <NavLink
                                        to = {item.slug}
                                        className={({isActive, isPending})=> (
                                            isActive ? "ml-3 text-gray-900    font-medium" : 
                                            "ml-3 text-gray-600  transition-colors duration-300 ease-in-out hover:text-gray-900 font-medium"
                                        )}
                                    >
                                        {item.name}
                                    </NavLink>
                                </li>
                            ): null
                        ))
                    }
                    {
                        authStatus && (
                            <li>
                                <LogoutButton/>
                            </li>
                        )
                    }
                </ul>
            </nav>
            </Container>
        </header>
    )
}
