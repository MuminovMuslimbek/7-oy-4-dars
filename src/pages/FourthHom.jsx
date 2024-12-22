import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video']
  ]
}

function FourthHom() {
  const [value, setValue] = useState('')

  return (
    <div className='relative w-full h-[92.7vh]'>
      <div className='flex justify-center items-center w-full h-full'>
        <div className='relative flex justify-center items-center w-[50%] h-full'>
          <ReactQuill className='w-full h-full' modules={modules} theme="snow" value={value} onChange={setValue} />
        </div>
        <div className='relative p-[10px] border-black border-l w-[50%] h-full overflow-y-scroll' dangerouslySetInnerHTML={{ __html: value }} />
      </div>
    </div>
  )
}

export default FourthHom