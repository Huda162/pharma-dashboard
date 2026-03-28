/* eslint-disable react/prop-types */
import React from 'react'
const FilePreview = ({ file }) => {
  if (!file) return null

  if (file?.type?.startsWith('image/')) {
    return (
      <img
        src={URL.createObjectURL(file)}
        width="250"
        height="200"
        alt="preview"
        style={{ margin: '10px' }}
      />
    )
  } else if (file?.type?.startsWith('video/')) {
    return (
      <video width="250" height="200" controls style={{ margin: '10px' }}>
        <source src={URL.createObjectURL(file)} type={file.type} />
        Your browser does not support the video tag.
      </video>
    )
  }

  return null
}

export default FilePreview
