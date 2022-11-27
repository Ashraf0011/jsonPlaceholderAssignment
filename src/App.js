import React from 'react'
import { BrowserRouter as Router, Outlet, Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import Error from './Components/Error'
import { PostDetails, Posts } from './Components/Posts'
import { ContextWrapper } from './Context/Context'
import './app.scss'
import Navbar from './Components/Navbar'

const SharedInfo = () => {

  return (
    <div className="grid">
      <Navbar />
      <div className='top'>
        <h1>Unknown Bloggers </h1>
        <h4>Haven for widely known annomymus personals.  </h4>
      </div>
      <Outlet />
    </div>
  )
}


const App = () => {
  return (
    <Router>
      <ContextWrapper>
        <Routes>
          <Route path='/' element={<SharedInfo />} >
            <Route index element={<Home />} />
            <Route path='/posts' element={<Posts />} />
            <Route path='/posts/:postID' element={<PostDetails />} errorElement={<Error />} />
            {/* <Route path='*' element={<Error />} /> */}
          </Route>
        </Routes>
      </ContextWrapper>
    </Router>
  )
}

export default App