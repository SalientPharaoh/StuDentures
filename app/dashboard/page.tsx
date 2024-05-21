'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import NavBar from '@/components/NavBar';
import toast, { Toaster } from 'react-hot-toast';
import { useAccount } from '@/context/AccountContext';

const Dashboard: React.FC<{}> = () => {
    const router = useRouter();
    const { account, provider, contract } = useAccount();

    useEffect(() => {
        if (account === null) {
            toast.error('Wallet Connection Failed!')
            router.push('/')
        }
        else {
            toast.success('Wallet Connected Successfully!');
            console.log('Account:', account);
            console.log('Provider:', provider);
            console.log('Contract:', contract);
        }
    });

    const showCampaigns = async () => {
        router.push('/show-campaigns');
    }

    const createCampaigns = async () => {
        router.push('/create-campaigns');
    }

    return (
        <>
            <Toaster />
            <NavBar />
            <div className='h-screen flex flex-col justify-center text-center w-[60%] mx-auto'>
                <motion.div className='relative flex items-center justify-center px-10 lg:px-8 text-center'>
                    <motion.h1 className="relative leading-20 font-jost text-3xl md:text-3xl font-bold m-4">
                        <motion.span
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.2, delay: 0.4 }}>
                            Transforming education: <br></br><br></br></motion.span>
                        <motion.span
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.2, delay: 0.4 }}
                            className='text-6xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#9b5afc] to-[#00CC99] m-4'>Peer-to-Peer Student Loan Management platform, where students lift each other up. </motion.span>
                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            className='h-[0.2rem] mt-40 w-full lg:w-full lg:absolute bg-gradient-to-r from-[#9b5afc] to-[#00CC99]'></motion.div>
                    </motion.h1>
                </motion.div>
                <div className='flex justify-between'>
                    <motion.span
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2, delay: 0.4 }}>
                        <div className='flex justify-center mt-10'>
                            <button className="btn btn-wide text-white flex justify-center gradient-button" onClick={showCampaigns}>Help A Student</button>
                        </div></motion.span>
                    <motion.span
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2, delay: 0.4 }}>
                        <div className='flex justify-center mt-10'>
                            <button className="btn btn-wide text-white flex justify-center gradient-button" onClick={createCampaigns}>Request Funds</button>
                        </div></motion.span>
                        <style jsx>{`
        .gradient-button {
          border: 2px solid;
          border-image-slice: 2;
          border-width: 2px;
          border-image-source: linear-gradient(to right, #9b5afc, #00CC99);
          background: transparent;
          color: #9b5afc;
          padding: 10px 20px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .gradient-button:hover {
          background: linear-gradient(to right, #9b5afc, #00CC99);
          color: white;
        }
      `}</style>
                </div>
            </div>
        </>
    );
}

export default Dashboard;