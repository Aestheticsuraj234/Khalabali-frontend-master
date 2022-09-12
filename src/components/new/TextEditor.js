import React from 'react'
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';


import  "../../styles/Editor.css";

const TextEditor = () => {
  return (
    <div>  <ReactQuill className="shadow-sm"
      theme="snow"
      style={{
        height: 300,
        marginTop: '1rem',
        display: 'flex',
        flexDirection: 'column'


      }}



      modules={{
        toolbar: [
          [
            // { 'header': '1' }, { 'header': '2' },
            { 'font': [] }], [{ size: [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ 'align': [] }],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
          ['link', "video", "image", "code-block"],
          ['clean']
        ],
      }}
      formats={[
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote', 'color', 'background',
        'list', 'bullet', 'indent', 'link', 'video', 'image', "code-block", "align"
      ]}

    /></div>
  )
}

export default TextEditor