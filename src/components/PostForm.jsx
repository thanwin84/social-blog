import React, {useCallback, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {Button, Input, Select, RTE, InputError} from './index'
import {set, useForm} from 'react-hook-form'
import appwriteService from '../appwrite/config'
import { useSelector } from "react-redux";

export default function PostForm(post){
    const {
        handleSubmit, 
        register, 
        control,
        watch,
        setValue,
        getValues
    } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active"
        }
    })
   
    TODO:
    console.log(getValues())
    console.log(post.post)

    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)
    

    const submit = async(data)=>{
        if (post){
            const file = data.image[0] ? appwriteService.uploadFile(data.image[0]) : null

            if (file){
                appwriteService.deleteFile(post.featuredImage)
            }
            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featureImage: file ? file.$id: undefined
            })
            if (dbPost){
                navigate(`/posts/${dbPost.$id}`)
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0])

            if (file){
                console.log(userData.$id)
                const fileId = file.$id
                data.featureImage = fileId
                const dbPost = await appwriteService.createPost({
                    ...data,
                    userId: userData.$id
                })
                console.log(data)
                if (dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
            }

        }
    }
    
    

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
                        defaultValue="Welcome to note"
                    />
                </div>
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
                             src = {appwriteService.getFilePreview(post.featureImage)}
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
                    <Button type="submit" className="ml-2">
                        {post ? "Update": "Submit"}
                    </Button>
                </div>
            </div>
            
        </form>
    )
}