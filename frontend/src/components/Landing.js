import React, {useCallback} from 'react'
import '../App.css'
import {useDropzone} from 'react-dropzone'
import WebSocketInstance from '../services/WebSocket'

const Landing = () => {
  const onDrop = useCallback((acceptedFiles) => {

    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')

      reader.onload = () => {
        const arrayBuffer = reader.result;

        console.log(new Uint8Array(arrayBuffer))
        console.log(WebSocketInstance.state())
        WebSocketInstance.send(new Uint8Array(arrayBuffer))
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