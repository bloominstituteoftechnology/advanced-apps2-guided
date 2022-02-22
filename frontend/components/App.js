import React, { useState } from 'react'
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom'
import Articles from './Articles'
import LoginForm from './LoginForm'
import ArticleForm from './ArticleForm'
import axiosWithAuth from '../axios'
import axios from 'axios'

const articlesUrl = 'http://localhost:9000/api/articles'
const loginUrl = 'http://localhost:9000/api/login'

export default function App() {
  const [articles, setArticles] = useState([])
  const [spinner, setSpinner] = useState(false)

  const navigate = useNavigate()

  const login = ({ username, password }) => {
    // hit the API, obtain JWT
    axios.post(loginUrl, { username, password })
      .then(res => {
        // persist token in client window.localStorage
        window.localStorage.setItem('token', res.data.token)
        // redirect user to /articles route
        navigate('/articles') // v.5 history.push('/articles')
      })
      .catch(err => {
        debugger
      })
  }

  const logout = () => {
    window.localStorage.removeItem('token')
    navigate('/')
  }

  const getArticles = () => {
    // const token = window.localStorage.getItem('token')
    // axios.get(articlesUrl, { headers: { Authorization: token } })
    setSpinner(true)
    axiosWithAuth().get(articlesUrl)
      .then(res => {
        setArticles(res.data.articles)
      })
      .catch(err => {
        if (err.response.status == 401) {
          navigate('/')
        } else {
          debugger
        }
      })
      .finally(() => {
        setSpinner(false)
      })
  }

  const postArticle = article => {
    axios
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
            <Articles spinner={spinner} articles={articles} getArticles={getArticles} />
          </>
        } />
      </Routes>
    </React.StrictMode>
  )
}
