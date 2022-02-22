import React, { useState } from 'react'

const initialFormValues = {
  username: '',
  password: '',
}
export default function LoginForm(props) {
  const [values, setValues] = useState(initialFormValues)

  const onChange = evt => {
    const { id, value } = evt.target
    setValues({ ...values, [id]: value })
  }

  const onSubmit = evt => {
    evt.preventDefault()

  }

  const isDisabled = () => {
    Object.values(values).some(input => !input.trim().length)
  }

  return (
    <form id="loginForm">
      <h2>Login</h2>
      <input
        maxLength={20}
        value={values.username}
        onChange={onChange}
        placeholder="Enter username"
        id="username"
      />
      <input
        maxLength={20}
        value={values.password}
        onChange={onChange}
        placeholder="Enter password"
        id="password"
      />
      <button disabled={isDisabled()} id="submitCredentials">Submit credentials</button>
    </form>
  )
}
