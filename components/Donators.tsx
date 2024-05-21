import { useAccount } from '@/context/AccountContext';
import { ethers } from 'ethers';
import React, { useState } from 'react';

interface RowProps {
    campaign: any;

}

const Donators: React.FC<RowProps> = ({ campaign }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [donations, setDonations] = React.useState<any[]>([]);

    const handleShowDonations = async (campaign: any, pId: number) => {
        const campaignDonations = await getDonations(campaign, pId);
        setDonations((prevDonations) => ({
            ...prevDonations,
            [pId]: campaignDonations,
        }));
        console.log(campaignDonations);
        setLoading(false);
    };

    const getDonations = async (campaign: any, pId: any) => {
        setLoading(true);
        const numberofDonations = campaign.donations.length;
        const parsedDonations = [];
        for (let i = 0; i < numberofDonations; i++) {
            parsedDonations.push({
                donator: campaign.donators[i],
                donation: ethers.formatEther(campaign.donations[i].toString())
            });
        }
        return parsedDonations;
    };

    return (
        <div key={campaign.pId} className="mb-4 p-4 border rounded-3xl shadow-sm text-wrap space-y-2">
            <h2 className="text-xl font-bold p-4">{campaign.title}</h2>
            <p>{campaign.description}</p>
            <p>Deadline: {new Date(campaign.deadline).toDateString()}</p>
            <p>Amount: {campaign.amount} ETH</p>
            <p>Collected: {campaign.amountCollected} ETH</p>
            <div className='flex justify-end'>
                <button
                    onClick={() => handleShowDonations(campaign, campaign.pId)}
                    className="btn btn-secondary btn-outline mt-2"
                    disabled={loading}
                >
                    {loading ? (
                        <span className="loading loading-dots loading-lg text-white"></span>
                    ) : (
                        'Show Donations'
                    )}
                </button></div>
            {donations[campaign.pId] && (
                <div className="mt-2 space-y-5">
                    <h3 className="text-lg font-bold">Donations</h3>
                    {donations[campaign.pId].length === 0 && <p className='font-bold'>No donations yet.</p>}
                    {donations[campaign.pId].length > 0 && (
                        <ul>
                            <div className="overflow-x-auto ">
                                <table className="table table-xs text-wrap">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Donator</th>
                                            <th>Donations</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {donations[campaign.pId].map((donation: any, index: any) => (
                                            <tr key={index}>
                                                <th>{index+1}</th>
                                                <td>{donation.donator}</td>
                                                <td>{donation.donation} ETH</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default Donators;
