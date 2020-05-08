import React, {useCallback} from 'react'
import '../App.css'
import axios from 'axios'
import {useDropzone} from 'react-dropzone'

const Landing = () => {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        const binaryStr = reader.result
        console.log(binaryStr)
        axios.post('http://127.0.0.1:8000/', {
          encoded: binaryStr
        })
        .then(response => {
          console.log(response.status)
        })
        .catch(err => {
          console.log(err)
        })
      }
      reader.readAsArrayBuffer(file)
    })
    
  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
    <div className="Dropzone" {...getRootProps()}>
        <img
          alt="upload"
          className="Icon"
          src="baseline-cloud_upload-24px.svg"
        />
      <input className="FileInput" {...getInputProps()} />
      <span>Upload Files</span>
    </div>
  )
}

export default Landing;