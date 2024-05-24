// context/AccountContext.tsx
'use client';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '@/app/constants';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface AccountContextType {
    account: string | null;
    setAccount: (account: string | null) => void;
    provider: ethers.BrowserProvider | null;
    setProvider: (provider: ethers.BrowserProvider | null) => void;
    contract: ethers.Contract | null;
    setContract: (contract: ethers.Contract | null) => void;
    connectWallet: () => void;
    disconnectWallet: () => void;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export const AccountProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const router = useRouter();
    const [account, setAccount] = useState<string | null>(null);
    const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
    const [contract, setContract] = useState<ethers.Contract | null>(null);

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
            toast.error('MetaMask is not installed');
        }
    };

    const disconnectWallet = async () => {
        setAccount(null);
        setProvider(null);
        setContract(null);
        if (typeof window.ethereum !== 'undefined') {
            localStorage.removeItem('walletConnected');
        }
        router.push('/');
    };

    useEffect(() => {
        console.log('Account updated:', account);
      }, [account]);
    
      useEffect(() => {
        console.log('Provider updated:', provider);
      }, [provider]);
    
      useEffect(() => {
        console.log('Contract updated:', contract);
      }, [contract]);

    return (
        <AccountContext.Provider value={{ account, setAccount, provider, setProvider, contract, setContract, connectWallet, disconnectWallet }}>
            {children}
        </AccountContext.Provider>
    );
};

export const useAccount = () => {
    const context = useContext(AccountContext);
    if (context === undefined) {
        throw new Error('useAccount must be used within an AccountProvider');
    }
    return context;
};
