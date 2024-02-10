import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import {Input, Button, InputError} from './index'
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import {useForm} from 'react-hook-form'
import { login } from "../store/authSlice";

export default function Signup(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [failed, setFailed] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const {
        register, 
        handleSubmit,
        formState: {errors}
    } = useForm()
    
    const create = async(data)=>{
        setFailed(false)
        setIsSubmitting(true)
        try {
            const user = await authService.createAccount(data)
            if (user){
                const userData = await authService.getCurrentUser()
                console.log("userdata: ", userData)
                if (userData){
                    dispatch(login(userData))
                    navigate('/')
                }
            }
        } catch (error) {
           setFailed(true)
        }finally{
            setIsSubmitting(false)
        }
    }
    
    return (
        <div className="p-4 w-4/6 mx-auto shadow-md rounded-md max-w-xl">
            <div className="text-center mb-6">
                <h2 className=" text-2xl font-bold mb-2">Sign up to create account</h2>
                <p className=" text-black/60">Already have an account ?
                    <Link
                    to="/login"
                    className="text-black/80 hover:underline hover:text-blue-500"
                    >
                        Sing In
                    </Link>
                </p>
                {failed && <p className="text-red-500 text-sm">Please try again</p>}
            </div>
            
            <form onSubmit={handleSubmit(create)} className="space-y-5">
                <div>
                    <Input
                        label="Full Name"
                        placeholder="Full Name"
                        {...register("name", {required: "This field is required"})}
                    />
                    {errors.name && <InputError message={errors.name?.message}/>}
                </div>
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
                <Button type='submit' category="primary" className="w-full">
                    {
                        isSubmitting ? "Creating acount....": "Create a account"
                    }
                </Button>
            </form>
        </div>
    )
}