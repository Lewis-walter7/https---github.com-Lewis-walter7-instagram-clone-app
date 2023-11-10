'use client'

import useUploadModal from '@/app/hooks/useUploadModal'
import { useEdgeStore } from '@/app/lib/edgestore';
import React, { useState, useEffect, useRef} from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { LiaPhotoVideoSolid } from 'react-icons/lia';
import { SingleImageDropzone } from '../SingleImageDropzone';
import { User } from '@prisma/client';
import { FaAngleDown,FaAngleUp } from 'react-icons/fa'
import Avatar from '../Avatar';
import Picker  from '@emoji-mart/react';
import data from '@emoji-mart/data'
import { GrEmoji } from 'react-icons/gr'
import { Emoji } from 'emoji-mart';
import axios from 'axios';

interface UploadModalProps{
  currentUser?: User | null
}

const UploadModal:React.FC<UploadModalProps> = ({
  currentUser
}) => {
  const [file, setFile] = React.useState<File>();
  const [caption, setCaption] = useState('')
  const [isOpen, setIsOpen] = useState(false);
  const [cursorPosition, setCursorPosition] = useState()
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { edgestore } = useEdgeStore();
  const uploadModal = useUploadModal();


  const [showModal, setShowModal] = useState(uploadModal.isOpen);

    useEffect(() => {
        setShowModal(uploadModal.isOpen)
    }, [uploadModal.isOpen])

    const handleClose = () => {
        uploadModal.onClose()
    }

    // const onEmojiClick = (e:any, emoji:Emoji) => {
    //   const ref = textareaRef.current
    //   const start = text.substring(0, ref?.selectionStart)
    //   const end = ref !==null ? text.substring(ref?.selectionEnd) : ''
    //   const msg = start + emoji + end
    //   setText(msg);
    //   setCursorPosition(start.length + emoji.)
    // }

    // useEffect(() => {
    //   if (textareaRef.current) {
    //       textareaRef.current?.selectionEnd = cursorPosition
    //   }
    // }, [cursorPosition])

    const handlePostUpload = async (e: any) => {
      e.preventDefault();
      if (file) {
        const { url } = await edgestore.publicFiles.upload({
          file
        });
        // you can run some server action or api here
        await axios.post('/api/post', { url, caption})
        // to add the necessary data to your database
        console.log(url);
        setCaption('')
      }
      uploadModal.onClose()
    }
    
    
    if(showModal) {
      return (
        <div className={`${showModal && 'bg-neutral-800/70 fixed md:justify-center md:items-center inset-0 z-100 flex outline-none h-full'}`}>  
        <div className='w-full md:w-4/5 sm:w-4/5 lg:w-4/6 xl:w-3/5 h-auto lg:h-auto m-2 sm:my-6 overflow-x-hidden overflow-y-auto'>
          <div className={`${showModal ? 'opacity-100' : 'opacity-0'}`}>
            <form onSubmit={handlePostUpload}>
              <div className='translate bg-[#262626] rounded-lg shadow-md md:h-auto w-full relative'>
                <div className='pt-3 flex items-center border-b border-gray-50/20'>
                  <p className='text-center flex-grow text-white text-2xl '>Create new post</p> 
                  <button onClick={handleClose} className='p-4'>
                    <AiOutlineCloseCircle 
                      className='rounded-full text-white'
                      size={20}
                    />
                  </button>
                </div>
                <div className='h-full md:h-[450px] md:space-y-4 space-x-3 w-full flex flex-col md:flex-row'>
                    {/* <LiaPhotoVideoSolid size={100} className="text-white"/>
                    <p className='text-center text-2xl text-white py-4'>Drag photos and videos here</p>
                    <input 
                        type="file" 
                        id='file'
                        className='w-0 h-0'/>
                    <label htmlFor="file">
                      <button className='rounded-lg text-white outline-none border-none p-2 bg-[#0093CF] w-fit'>
                        Select from computer
                      </button>
                    </label> */}
                    <div className='hidden lg:block'>
                      <SingleImageDropzone
                          width={400}
                          height={400}
                          value={file}
                          onChange={(file) => {
                            setFile(file);
                          }}
                          />
                    </div>
                    <div className='lg:hidden'>
                      <SingleImageDropzone
                      width={310}
                      height={280}
                      value={file}
                      onChange={(file) => {
                        setFile(file);
                      }} />
                    </div>
                  
                  
                    <div className='pt-2 overflow-hidden'>
                      <div className='flex items-center space-x-3'>
                        <Avatar user={currentUser}/>
                        <p className='text-white text-[20px]'>{currentUser?.username}</p>
                      </div>
                      <div className='py-3'>
                        <textarea name="caption" value={caption} onChange={(e) => setCaption(e.target.value)} className='w-full bg-[#262626] text-white outline-none resize-none' rows={3} placeholder='Write a caption'></textarea>
                      </div>
                      <div className=' flex justify-between items-center'>
                        <p onClick={() => setIsOpen((prev) => !prev)}>
                          <GrEmoji className="text-white text-2xl" />
                        </p>
                        <p className='text-white'>0/2000</p>
                      </div>
                      <div className={`${isOpen ? 'block' : 'hidden'} h-[80px] pt-2`}>
                        <Picker 
                          data={data} 
                          previewPosition='none' 
                          //onEmojiSelect = {onEmojiClick}
                        />
                      </div>
                      <div className={`${isOpen ? 'hidden' : 'block'}`}
                      >
                        <div className='flex justify-between items-center'>
                          <p className='text-white'>Add location</p>    
                        </div>
                        <div className='flex flex-col justify-center'>
                          <div className='flex justify-between'>
                            <p className='text-white'>Add accessibility</p>
                          </div>
                          <h1></h1>
                        </div>
                      </div>
                    </div>
                </div>
                <div>
                  <button type='submit' className='bg-blue-400 rounded-lg p-2 m-3'>
                    Share Post
                  </button>
                </div>
              </div>
            </form>
          </div>
      </div>
    </div>
      )
    } else {
      return null
    }
  
}

export default UploadModal