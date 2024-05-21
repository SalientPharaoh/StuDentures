'use client';
import React, { useEffect } from 'react'
import { useAccount } from '../context/AccountContext';
import { useRouter } from 'next/navigation';
import { ethers } from 'ethers';
import Donators from './Donators';

function UserLoans() {
    const { account, provider, contract, disconnectWallet } = useAccount();
    const [campaigns, setCampaigns] = React.useState<any[]>([]);

    const getUserCampaigns = async () => {
        const allCampaigns = await contract?.getCampaigns();
        const filterCampaigns = allCampaigns.filter(
            (campaign: any) => campaign.owner.toUpperCase() === account?.toUpperCase()
        );
        console.log('Filtered Campaigns:', filterCampaigns);
        const parsedCamapigns = filterCampaigns.map((campaign: any, i: any) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            amount: ethers.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toString(),
            amountCollected: ethers.formatEther(campaign.amountCollected.toString()),
            pId: i,
            donators: campaign.donators,
            donations: campaign.donations
        }));
        setCampaigns(parsedCamapigns);
    };

    useEffect(() => {
        if (contract) {
            getUserCampaigns();
            console.log('Contract:', contract);
            console.log('Account:', account);
            console.log('Provider:', provider);
            console.log('Campaigns:', campaigns);
        }
    });


    return (
        <>
            {account && campaigns.length === 0 && (
                <p className="mt-4">You have not created any campaigns.</p>
            )}
            {account && campaigns.length > 0 && (
                <div className="w-[85%] mt-6 grid grid-cols-2 gap-12 mx-auto">
                    {campaigns.map((campaign) => (
                        <Donators key={campaign.pId} campaign={campaign} />
                    ))}
                </div>
            )}
        </>
    )
}

export default UserLoans