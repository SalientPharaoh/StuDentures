'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { motion } from 'framer-motion';
import { useAccount } from '../context/AccountContext';
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
  const router = useRouter();
  const { account, connectWallet } = useAccount();

  useEffect(() => {
    if (account) {
      router.push('/dashboard');
    }
  });

  return (
    <>
    <Toaster />
      <div className='h-screen flex flex-col justify-center text-center'>
        <motion.div className='relative flex items-center justify-center px-18 lg:px-30 text-center'>
          <motion.h1 className="tagline relative leading-20 font-jost text-3xl md:text-4xl font-bold">
            <motion.span
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.4 }}>
              Empower education: <br></br></motion.span>
            <motion.span
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className='text-6xl  md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#9b5afc] to-[#00CC99]'> seamless Peer-to-Peer Student Loan Management platform, where students support students. </motion.span>
            <div className='flex items-center justify-center'>
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                // transition={{ duration: 1.2}}
                className='h-[0.2rem] absolute lg:-bottom-60 w-1/2 bg-gradient-to-r from-[#9b5afc] to-[#00CC99]'></motion.div>
            </div>
          </motion.h1>
        </motion.div>
        <motion.span
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}>
          <div className='flex justify-center mt-10'>
            <button className="btn btn-wide text-white flex justify-center gradient-button" onClick={connectWallet}>Connect Wallet</button>

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
          </div></motion.span>
      </div >
    </>
  );
}
