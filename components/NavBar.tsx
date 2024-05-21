'use client';
import React from 'react'
import { useAccount } from '../context/AccountContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';


function NavBar() {
    const router = useRouter();
    const {disconnectWallet } = useAccount();
    
    const goToProfile = async () => {
        router.push('/profile');
    };

    return (
        <div className="navbar bg-black">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl font-bold">StuDentures</a>
            </div>
            <div className="flex-none gap-2">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <Image alt="Tailwind CSS Navbar component" src="/profile.png"
                            width={30} height={30} />
                        </div>
                    </div>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-48">
                        <li>
                        <button className='text-center' onClick={goToProfile}>Profile</button>
                        </li>
                        <li><button className='text-center' onClick={disconnectWallet}>Logout</button></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NavBar