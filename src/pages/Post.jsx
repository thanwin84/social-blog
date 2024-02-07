import React, {useEffect, useState} from "react";
import appwriteService from '../appwrite/config'
import {Button, Container} from '../components'
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import parse from 'html-react-parser'
export default function Post(){

    const [post, setPost] = useState(null)
    const [image, setImage] = useState(null)
    const {slug} = useParams()
    const userData = useSelector(state => state.auth.userData)
    
    const isAuthor = post && userData ? post.userId === userData.$id : false
    

    useEffect(()=>{
        const fetchData = async()=>{
            try {
                const userDetails = await appwriteService.getPost(slug)
                setPost(userDetails)
                const file = await appwriteService.getFilePreview(userDetails.featureImage)
                setImage(file.href)
            } catch (error) {
                
            }
        }
        fetchData()
    }, [])
    
   

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
                            <Link to={`/posts/${slug}/edit`}>
                                <Button
                                    category="success"
                                >
                                    update
                                </Button>
                            </Link>
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