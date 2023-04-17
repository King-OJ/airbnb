'use client'
import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from '../Avatar'
import { useCallback, useState } from 'react'
import MenuItem from './MenuItem'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'
import { User } from '@prisma/client'
import { signOut } from 'next-auth/react'

interface UserMenuProps {
    currentUser?: User | null
}

const UserMenu:React.FC<UserMenuProps> = ({ currentUser })=>{
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
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
                  {  currentUser ?

                    <div>
                        <MenuItem 
                        onClick={()=>{}} 
                        label='My trips'
                        />
                        <MenuItem 
                        onClick={()=>{}} 
                        label='My favorites'
                        />
                        <MenuItem 
                        onClick={()=>{}} 
                        label='My Properties'
                        />
                        <MenuItem 
                        onClick={()=>{}} 
                        label='Airbnb my home'
                        />
                        <hr />
                        <MenuItem 
                        onClick={()=> signOut()} 
                        label='Log Out'
                        />
                    </div>
                    :
                    <div>
                        <MenuItem 
                        onClick={registerModal.onOpen} 
                        label='Sign Up'
                        />
                        <MenuItem 
                        onClick={loginModal.onOpen} 
                        label='Log in'
                        />
                    </div>
                }
                </div>
            </div>
        )}
    </div>
  )
}

export default UserMenu
