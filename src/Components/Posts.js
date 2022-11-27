import React, { useState } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Link, Outlet, useParams } from 'react-router-dom'
import { AppData } from '../Context/Context'
import Error from './Error'
import Navbar from './Navbar'




export const Posts = () => {
    const { comm, post, user, photoData, removeItem } = AppData()

    // comm.slice(dataLimit).map((item) => {
    //     // console.log(item);
    // })
    // user.slice(dataLimit).map((item) => {
    //     // console.log(item);
    // })


    return (
        <div className='all'>
            {
                post.map((pst) =>
                    user.map((usr) =>
                        usr.id === pst.userId ?
                            <div key={pst.id} className='main'>
                                <div className='post'>
                                    {
                                        photoData.map((item) =>
                                            item.id === usr.id ?
                                                <div className='ig' ><img src={`${item.url}`} alt={`${item.title}`} /></div>
                                                : <></>
                                        )

                                    }
                                    <div className='content'>
                                        <Link to={`/posts/${pst.userId}`} className='post_title' > {pst.title}</Link>
                                        <p className='postAuthor'> By {usr.name} </p>
                                        <button onClick={() => removeItem(pst.id)}> Delete </button>
                                    </div>
                                </div>
                            </div> : <></>
                    )
                )
            }

        </div>
    )

}



export const PostDetails = () => {
    const { comm, post, user, dataLimit } = AppData()
    let [show, setShow] = useState(false);

    const { postID } = useParams();
    console.log("postid params:", postID);


    const postdetails = post.find((item) => item.userId == postID);
    console.log("post details:", postdetails);

    const userdetails = user.find((item) => item.id == postdetails.userId);
    console.log("user details:", userdetails);

    // const comments = comm.find((item) => item.postId == postdetails.id);
    let comments = comm.map((item) => {
        return item.postId == postdetails.id ? item : null
    });
    console.log("comments", comments);

    let count = 0;
    comments.map((item) => {
        console.log("item", item);
        if (item != null) count += 1;

        return count;
    })
    console.log("comments:", comments);
    console.log("count", count);

    return (
        <SkeletonTheme baseColor='hsla(245,90%,66%,1)' highlightColor='hsla(245,90%,56%,.4)'>
            <div className='post_details grid'>
                <Link to="/posts">Back to posts</Link>
                {/* <img src="null" alt='no image' /> */}

                < div key={`${postdetails.id}`}>
                    <h1 className='post_title' > {postdetails.title || <Skeleton />} </h1>
                    <h3 className='post_uthor'>By {userdetails.name || <Skeleton />} </h3>
                    <p className='post_details'> {postdetails.body || <Skeleton count={3} />} </p>
                    <div>
                        <p className='postComent_icon'> Comments: {count || <Skeleton />} </p>

                        <button className='link' onClick={() => setShow(!show)}> {show == true ? " Hide Comments" : "Show comments"}</button>
                        {
                            show == true ?
                                comments.map((item) => {
                                    console.log("item", typeof (item));
                                    if (item != null) {
                                        return (
                                            <div className='grid'>
                                                <h4>{item.name}</h4>
                                                <p>{item.email}</p>
                                                <p>{item.body}</p>
                                            </div>
                                        )
                                    }
                                })
                                :
                                <></>
                        }

                    </div>
                </div>

            </div>
        </SkeletonTheme>
    )
}

