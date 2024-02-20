import React, {useEffect, useState} from "react";
import appwriteService from '../appwrite/config'
import { Container, PostCard } from "../components";
import {populate} from '../store/postsSlice'
import {useDispatch, useSelector} from 'react-redux'

export default function Home(){
    const [posts, setPosts] = useState([])
    const dispatch = useDispatch()
    const userStatus = useSelector(state => state.auth.status)

    useEffect(()=>{
        if (userStatus){
            appwriteService.getPosts()
            .then(posts => {
                setPosts(posts.documents)
                dispatch(populate(posts.documents))
            })
            .catch(error => console.log(error))
            }
    }, [])
    
    if (!posts){
        return (
            <Container>
                <div className="text-3xl text-center py-16 h-screen">
                <h2>Login to see Posts</h2>
            </div>
            </Container>
        )
    }
    // console.log(posts)
    return (
        <div className="w-full ">
           <Container>
            {posts.map(post=>(
                    <div key={post.$id} className="">
                        <PostCard {...post}/>
                    </div>
                ))}
           </Container>
        </div>
    )
}