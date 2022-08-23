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
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const login = ({ username, password }) => {
    axios.post(loginUrl, { username, password })
      .then(res => {
        const { token } = res.data
        localStorage.setItem('token', token)
        navigate('/articles')
      })
      .catch(err => {
        debugger
      })
  }

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  const getArticles = () => {
    axios({
      method: 'get',
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
      .then(res => {
        debugger
      })
      .catch(err => {
        debugger
      })
  }

  const postArticle = (article) => {

  }

  return (
    <>
      <button id="logout" onClick={logout}>Logout</button>
      <h1>Advanced Applications</h1>
      <div>{error}</div>
      <nav>
        <NavLink id="loginScreen" to="/">Login</NavLink>
        <NavLink id="articlesScreen" to="/articles">Articles</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<LoginForm login={login} />} />
        <Route path="articles" element={
          <>
            <ArticleForm />
            <Articles
              articles={articles}
              setError={setError}
              getArticles={getArticles}
            />
          </>
        } />
      </Routes>
    </>
  )
}
