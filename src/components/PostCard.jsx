import React, {useState} from "react";
import appwriteService from '../appwrite/config'
import { Link, useNavigate } from "react-router-dom";

export default function PostCard({$id, title, featureImage, content, slug}){
    const [image, setImage] = useState(null)
    appwriteService.getFilePreview(featureImage)
    .then(data => setImage(data.href))
    
    
    const _title = title.charAt(0).toUpperCase() + title.slice(1)
    
    return (
        <div className="p-4 rounded w-full shadow-md">
            <Link to={`/posts/${$id}`}>
                <div className="h-40 overflow-hidden rounded-md">
                    <img className="w-full rounded-md object-cover" src={image} alt="" />
                </div>
                <h4 className="text ml-2 font-medium mt-2">{_title}</h4>
            </Link>
        </div>
    )
}