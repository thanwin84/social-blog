import React from "react";
import { Controller } from "react-hook-form";
import { Editor } from '@tinymce/tinymce-react';

export default function RTE({control, name, label, defaultValue=""}){
    
    return (
        <div className="w-full">
            {label && <label className="inline-block mb-1 pl-1">{label}</label>}
            <Controller
             control={control}
             name={name}
             render={({field: {onChange}})=>(
                <Editor
                apiKey='aijqk8lr84wbtu0s27vh1g8jxolnxrsf1k4bh39varur7hz2'
                initialValue={defaultValue}
                init={{
                    // plugins: ' tinycomments anchor autolink charmap codesample emoticons image link lists searchreplace table visualblocks wordcount     footnotes advtemplate advtable advcode editimage tableofcontents  ',
                    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                    tinycomments_mode: 'embedded',
                    tinycomments_author: 'Author name',
                    mergetags_list: [
                    { value: 'First.Name', title: 'First Name' },
                    { value: 'Email', title: 'Email' },
                    ],
                        ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                    }}
                    onEditorChange={(value)=> onChange(value)}
            />
             )}
            />
        </div>
    )
}