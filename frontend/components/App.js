import React, { useState } from 'react'
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom'
import Articles from './Articles'
import LoginForm from './LoginForm'
import ArticleForm from './ArticleForm'
import axios from 'axios'

const articlesUrl = 'http://localhost:9000/api/articles'
const loginUrl = 'http://localhost:9000/api/login'

export default function App() {
  const [articles, setArticles] = useState([])

  const login = ({ username, password }) => {
    // hit the API, obtain JWT
    // persist token in client window.localStorage
    // redirect user to /articles route
    axios.post(loginUrl, { username, password })
      .then(res => {
        debugger
      })
      .catch(err => {
        debugger
      })
  }

  const logout = () => {

  }

  const getArticles = () => {

  }

  const postArticle = article => {

  }

  return (
    <React.StrictMode>
      <button id="logout" onClick={logout}>Logout</button>
      <h1>Advanced Applications</h1>
      <nav>
        <NavLink id="loginScreen" to="/">Login</NavLink>
        <NavLink id="articlesScreen" to="/articles">Articles</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<LoginForm login={login} />} />
        <Route path="articles" element={
          <>
            <ArticleForm />
            <Articles articles={articles} />
          </>
        } />
      </Routes>
    </React.StrictMode>
  )
}
