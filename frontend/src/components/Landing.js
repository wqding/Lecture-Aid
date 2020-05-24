import React, {useCallback} from 'react'
import '../App.css'
import {useDropzone} from 'react-dropzone'
import WebSocketInstance from '../services/WebSocket'

const Landing = () => {
  const onDrop = useCallback((acceptedFiles) => {

    acceptedFiles.forEach(async (file) => {
      var chunkSize = 5 * 1024 * 1024;
      var fileSize = file.size;
      var numChunks = Math.ceil(fileSize/chunkSize,chunkSize);
      var chunkIdx = 0;
      var fileIdx = 0;
    
      console.log('file size..',fileSize);
      console.log('chunks...',numChunks);
    
      while (chunkIdx <= numChunks) {
        var offset = chunkIdx*chunkSize;
        console.log('current chunk..', chunkIdx);
        console.log('offset...', chunkIdx*chunkSize);
        console.log('file blob from offset...', offset)
        var chunk = file.slice(offset,offset+chunkSize)
        
        chunk.arrayBuffer().then(arrayBuffer => {
          arrayBuffer = new Uint8Array(arrayBuffer);
          WebSocketInstance.send({"chunkIdx": fileIdx, "arrayBuffer": arrayBuffer});
          fileIdx++;
        }).catch(err => {
          WebSocketInstance.send(err)
        });
        
        chunkIdx++;
      }
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