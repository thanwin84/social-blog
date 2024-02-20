import React, {useState} from "react";
import appwriteService from '../appwrite/config'
import { Link, useNavigate } from "react-router-dom";
import parse from 'html-react-parser'

export default function PostCard({$id, title, featureImage, content, slug}){
    const [image, setImage] = useState(null)
    appwriteService.getFilePreview(featureImage)
    .then(data => setImage(data.href))
    
    
    const _title = title.charAt(0).toUpperCase() + title.slice(1)
    
    return (
        <div className="p-4 rounded-lg w-full shadow-md">
            <Link to={`/posts/${$id}`}>
                <div className="flex">
                    <div className="h-40 w-2/6 lg:w-56 overflow-hidden rounded-md">
                        <img className="w-full h-full rounded-md object-cover" src={image} alt="" />
                    </div>

                    <div className="ml-4 w-4/6 flex flex-col justify-between">
                        <div>
                            <h4 className="text-xl font-medium  mb-2">{_title}</h4>
                            <p className="text-gray-900">{parse(content.slice(0, 100))}</p>
                        </div>
                        <div className="flex">
                            <div className="h-10 w-10 overflow-hidden rounded-full">
                                <img className="object-cover w-10 h-10 " src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww"/>
                            </div>
                            <p className="text-sm font-medium text-gray-800 ml-2 mt-2">user name</p>

                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}