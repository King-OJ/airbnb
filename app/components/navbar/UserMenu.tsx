'use client'
import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from '../Avatar'
import { useCallback, useState } from 'react'
import MenuItem from './MenuItem'
import useRegisterModal from '@/app/hooks/useRegisterModal'

export default function UserMenu() {
    const registerModal = useRegisterModal()
    const [isModalOpen, setIsModalOpen ] = useState(false)

    const toggleModal = useCallback(
        () => {
          setIsModalOpen((value)=> !value)
        },
        [],
      )


  return (
    <div className="relative">
        <div className="flex items-center gap-3">
            <div onClick={()=>{}} className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                Airbnb your home
            </div>
            <div onClick={toggleModal}  className="p-4 md:py-1 md:px-2 border-1px border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
                <AiOutlineMenu />
                <div className="hidden md:block">
                    <Avatar />
                </div>
            </div>
        </div>
        {isModalOpen && (
            <div className="absolute rounded-xl overflow-hidden shadow-md w-[50vw] md:w-[90%] bg-white right-0 top-12 z-20 text-sm">
                <div className="flex flex-col cursor-pointer">
                    <div className='divide-y-2'>
                        <div>
                            <MenuItem 
                            onClick={registerModal.onOpen} 
                            label='Sign Up'
                            />
                            <MenuItem 
                            onClick={()=>{}} 
                            label='Log in'
                            />
                        </div>
                        <div>
                            <MenuItem 
                            onClick={()=>{}} 
                            label='Airbnb your home'
                            />
                            <MenuItem 
                            onClick={()=>{}} 
                            label='Help'
                            />
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
  )
}
