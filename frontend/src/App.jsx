import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './pages/Home'
import ClusterPage from './pages/ClustersPage'
import ArticlePage from './pages/ArticlePage'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/clusters" element={<ClustersPage/>}/>
        <Route path="/article/:id" element={<ArticlePage/>}/>
    
    </Routes>    
    </BrowserRouter>
  )
}

export default App
