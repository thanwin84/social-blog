import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import {Input, Button, InputError, ProgressBar, Container} from './index'
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import {useForm} from 'react-hook-form'
import { login as authLogin } from "../store/authSlice";

export default function Login({className=""}){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [failed, setFailed] = useState(false)
    const [progress, setProgress] = useState(0)
    const {
        register, 
        handleSubmit,
        formState: {errors}
    } = useForm()
    
    const login = async(data)=>{
        setFailed(false)
        setIsSubmitting(true)
        try {
            const session = await authService.login(data)
           
            if (session){
                const userData = await authService.getCurrentUser()
                
                
                if (userData){
                    // console.log(userData)
                    dispatch(authLogin(userData))
                    navigate('/')
                }
            }
        } catch (error) {
           setFailed(true)
        }finally{
            setIsSubmitting(false)
        }
        
    }
    
    useEffect(()=>{
        let interval;
        if (isSubmitting){
            interval = setInterval(()=>{
                setProgress(prev => prev > 100 ? clearInterval(interval): prev + 10)
            }, 100)
        }
        return ()=> clearInterval(interval)
    }, [isSubmitting])

    return (
        <div className="w-full">
            
        <div className={`p-4  mx-auto shadow-lg rounded-md ${className}`}>
            
            <div className="text-center mb-6">
                <h2 className=" text-2xl font-bold mb-2 text-gray-700">Sign in to your account</h2>
                <p className=" text-black/60">Don't have any account ?
                    <Link
                    to="/signup"
                    className="text-black/80 hover:underline hover:text-blue-500"
                    >
                        Sign up
                    </Link>
                </p>
                {failed && <p className="text-red-500">Please try again</p>}
            </div>
            
            <form onSubmit={handleSubmit(login)} className="space-y-5">
                <div>
                    <Input
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        {...register("email", {
                            required: "This field is required",
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                    />
                    {errors.email && <InputError message={errors.email?.message}/>}

                </div>

                <div>
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: "This field is required.", 
                            minLength: {value: 8, message: "Password must be 8 characters long."}
                        }
                            
                        )}
                    />
                    {errors.password && <InputError message={errors.password?.message} />}
                    
                </div>
                <Button type='submit' 
                    category="primary" 
                    className= "w-full"
                    disabled={isSubmitting}
                >
                    {
                        isSubmitting ? "Logging...": "Login"
                    }
                </Button>
            </form>
        </div>
        
        <div className="absolute top-0 w-full">
                {isSubmitting && <ProgressBar value={progress} showParcentage={false} bgColor="transparent" className="h-1"/>}
            </div>
        </div>
    )
}