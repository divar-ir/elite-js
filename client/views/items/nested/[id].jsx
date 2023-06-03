import React from 'react'
import { Link } from 'react-router-dom'

export default function NestedItem ({ item }) {
  return (
    <>
      <p>{ item }</p>
      <p>
        <Link to="/">Go to the index</Link>
      </p>
    </>
  )
}
