import React from 'react'
import { useRouteError } from 'react-router-dom'


const Error = ({ er }) => {
    let error = useRouteError();
    console.log(error);
    return (
        <div className='error'>
            <h1>Uh oh, something went terribly wrong 😩</h1>
            <h2> {er.message} || {er} </h2>
            <pre>{error.message || JSON.stringify(error)}</pre>
            <button onClick={() => (window.location.href = "/")}>
                Click here to reload the app
            </button>
        </div>
    )
}




export default Error