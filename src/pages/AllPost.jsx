import React, {useEffect, useState} from "react";
import appwriteService from '../appwrite/config'
import {PostCard, Container} from '../components'

export default function AllPost(){
    const [posts, setPosts] = useState([])
    
    useEffect(()=>{
        appwriteService.getPosts([])
        .then(posts => {
            if (posts){
                setPosts(posts.documents)
            }
        })
        .catch(error => console.log(error))
    },[])
    
    return (
        <div className="w-full flex">
            {posts.map(post=>(
                <div key={post.$id}>
                <PostCard {...post}/>
                </div>
            ))}
        </div>
    )
}