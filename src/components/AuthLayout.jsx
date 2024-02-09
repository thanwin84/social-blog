import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AuthLayout({children, authentication = true}){
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authstatus = useSelector(state => state.auth.status)

    useEffect(()=>{
        // need authentication but not loggen in, so login again
        if (authentication && authstatus !== authentication){
            navigate("/login")
        }
        // no need login for signup and login page
        else if (!authentication && authstatus !== authentication){
            navigate('/')
        } 
        setLoader(false)
    },[])
    return loader ? null: (
        <>{children}</>
    )
}