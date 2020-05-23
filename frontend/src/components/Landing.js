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
        const arrayBuffer = new Uint8Array(reader.result);

        console.log(arrayBuffer)

        //3mb
        var chunkSize = 5 * 1024 * 1024;
        var fileSize = arrayBuffer.length;
        var numChunks = Math.ceil(fileSize/chunkSize,chunkSize);
        var chunkIdx = 1;
      
        console.log('file size..',fileSize);
        console.log('chunks...',numChunks);
      
        // while (chunkIdx <= numChunks) {
            var offset = chunkIdx*chunkSize;
            console.log('current chunk..', chunkIdx);
            console.log('offset...', chunkIdx*chunkSize);
            console.log('file blob from offset...', offset)
            var chunk = arrayBuffer.slice(offset,offset+chunkSize)
            console.log(chunk);
            chunkIdx++;
            WebSocketInstance.send(chunk)
        // }
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