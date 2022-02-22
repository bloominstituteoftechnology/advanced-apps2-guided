import React from 'react'

export default function Articles(props) {

  const { articles } = props

  return (
    <div className="articles">
      <h2>Articles</h2>
      {
        articles && articles.length && props.articles.map(art => {
          return (
            <div className="article" key={art.article_id}>
              <div>
                <h3>{art.title}</h3>
                <p>{art.text}</p>
                <p>topic: {art.topic}</p>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}
