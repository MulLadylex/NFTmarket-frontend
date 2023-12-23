import { ethers } from 'ethers';

import ABI from '../contracts/USDT.json';
import config from '../config';

let provider = new ethers.BrowserProvider(window.ethereum);
const contractAddress = config.ContractAddress.usdtAddress;
const contract = new ethers.Contract(contractAddress, ABI, await provider.getSigner());

export async function getAllowance(owner, spender) {
    try {
        const res = await contract.allowance(owner, spender)
        return Number(res);
    } catch (error) {
        console.log(error)
    }
}

export async function approve(spender, amount) {
    try {
        const res = await contract.approve(spender, amount)
        console.log(res.hash);
    } catch (error) {
        console.log(error)
    }
}