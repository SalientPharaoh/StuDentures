import { useAccount } from '@/context/AccountContext';
import { ethers } from 'ethers';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

interface RowProps {
    campaign: any;

}


const CampaignRequest: React.FC<RowProps> = ({ campaign }) => {

    const [amount, setAmount] = useState<string>('0');
    const { contract } = useAccount();
    const [loading, setLoading] = useState<boolean>(false);


    const handleInputChange = (value: string) => {
        setAmount(value);
    };

    const donate = async (pId: any, amount: any) => {
        setLoading(true);
        try {
            const campaignData = await contract?.donateToCampaign(pId,
                {
                    value: ethers.parseEther(amount)
                }
            );
            await campaignData.wait();
            toast.success('Donation successful');
            setAmount('0');
        } catch (error) {
            console.error(error);
            toast.error('An error occurred while donating to the campaign');
        }
        setLoading(false)
    };

    return (
        <div key={campaign.pId} className="card w-96 border rounded-3xl shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{campaign.title}</h2>
                <p>{campaign.description}</p>
                <p><strong>Target Amount:</strong> {campaign.amount} ETH</p>
                <p><strong>Deadline:</strong> {campaign.deadline}</p>
                <p><strong>Amount Collected:</strong> {campaign.amountCollected} ETH</p>
                <div className="card-actions flex justify-between items-baseline">
                    <input
                        type="number"
                        className="input input-bordered w-2/3"
                        placeholder="Amount in ETH"
                        value={amount}
                        onChange={(e) => handleInputChange(e.target.value)}
                    />
                    <button
                        className="btn btn-primary btn-outline"
                        onClick={() => donate(campaign.pId, amount)}
                        disabled={loading}

                    >
                        {loading ? (
                            <span className="loading loading-dots loading-lg text-white"></span>
                        ) : (
                            'Donate'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CampaignRequest;
