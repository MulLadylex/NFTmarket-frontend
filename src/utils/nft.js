import { ethers } from 'ethers'
import ABI from '../contracts/NFTM.json'
import axios from 'axios';

let provider = new ethers.BrowserProvider(window.ethereum);
const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const contract = new ethers.Contract(contractAddress, ABI, await provider.getSigner());

export async function balanceOf(address) {
    try {
        const res = await contract.balanceOf(address)
        return Number(res);
    } catch (error) {
        console.log(error)
    }
}

export async function tokenOfOwnerByIndex(address, index) {
    try {
        const res = await contract.tokenOfOwnerByIndex(address, index)
        return Number(res);
    } catch (error) {
        console.log(error)
    }
}

export async function tokenURI(tokenId) {
    try {
        const res = await contract.tokenURI(tokenId)
        console.log(res);
    } catch (error) {
        console.log(error)
    }
}

export async function getMetadata(tokenId) {
    try {
        const result = await contract.tokenURI(tokenId)
        console.log(result);
        const response = await axios.get(result);    
        return {
            title: response.data.name,
            description: response.data.description,
            imageURL: response.data.image
        };
    } catch (error) {
        console.log(error)
    }
}