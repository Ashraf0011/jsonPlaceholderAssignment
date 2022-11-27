import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

export const AppContext = React.createContext();
export const AppData = () => useContext(AppContext)

export const ContextWrapper = ({ children }) => {

    const [comm, setCom] = useState([]);
    const [post, setPost] = useState([]);
    const [user, setUser] = useState([]);
    const [photoData, setPhotoData] = useState([]);
    const [dataLimit, setLimit] = useState(12);

    async function getData() {
        console.log("called");
        const CommentAPI = 'https://jsonplaceholder.typicode.com/comments/';
        const UserAPI = 'https://jsonplaceholder.typicode.com/users/';
        const PostAPI = 'https://jsonplaceholder.typicode.com/posts/';
        const PhotoAPI = 'https://jsonplaceholder.typicode.com/photos';
        // try {
        //     let response = await fetch('https://jsonplaceholder.typicode.com/comments')
        //     let comments = await response.json()
        //     console.log("comments:", comments);
        // } catch (error) {
        //     console.log("erros at comments:", error);
        // }

        // try {
        //     let response = await fetch('https://jsonplaceholder.typicode.com/users')
        //     let users = await response.json()
        //     console.log("Users:", users);
        // } catch (error) {
        //     console.log("erros at users:", error);
        // }
        // try {
        //     let response = await fetch('https://jsonplaceholder.typicode.com/posts')
        //     let posts = await response.json()
        //     console.log("posts:", posts);
        // } catch (error) {
        //     console.log("erros at posts:", error);
        // }

        let commentsData = axios.get(CommentAPI);
        let UserData = axios.get(UserAPI);
        let PostsData = axios.get(PostAPI);
        let PhotoURL = axios.get(PhotoAPI);
        await axios.all([commentsData, UserData, PostsData, PhotoURL]).then(
            /**
             * You need to use axios.spread because it's used to 
             * spread the array of arguments into multiple arguments. 
             * This prevents errors when you are making 
             * multiple ajax requests with axios.all.
             */
            await axios.spread((res1, res2, res3, res4) => {
                setCom(res1.data);
                setUser(res2.data);
                setPost(res3.data);
                // console.log("res4", res4.data);
                /**
                 * limiting photo data
                 */

                // console.log(typeof (photos));
                let photosInContext = res4.data.slice(0, 100).map((item) => item);
                // console.log("context pgoto", photosInContext);

                setPhotoData(photosInContext);
            })
        ).catch((error) => {
            console.log("Message:", error);
        })

    }
    console.log(comm); // id, postId,  body, name, email
    console.log(post); // id, userId, body, title
    console.log(user); // id, email, name, phone
    console.log(photoData); //albumId,id,url,thumbnailUrl




    useEffect(() => {
        getData();
    }, [])

    const removeItem = (id) => {
        const val = (post.filter((item) => item.id !== id))
        setPost(val);
    }


    return (
        <AppContext.Provider value={{ comm, user, post, photoData, removeItem }}>
            {children}
        </AppContext.Provider>
    )
}
