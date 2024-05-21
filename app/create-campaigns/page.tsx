'use client';
import { useEffect, useState } from 'react';
import React from 'react';
import { useAccount } from '@/context/AccountContext';
import { ethers } from 'ethers';
import toast, { Toaster } from 'react-hot-toast';
import NavBar from '@/components/NavBar';
import { useRouter } from 'next/navigation';
import { contractABI, contractAddress } from '../constants';

export default function ShowCampaigns() {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [amount, setAmount] = useState<string>('0');
    const [deadline, setDeadline] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const { account, setAccount, provider, setProvider, contract, setContract } = useAccount();

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

    useEffect(() => {
        if (account === null) {
            connectWallet();
        }
    });

    const handleCreateCampaign = async (e: React.FormEvent) => {
        e.preventDefault();
        await createLoanRequest();
    };

    const createLoanRequest = async () => {
        if (!provider) return;
        try {
            setLoading(true);
            const transaction = await contract?.createCampaign(
                account,
                title,
                description,
                ethers.parseEther(amount),
                new Date(deadline).getTime()
            );
            await transaction.wait();
            setLoading(false);
            toast.success('Campaign created successfully');
            console.log('Campaign created successfully', transaction);
            router.push('/show-campaigns');
        }
        catch (error) {
            console.error(error);
            toast.error('An error occurred while creating the campaign');
        }
    };

    return (
        <>
            <NavBar />
            <div className="flex flex-col items-center mt-10">
                <h1 className="text-2xl font-bold">Request for Funds</h1>
                {account && (
                    <form onSubmit={handleCreateCampaign} className="w-full max-w-lg mt-6 border m-4 p-4 rounded-xl">
                        <div className="mb-4">
                            <label className="block  text-sm font-bold mb-2" htmlFor="name">
                                Reason
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block  text-sm font-bold mb-2" htmlFor="description">
                                Description of Need
                            </label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block  text-sm font-bold mb-2" htmlFor="amount">
                                Amount (ETH)
                            </label>
                            <input
                                type="number"
                                id="amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block  text-sm font-bold mb-2" htmlFor="deadline">
                                Deadline
                            </label>
                            <input
                                type="date"
                                id="deadline"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <button className="btn btn-wide text-white flex justify-center gradient-button mx-auto" disabled={loading}>
                            {loading ? (
                                <span className="loading loading-dots loading-lg text-white"></span>
                            ) : (
                                'Request Funds'
                            )}
                        </button>
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
                    </form>
                )}
            </div>
        </>
    );
}
