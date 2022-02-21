import React from 'react'
import { Link } from 'react-router-dom'
import '../style.css'

import MainBook from '../sections/book/MainBook'
import MainCategory from '../sections/category/MainCategory'

const items = [
  {
    path: '/book',
    text: 'Book',
    comp: MainBook,
  },
  {
    path: '/category',
    text: 'Category',
    comp: MainCategory,
  },
]

export default function NavBar() {
  const li = items.map((item, index) => {
    return (
      <li className="nav-item" key={item.path}>
        <Link className="nav-link" to={item.path}>
          {item.text}
        </Link>
      </li>
    )
  })

  return (
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion">
      <a
        className="sidebar-brand d-flex align-items-center justify-content-center"
        href="index.html"
      >
        <div className="sidebar-brand-icon"></div>
        <div className="sidebar-brand-text mx-3">Library</div>
      </a>
      <hr className="sidebar-divider my-0"></hr>
      {li}
    </ul>
  )
}
