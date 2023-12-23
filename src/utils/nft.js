import { ethers } from 'ethers'
import axios from 'axios';

import ABI from '../contracts/NFTM.json'
import config from '../config';

let provider = new ethers.BrowserProvider(window.ethereum);
const contractAddress = config.ContractAddress.nftAddress;
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

export async function getMetadata(tokenId) {
    try {
        const result = await contract.tokenURI(tokenId)
        console.log(result);
        const response = await axios.get(result);    
        return {
            title: response.data.title,
            description: response.data.description,
            imageURL: response.data.image
        };
    } catch (error) {
        console.log(error)
    }
}

export async function List(from, to, tokenId, price) {
    try {
        const _price = await converToBytes32(price);

        const res = await contract["safeTransferFrom(address,address,uint256,bytes)"](from, to, tokenId, _price)
        
        return res.hash;
    } catch (error) {
        console.log(error)
    }
}

async function converToBytes32(price) {
    const abiCoder = new ethers.AbiCoder();
    const bytes32Value = abiCoder.encode(['uint256'], [price]);
    return bytes32Value.toString();
}