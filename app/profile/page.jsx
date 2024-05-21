'use client';
import React, { useState, useEffect, use } from 'react';
import { ethers } from 'ethers';
import { motion } from 'framer-motion';
import NavBar from '@/components/NavBar';
import { useAccount } from '@/context/AccountContext';
import UserLoans from '@/components/UserLoans';

const ProfilePage = () => {
  const [balance, setBalance] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { account, setAccount, provider, setProvider, setContract } = useAccount();

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const web3Provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(web3Provider);

      const accounts = await web3Provider.send('eth_requestAccounts', []);
      console.log('Accounts fetched:', accounts);
      setAccount(accounts[0]);

      const signer = await web3Provider.getSigner();
      const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
      setContract(contractInstance);
    } else {
      console.error('MetaMask is not installed');
    }
  };

  // useEffect(() => {
  //   if (account === null) {
  //     connectWallet();
  //   }
  // });

  const checkBalance = async () => {
    setIsLoading(true);
    if (account && provider) {
      const balance = await provider.getBalance(account);
      setBalance(ethers.formatEther(balance));
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center mt-10">
        <motion.img
          src="profile.png"
          alt="Profile Picture"
          className="w-32 h-32 rounded-full border-gradient-to-r from-[#9b5afc] to-[#00CC99] p-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        />
        <h1 className="mt-4 text-3xl font-bold text-gradient">Sahil Khirwal</h1>
        <p className="text-lg text-gray-700">Email: khirwalsahil@gmail.com</p>
        {account && (
          <div className="mt-4 text-lg ">
            <p>Connected Address: {account}</p>
            <p>Balance: {balance ? `${balance} ETH` : 'Balance not checked'}</p>
          </div>
        )}
        <button
          className="btn btn-outline btn-wide text-white flex justify-center gradient-button mt-4"
          onClick={checkBalance}
          disabled={isLoading}
        >

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

          {isLoading ? (
            <span className="loading loading-dots loading-lg text-white"></span>
          ) : (
            'Check Balance'
          )}
        </button>
      </div>
      <div>
        <h1 className="text-3xl font-bold text-center mt-10">Loan History</h1>
        <UserLoans />
      </div>
    </>
  );
};

export default ProfilePage;
