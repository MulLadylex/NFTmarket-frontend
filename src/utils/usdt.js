import { ethers } from 'ethers';
import ABI from '../contracts/USDT.json';

let provider = new ethers.BrowserProvider(window.ethereum);
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
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