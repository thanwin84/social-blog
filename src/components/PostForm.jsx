import React, {useCallback, useEffect, useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {Button, Input, Select, RTE, InputError} from './index'
import {set, useForm} from 'react-hook-form'
import appwriteService from '../appwrite/config'
import { useSelector, useDispatch } from "react-redux";
import { updatePost } from "../store/postsSlice";

export default function PostForm(){
    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)
    const dispatch = useDispatch()
    const location = useLocation()
    const [isSubmitting, setSubmitting] = useState(false)
    const post = location.state || ""
    const [image, setImage] = useState(null)
    const {
        handleSubmit, 
        register, 
        control,
        watch,
        setValue,
        getValues,
    } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active"
        }
    })
    
    const submit = async(data)=>{
        setSubmitting(true)
        // if post already exists
        if (post){
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null

            if (file){
                appwriteService.deleteFile(post.featuredImage)
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featureImage: file ? file.$id: undefined
            })
            //update the global state
            dispatch(updatePost(dbPost))
            if (dbPost){
                navigate(`/posts/${dbPost.$id}`)
            }
        } else {
            // since post does not exist, create a new post
            const file = await appwriteService.uploadFile(data.image[0])

            if (file){
                const fileId = file.$id
                data.featureImage = fileId
                const dbPost = await appwriteService.createPost({
                    ...data,
                    userId: userData.$id
                })

                if (dbPost){
                    navigate(`/posts/${dbPost.$id}`)
                }
            }

        }
    }
    
    useEffect(()=>{
        if (post){
            appwriteService.getFilePreview(post.featureImage)
            .then(data => setImage(data.href))
            }
    },[image])

    const slugTransformation = useCallback((value)=>{
        if (value && typeof value ==="string"){
            return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d]+/g, "-")
            
        }
    }, [])

    useEffect(()=>{
        const subscription = watch((value, {name, type})=>{
            if (name == 'title'){
                setValue('slug', slugTransformation(value.title), {shouldValidate: true})
            }
        })
        return ()=> subscription.unsubscribe()
    }, [watch, setValue, slugTransformation])
    
    

    return (
        <form onSubmit={handleSubmit(submit)}>
            <div className="flex w-full p-2">
                {/* left side */}
                <div className="w-4/6">
                    <Input 
                        label="Title"
                        placeholder="Title"
                        className="mb-2"
                        {...register('title', {required: true})}
                    />
                    <Input 
                        label="Slug"
                        placeholder="Slug"
                        className="mb-2"
                        {...register('slug', {required: true})}
                        autoComplete="off"
                    />
                    <RTE
                        control={control}
                        name="content"
                        label="Content: "
                        defaultValue={getValues("content")}
                    />
                </div>
                {/* right side */}
                <div className="ml-2 w-2/6">
                    <Input 
                        label="Featured Image"
                        type="file"
                        className="mb-2"
                        {...register("image", {required: !post})}
                    />
                    {post && (
                        <div className="w-full mb-4">
                            <img
                             src = {image}
                             alt = {post?.title}
                             className="rounded-lg"
                            />
                        </div>
                    )}
                    <Select 
                     options = {["active", "inactive"]}
                     className="mb-2"
                     {...register('select', {required: true})}
                    />

                    TODO: it should show submitting
                    <Button type="submit" className="ml-2">
                        {post ? "Update": "Submit"}
                    </Button>
                </div>
            </div>
            
        </form>
    )
}