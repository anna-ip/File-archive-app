import React, { useState, useRef } from 'react'

const FileUpload = () => {
  const fileInput = useRef() //* useRef defines an empty reference called fileInput, ref is like document.getElementById in JS but for React, since each browser Chrome or Safari etc. has its own way of uploading files.
  const [file, setFile] = useState('')
  const [fileName, setFileName] = useState('Choose File')
  const [uploadedFile, setUploadedFile] = useState({})
  const [user, setUser] = useState('')
  const [description, setDescription] = useState('')

  const onChange = (e) => {
    //setFile(e.target.files[0])
    setFileName(e.target.files[0].name) //* This changes the name in {fileName}
  }
  const API_URL = 'http://localhost:7000/upload'
  //const API_URL = 'https://files-archive.herokuapp.com/upload'  //! The deployed backend to Heroku is not working

  const onSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    //first 'file' is from backend and second file is from state
    //formData.append('file', file)
    formData.append('file', fileInput.current.files[0])
    console.log('file', file)
    formData.append('user', user) //attaches the meta data
    formData.append('descrption', description) //attaches the meta data

    try {
      fetch(API_URL, { method: 'POST', body: formData })
        .then((res) => res.json())
        .then((json) => {
          console.log(json)
        })
    } catch (err) {
      if (err.response.status === 500) {
        console.log('There was a problem with the server')
      } else {
        console.log(err.response.data.msg)
      }
    }
    // try {
    //   const res = await axios.post('http://localhost:7000/upload', formData, {
    //     header: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   })

    //   const { fileName, filePath } = res.data
    //   console.log('res.data', res.data)

    //   setUploadedFile({ fileName, filePath })
    //   console.log('setUploadedFile', fileName, filePath)
    // } catch (err) {
    //   if (err.response.status === 500) {
    //     console.log('There was a problem with the server')
    //   } else {
    //     console.log(err.response.data.msg)
    //   }
    //}
  }
  return (
    <>
      <form
        method='POST'
        enctype='mulitpart/form-data'
        className='container m-4'
        onSubmit={onSubmit}
      >
        {/** user and descrption are both controlled inputs **/}
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='user'
            className='form-control'
            id='user'
            placeholder='Name'
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Description</label>
          <input
            type='text'
            name='description'
            className='form-control'
            id='description'
            placeholder='Description'
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          />
        </div>
        <div className='custom-file'>
          {/**  the file input is an uncontrolled input **/}
          <input
            type='file'
            name='fileName'
            className='custom-file-input'
            id='fileName'
            ref={fileInput} // tells the input to use this reference
            onChange={onChange}
          />
          <label className='custom-file-label' htmlFor='fileName'>
            {/*  //! doesnt work, want show the name. */}
            {fileName}

            {/* {file} */}
            {/* {fileInput} */}
          </label>
        </div>

        <input
          type='submit'
          value='Upload file'
          className='btn btn-secondary btn-block mt-4'
        />
      </form>

      {uploadedFile ? (
        <div>
          <p>{uploadedFile.fileName}</p>
          <img src={uploadedFile.filePath} alt=''></img>
        </div>
      ) : null}
    </>
  )
}

export default FileUpload
