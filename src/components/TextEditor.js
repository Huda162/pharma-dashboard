/* eslint-disable react/prop-types */

import React, { useEffect } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './test.css'

const QuillEditor = ({ value, onChange }) => {
  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      ['link', 'image'],
      ['clean'],
    ],
  }

  const formats = [
    'header',
    'font',
    'list',
    'bullet',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'link',
    'image',
  ]

  useEffect(() => {
    onChange(value)
  }, [value, onChange])

  return (
    <div className="quill-editor">
      <ReactQuill value={value} onChange={onChange} modules={modules} formats={formats} />
    </div>
  )
}

export default QuillEditor
