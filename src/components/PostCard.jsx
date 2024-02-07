import React, {useState} from "react";
import appwriteService from '../appwrite/config'
import { Link, useNavigate } from "react-router-dom";

export default function PostCard({$id, title, featureImage, content, slug}){
    const [image, setImage] = useState(null)
    appwriteService.getFilePreview(featureImage)
    .then(data => setImage(data.href))
    
    
    
    
    return (
        <div className="p-4 rounded w-full shadow-md">
            <Link to={`/posts/${$id}`}>
                <div>
                    <img className="w-full rounded-md" src={image} alt="" />
                </div>
                <h4 className="text-xl ml-2 font-medium mt-2">{title}</h4>
            </Link>
        </div>
    )
}