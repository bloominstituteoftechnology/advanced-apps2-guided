import React, { useState } from 'react'

const initialFormValues = { title: '', text: '', topic: '' }

export default function ArticleForm(props) {
  const [values, setValues] = useState(initialFormValues)

  const isDisabled = () => {
    return Object.values(values).some(input => !input.trim().length)
  }

  return (
    <form id="form">
      <input
        maxLength={50}
        placeholder="Enter title"
        id="title"
      />
      <textarea
        maxLength={200}
        placeholder="Enter text"
        id="text"
      />
      <select id="topic">
        <option value="">-- Select topic --</option>
        <option value="JavaScript">JavaScript</option>
        <option value="React">React</option>
        <option value="Node">Node</option>
      </select>
        <button disabled={isDisabled()} id="submitArticle">Submit</button>
    </form>
  )
}
