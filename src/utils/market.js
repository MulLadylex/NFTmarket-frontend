import { ethers } from 'ethers'
import ABI from '../contracts/NFTMarket.json'

let provider = new ethers.BrowserProvider(window.ethereum);
const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
const contract = new ethers.Contract(contractAddress, ABI, await provider.getSigner());

export async function buy(tokenId, price) {
    try {
        const res = await contract.buy(tokenId, {value: price})
        console.log(res.hash);
    } catch (error) {
        console.log(error)
    }
}

export async function cancelOrder(tokenId) {
    try {
        const res = await contract.cancelOrder(tokenId)
        console.log(res.toString());
    } catch (error) {
        console.log(error)
    }
}

export async function changePrice(tokenId, price) {
    try {
        const res = await contract.changePrice(tokenId, price)
        console.log(res.hash);
    } catch (error) {
        console.log(error)
    }
}

export async function getOrderLength() {
    try {
        const res = await contract.getOrderLength()
        return res.toString();
    } catch (error) {
        console.log(error)
    }
}

export async function getOrder(tokenId) {
    try {
        const res = await contract.OrderOfId(tokenId)
        return {
            seller: res.seller,
            tokenId: Number(res.tokenId),
            price: Number(res.price)
        };
    } catch (error) {
        console.log(error)
    }
}