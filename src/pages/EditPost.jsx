import React, {useState, useEffect} from "react";
import {Link, useParams, useNavigate} from 'react-router-dom'
import {PostForm, Container} from '../components'
import appwriteService from '../appwrite/config'

export default function EditPost(){
    const {slug} = useParams()
    const [post, setPost] = useState(null)
    const navigate = useNavigate()
    useEffect(()=>{
        appwriteService.getPost(slug)
        .then(data => setPost(data))
        .catch(error => console.log(error))
    },[slug])
   
    return (
        <div>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    )
}