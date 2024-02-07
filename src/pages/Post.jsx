import React, {useEffect, useState} from "react";
import appwriteService from '../appwrite/config'
import {Button, Container} from '../components'
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import parse from 'html-react-parser'
export default function Post(){

    
    const [image, setImage] = useState(null)
    const {slug} = useParams()
    const userData = useSelector(state => state.auth.userData)
    const posts = useSelector(state => state.posts.posts)
    const post = posts.filter(item => item.$id === slug)[0]
    const navigate = useNavigate()
    
    const isAuthor = post && userData ? post.userId === userData.$id : false
    
    // pass this data to another route
    
    
    useEffect(()=>{
        console.log('done')
        const fetchData = async()=>{
            try {
                const file = await appwriteService.getFilePreview(post.featureImage)
                setImage(file.href)
            } catch (error) {
                
            }
        }
        fetchData()
    }, [post.featureImage])
    
   

    if (!post){
        return <div>Loading..</div>
    }
    return (
        <Container>
            <div>
                <div className="w-full mt-4">
                    <img src={image} className="lg:w-3/6 w-5/6 mx-auto rounded-md"/>
                </div>
                <article >
                    <h2 className="text-2xl font-bold text-gray-900 mt-2">{post.title}</h2>
                    <p className="text-gray-700">{parse(post.content)}</p>
                </article>
                {
                    isAuthor && (
                        <div className="flex justify-end">
                            <Button
                                    category="success"
                                    onClick = {()=> navigate(`/posts/edit/${slug}`, {state: post})}
                                >
                                    update
                                </Button>
                            <Button
                                category='danger'
                                className="ml-6"
                            >
                                Delete
                            </Button>
                        </div>
                    )
                }
            </div>
        </Container>
    )
}