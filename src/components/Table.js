import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../style.css'
import {
  faCheckCircle,
  faCircleMinus,
  faInfoCircle,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { Pagination } from 'react-bootstrap'
import ModalForm from './ModalForm'
import { Delete, GetAll } from '../commons/Api'
import { toast } from 'react-toastify'

const fontInfo = <FontAwesomeIcon icon={faInfoCircle} />
const fontDel = <FontAwesomeIcon icon={faTrash} />
const fontAvailable = <FontAwesomeIcon icon={faCheckCircle} />
const fontNonAvailable = <FontAwesomeIcon icon={faCircleMinus} />

export default function Table() {
  const cols = [
    { header: 'Code', field: 'code', type: 'text' },
    { header: 'Title', field: 'title', type: 'text' },
    { header: 'Author', field: 'author', type: 'text' },
    { header: 'Date Publication', field: 'date_publication', type: 'date' },
  ]

  const initParams = {
    code: '',
    author: '',
    title: '',
    date_publication: '',
  }
  const [params, setParams] = useState(initParams)

  const [data, setData] = useState([])

  const [modalShow, setModalShow] = useState(false)
  const [objBook, setObjBook] = useState([])

  const navigate = useNavigate()
  const onEdit = id => {
    navigate(`/book/edit/${id}`)
  }

  //BtnDelete
  const onDel = id => {
    Delete(`book/${id}`).then(res => {
      if (res) {
        toast.success('Book Deleted')
        getData()
      }
    })
  }

  //Modal
  const handleShow = book => {
    setModalShow(true)
    setObjBook(book)
  }

  const handleClose = () => {
    setObjBook([])
    setModalShow(false)
    getData()
  }

  //Pagination
  const handleClick = url => {
    GetAll('book', url).then(res => {
      if (res) {
        setData(res)
      }
    })
  }

  //Filters
  const handleChange = event => {
    const { name, value } = event.target
    setParams(prevFormData => {
      return {
        ...prevFormData,
        [name]: value,
      }
    })
  }

  useEffect(() => {
    let queryString = Object.keys(params)
      .map(key => (params[key] ? key + '=' + params[key] : ''))
      .join('&')

    GetAll(`book?${queryString}`).then(res => {
      if (res) {
        setData(res)
      }
    })
  }, [params])

  const getData = () => {
    GetAll('book').then(res => {
      if (res) {
        setData(res)
      }
    })
  }

  //Initial Data
  useEffect(() => {
    getData()
  }, [])

  const rows = data?.data?.map((book, index) => {
    return (
      <tr key={index}>
        <td>{book.code}</td>
        <td>{book.title}</td>
        <td>{book.author}</td>
        <td>{book.date_publication}</td>
        <td>
          <button
            title={book.status === 'active' ? 'Available' : 'Non available'}
            className={`btn btn-circle btn-sm ${
              book.status === 'active' ? 'btn-success' : 'btn-warning'
            }`}
            onClick={() => handleShow(book)}
          >
            {book.status === 'active' ? fontAvailable : fontNonAvailable}
          </button>
          &nbsp;
          <button
            title="Edit"
            className="btn btn-primary btn-circle btn-sm"
            onClick={() => onEdit(book.id)}
          >
            {fontInfo}
          </button>
          &nbsp;
          <button
            title="Delete"
            className="btn btn-danger btn-circle btn-sm"
            onClick={() => onDel(book.id)}
          >
            {fontDel}
          </button>
        </td>
      </tr>
    )
  })

  const columns = cols.map((column, index) => {
    return <th key={index}>{column.header}</th>
  })

  const columnsFilter = cols.map((column, index) => {
    return (
      <td key={column.field}>
        <input
          type={column.type}
          className="form-control"
          name={column.field}
          onKeyUp={handleChange}
        />
      </td>
    )
  })

  const pagination = data?.links?.map((link, index) => {
    return (
      <Pagination.Item
        key={index}
        active={link.active}
        onClick={() => handleClick(link.url)}
      >
        {index === 0
          ? 'Previous'
          : index === data.links.length - 1
          ? 'Next'
          : link.label}
      </Pagination.Item>
    )
  })

  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">Books</h6>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table
            className="table table-bordered"
            id="dataTable"
            width="100%"
            cellSpacing="0"
          >
            <thead>
              <tr>
                {columnsFilter}
                <td></td>
              </tr>
              <tr>
                {columns}
                <td></td>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
          <div className="row no-margin">
            <div className="offset-sm-3 col-sm-8">
              <Pagination>{pagination}</Pagination>
            </div>
          </div>
        </div>
      </div>
      {modalShow}{' '}
      <ModalForm show={modalShow} handleClose={handleClose} objBook={objBook} />
    </div>
  )
}
