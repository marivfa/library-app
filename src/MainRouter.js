import React from 'react'
import { Route, Routes } from 'react-router-dom'

//Book
import MainBook from './sections/book/MainBook'
import FormBook from './sections/book/FormBook'
import MainCategory from './sections/category/MainCategory'
import FormCategory from './sections/category/FormCategory'

export default function MainRouter() {
  return (
    <Routes>
      <Route path="/" exact element={<MainBook />} />
      <Route path="/book" exact element={<MainBook />} />
      <Route path="/book/create" exact element={<FormBook />} />
      <Route path="/book/edit/:id" exact element={<FormBook />} />
      <Route path="/category" exact element={<MainCategory />} />
      <Route path="/category/create" exact element={<FormCategory />} />
      <Route path="/category/edit/:id" exact element={<FormCategory />} />
    </Routes>
  )
}
