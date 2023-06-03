import React from 'react'
import { Link } from 'react-router-dom'

export default function NestedItemsIndex ({ todoList = [] }) {
  return (
    <>
      <ul>{
        todoList.map((item, i) => {
          return <li key={`item-${i}`}><Link to={`/items/nested/${i}`}>{item}</Link></li>
        })
      }</ul>
      <p>
        <Link to="/">Go to the index</Link>
      </p>
    </>
  )
}
