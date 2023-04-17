'use client'

import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { useCallback, useState } from 'react'
import {
    FieldValues,
    SubmitHandler,
    set,
    useForm
} from 'react-hook-form'

import Modal from "./Modal";
import useRegisterModal from '@/app/hooks/useRegisterModal'
import Heading from '../Heading'
import Input from '../inputs/input'
import { toast } from 'react-hot-toast'
import Button from '../Button'
import { signIn } from 'next-auth/react'

const RegisterModal = () => {
    //get defaults from zustand state
    const registerModal = useRegisterModal()

    const [ isLoading, setIsLoading ] = useState(false)
    
    const {
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm<FieldValues>({ defaultValues: { name: '', email: '', password: ''} })
    
    //register form submission function
    const onSubmit: SubmitHandler<FieldValues> = (data)=>{
        setIsLoading(true)
        axios.post('/api/register', data)
        
        .then((res)=>{
            console.log(res);
            
            registerModal.onClose()
        })
        .catch((e)=>{
            toast.error('Something went wrong!')
            console.log(e); 
        })
        .finally(()=>{
            setIsLoading(false)
        })
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading 
                title = 'Welcome to Airbnb'
                subtitle = 'Create an account'
            />
            <Input 
                id='email'
                type='email' 
                label= 'Email'
                disabled={isLoading}
                register={register}
                errors={ errors }
                required
                />
            <Input 
                id='name' 
                label= 'Name'
                type='text'
                disabled={isLoading}
                register={register}
                errors={ errors }
                required
                />
            <Input 
                id='password' 
                label= 'Password'
                type='password'
                disabled={isLoading}
                register={register}
                errors={ errors }
                required
                />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button
                outline
                label='Continue with Google'
                icon={FcGoogle}
                onClick={ ()=>{
                    try {
                        signIn('google')
                        
                    } catch (error) {
                        console.log(error);
                        
                    }
                }
            }
            />
            <Button
                outline
                label='Continue with Github'
                icon={AiFillGithub}
                onClick={()=>{
                    try {
                        signIn('github')
                        
                    } catch (error) {
                        console.log(error);
                        
                    }
                }}
            />
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className="flex items-center gap-2">
                    <div>Already have an account ?</div>
                    <div onClick={registerModal.onClose} className="text-neutral-800 cursor-pointer hover:underline">Log In</div>
                </div>
            </div>
        </div>
    )

    return ( <Modal 
                isOpen={registerModal.isOpen}
                disabled={isLoading}
                title='Register'
                actionLabel='Continue'
                body={bodyContent}
                footer={footerContent}
                onClose={registerModal.onClose}
                onSubmit={handleSubmit(onSubmit)}
                    /> );
}
 
export default RegisterModal;