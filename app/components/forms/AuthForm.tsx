'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useForm, FieldValues,SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Input from '../Input'
import axios from 'axios'
import Button from '../Button'
import AuthSocialButton from '../AuthSocialButton'
import { AiFillFacebook } from 'react-icons/ai'
import { signIn } from 'next-auth/react'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'

type Variant = 'LOGIN' | 'REGISTER'

const AuthForm = () => {
    const [variant, setVariant] = useState<Variant>("LOGIN");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();

    const session = useSession()

    useEffect(() => {
      if(session?.status === 'authenticated'){
        router.push('/home')
      }
  },[session?.status])

    const {
      register,
      handleSubmit,
      formState: {
        errors
      }
    } = useForm<FieldValues>({
      defaultValues: {
        username: '',
        email: '',
        password: ''
      }
    }); 

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
      //axios post
      setIsLoading(true)
      if(variant ==='REGISTER'){
        axios.post("/api/register", data)
        .then(() => {
          signIn('credentials', data)
      })
      .catch(() => toast.error("Something Went Wrong"))
      .finally(() => setIsLoading(false))
      }

      //signIn next-auth

      if(variant === 'LOGIN'){
        signIn('credentials', {
          ...data, 
            redirect: false
        }).then((callback) => {
          if(callback?.ok || !callback?.error){
            toast.success("Logged In");
            router.push('/home')
          }
          if(callback?.error){
            toast.error('Invalid Credentials')
        }
        }).finally(() => setIsLoading(false))
      }
    }

    const socialAction = (action: string) => {
        setIsLoading(true)

    }

    const onClick = useCallback(() => {
      return setIsPasswordVisible((prev) => !prev)
    },[isPasswordVisible])

    const toggleVariant = useCallback(() => {
      if (variant === "LOGIN"){
          setVariant("REGISTER")
      }else{
          setVariant('LOGIN')
      }
  }, [variant])

  return (
    <div className='flex flex-col w-full'>
      
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='space-y-3'>
            {variant === 'REGISTER' && (
              <Input 
              type='text'
              id='username'
              label='Username'
              required
              disabled={isLoading}
              errors={errors}
              register={register}
            />
            )}
            <Input 
              type='text'
              id='email'
              label='email'
              required
              disabled={isLoading}
              errors={errors}
              register={register}
            />
            <Input 
              type={isPasswordVisible ? 'text' : 'password'}
              id='password'
              label='Password'
              required
              disabled={isLoading}
              errors={errors}
              register={register}
              show
              onClick={onClick}
            />
            </div>
            <div>
              <Button
                type='submit'
                disabled={isLoading}
              >
                {variant === 'LOGIN' ? 'Sign In' : 'Sign Up'}
              </Button>
            </div>
        </form>
        <div>
        <div
            className='mt-6'>
                <div
                className='relative'>
                    <div
                    className='absolute
                    inset-0 flex items-center'>
                        <div
                        className='w-full border-t border-gray-300'/>
   
                    </div>
                    <div
                    className='relative flex justify-center text-sm'>
                        <span
                        className='bg-white text-gray-500 px-2'>
                            Or 
                        </span>
                    </div>
                </div>
                <div 
                className='mt-6 flex gap-2'>
                    <AuthSocialButton 
                        label='Log in with Facebook'
                        icon={AiFillFacebook}
                        onClick={() => socialAction('faceboook')}
                    />
                </div>
            </div>  
            <div className='flex items-center w-full justify-center cursor-pointer mt-4'>
              <p className='text-[12px] text-[#0093CF]'>Forgot password?</p>
            </div>
            <div className='w-full mt-3 flex justify-center items-center'>
              {variant === 'LOGIN' ? (
                <p>
                Don't have an account? <span onClick={toggleVariant} className='cursor-pointer'>
                  Sign up
                </span>
                </p> 
                ) : (
                  <p>Already have an account?      <span onClick={toggleVariant} className='cursor-pointer'>
                    Sign in
                    </span>
                </p>)}
            </div>
        </div>
      </div>
   
  )
}

export default AuthForm