import React from 'react'
import { FieldErrors, UseFormRegister, FieldValues } from 'react-hook-form';

interface Inputprops {
  id: string;
  type: string;
  disabled?: boolean;
  label: string;
  register: UseFormRegister<FieldValues>
  required?: boolean;
  errors: FieldErrors
  show?: boolean
  onClick?: () => void;
}

const Input: React.FC<Inputprops> = ({
  type, onClick,
  disabled, register,label,errors,required,id, show
}) => {

  return (
    <div className='w-full relative'>
      <input type={type} 
        id={id}
        placeholder=" "
        autoComplete={id} 
        disabled={disabled} 
        {...register(id, {required})}
        className={`w-[300px] peer p-2 sm:leading-6 shadow-sm focus:border-gray-700 rounded-sm outline-none border border-gray-400  ${disabled && 'text-gray-600 cursor-not-allowed opacity-70'} ${errors[id] && 'focus:ring-rose-500'}`}
      />
      <label 
        className={`absolute text-[16px] top-2 left-2 transform duration-150 z-10 p origin-0 peer-focus:scale-75 peer-placeholder-shown:scale-100 
        peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-2 ${errors[id] ? 'text-red-500' :'text-gray-500'}}`}>{label}
      </label>
      {show && (
        <p className='absolute cursor-pointer right-2 top-2' onClick={onClick}>{type === 'password' ? "Show" : "Hide"}</p>
      )}
    </div>
  )
}

export default Input