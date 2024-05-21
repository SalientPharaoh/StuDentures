'use client';
import { useEffect, useState } from 'react';
import React from 'react';
import { useAccount } from '@/context/AccountContext';
import { ethers } from 'ethers';
import toast, { Toaster } from 'react-hot-toast';
import NavBar from '@/components/NavBar';
import CampaignRequest from '@/components/CampaignRequest';
import { contractABI, contractAddress } from '../constants';

export default function ShowCampaigns() {
    const [campaigns, setCampaigns] = useState<any[]>([]);
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

    const getCampaigns = async () => {
        try {
            const campaigns = await contract?.getCampaigns();
            const parsedCamapigns = campaigns.map((campaign: any, i: any) => ({
                owner: campaign.owner,
                title: campaign.title,
                description: campaign.description,
                amount: ethers.formatEther(campaign.target.toString()),
                deadline: campaign.deadline.toString(),
                amountCollected: ethers.formatEther(campaign.amountCollected.toString()),
                pId: i
            }));
            setCampaigns(parsedCamapigns);
        } catch (error) {
            console.error(error);
            toast.error('An error occurred while fetching campaigns');
        }
    };

    useEffect(() => {
        if (account === null) {
            connectWallet();
        }
    });

    useEffect(() => {
        if (contract) {
            getCampaigns();
        }
    });

    return (
        <>
            <Toaster />
            <NavBar />
            <div className="container mx-auto mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {campaigns.map((campaign) => (
                        <CampaignRequest key={campaign.pId} campaign={campaign} />
                    ))}
                </div>
            </div>
        </>
    );
}
