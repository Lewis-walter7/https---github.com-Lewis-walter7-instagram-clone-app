'use client'

import useUploadModal from '@/app/hooks/useUploadModal'
import { useEdgeStore } from '@/app/lib/edgestore';
import React, { useState, useEffect} from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { LiaPhotoVideoSolid } from 'react-icons/lia';
import { SingleImageDropzone } from '../SingleImageDropzone';
import { User } from '@prisma/client';
import { FaAngleDown,FaAngleUp } from 'react-icons/fa'
import Avatar from '../Avatar';
import Picker  from '@emoji-mart/react';
import data from '@emoji-mart/data'
import { GrEmoji } from 'react-icons/gr'

interface UploadModalProps{
  currentUser?: User | null
}

const UploadModal:React.FC<UploadModalProps> = ({
  currentUser
}) => {
  const [file, setFile] = React.useState<File>();
  const [text, setText] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState(null)
  const [isOpen, setIsOpen] = useState(false);
  const { edgestore } = useEdgeStore();
  const uploadModal = useUploadModal();


  const [showModal, setShowModal] = useState(uploadModal.isOpen);

    useEffect(() => {
        setShowModal(uploadModal.isOpen)
    }, [uploadModal.isOpen])

    const handleClose = () => {
        uploadModal.onClose()
    }

    const handleChange = (e:any) => {
      setText(e.target.value + selectedEmoji);
    }
    
    if(showModal) {
      return (
        <div className={`${showModal && 'bg-neutral-800/70 fixed justify-center items-center inset-0 z-100 flex outline-none h-full'}`}>  
        <div className='w-full md:w-4/5 sm:w-4/5 lg:w-4/6 xl:w-3/5 h-auto lg:h-auto my-6  overflow-x-hidden overflow-y-auto'>
          <div className={`${showModal ? 'opacity-100' : 'opacity-0'}`}>
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
              <div className='h-[450px] grid grid-cols-2 w-full place-content-center px-4'>
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
                  </label>                  */}
                  <SingleImageDropzone
                      width={400}
                      height={400}
                      value={file}
                      onChange={(file) => {
                        setFile(file);
                      }}
                  />
                  <div className='pl-5 overflow-hidden'>
                    <div className='flex items-center space-x-3'>
                      <Avatar user={currentUser}/>
                      <p className='text-white text-[20px]'>{currentUser?.username}</p>
                    </div>
                    <div className='py-3'>
                      <textarea name="caption" className='w-full bg-[#262626] text-white outline-none resize-none' rows={5} placeholder='Write a caption' value={text} onChange={handleChange}></textarea>
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
                        onEmojiSelect = {(e:any) => {
                          setSelectedEmoji(e.native)
                        }}
                      />
                    </div>
                    <div className={`${isOpen ? 'hidden' : 'block'}`}
                    >
                      <div>
                        <p>Add location</p>    
                      </div>
                      <div className='flex flex-col justify-center'>
                        <div>
                          <p>Add accessibility</p>
                        </div>
                        <h1></h1>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
      </div>
    </div>
      )
    } else {
      return null
    }
  
}

export default UploadModal