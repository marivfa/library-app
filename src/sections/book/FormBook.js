import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Autocomplete from '../../components/Autocomplete'
import '../../style.css'

import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { GetAll, Save } from '../../commons/Api'

export default function FormBook() {
  const { id } = useParams()
  const isAdd = !id
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm()

  const [categoryName, setCategoryName] = useState('')
  const [category, setCategory] = useState([])
  const navigate = useNavigate()

  const onCancel = () => {
    navigate('/book')
  }

  const handleChangeForm = id => {
    setValue('category_id', id, {
      shouldValidate: true,
    })
  }

  //Save Book
  const onSubmit = data => {
    const method = id ? 'PUT' : 'POST'
    delete data.id
    delete data.status

    const URL = id ? `book/${id}` : 'book'
    Save(URL, method, data).then(res => {
      if (res) {
        toast.success('Submitted successfully')
        onCancel()
      } else {
        toast.error(`Form submit error ${res.error} `)
      }
    })
  }

  //Get One Book -- Edit
  useEffect(() => {
    if (!isAdd) {
      GetAll(`book/${id}`).then(res => {
        if (res) {
          Object.entries(res).forEach(([key, value]) => {
            setValue(key, value)
            if (key === 'category') {
              setCategoryName(value)
            }
          })
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //Get Category -- Autocomplete
  useEffect(() => {
    GetAll('category').then(res => {
      if (res) {
        setCategory(res)
      }
    })
  }, [])

  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">
          {isAdd ? 'Add' : 'Edit'} Books
        </h6>
      </div>
      <div className="card-body">
        <form className="user" onSubmit={handleSubmit(onSubmit)}>
          <div className="row form-group">
            <div className="col-sm-6">
              <span> Select Category</span>
              <Autocomplete
                suggestions={category}
                handleChangeForm={handleChangeForm}
                categoryName={categoryName}
              />
              <span className="form-error">
                {errors.category_id && 'Category is required'}
              </span>
            </div>
            <div className="col-sm-6"></div>
          </div>
          <div className="row form-group">
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control"
                name="code"
                placeholder="Code"
                {...register('code', { required: true })}
              />
              <span className="form-error">
                {errors.code && 'Code is required'}
              </span>
            </div>
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control"
                name="title"
                placeholder="Title"
                {...register('title', { required: true })}
              />
              <span className="form-error">
                {errors.title && 'Title is required'}
              </span>
            </div>
          </div>
          <div className="row form-group">
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control"
                name="author"
                placeholder="Author"
                {...register('author', { required: true })}
              />
              <span className="form-error">
                {errors.author && 'Author is required'}
              </span>
            </div>
            <div className="col-sm-6">
              <input
                type="date"
                className="form-control"
                name="date_publication"
                placeholder="Date Publication"
                {...register('date_publication', { required: true })}
              />
              <span className="form-error">
                {errors.date_publication && 'Date is required'}
              </span>
            </div>
          </div>
          <hr />
          <div className="row form-group">
            <div className="offset-sm-4 col-sm-2">
              <button className="btn btn-primary btn-user btn-block">
                Save
              </button>
            </div>
            <div className="col-sm-2">
              <button
                className="btn btn-danger btn-user btn-block"
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
