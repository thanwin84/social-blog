import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    posts: null
}

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        populate: (state, action)=>{
            state.posts = action.payload
        },
        updatePost: (state, action)=>{
            state.posts = state.posts.map(item => item.$id === action.payload.$id ? action.payload: item)
        }
    }
})
export const {populate, updatePost} = postsSlice.actions

export default postsSlice.reducer