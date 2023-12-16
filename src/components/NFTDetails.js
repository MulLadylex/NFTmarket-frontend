import "../App.css";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { getOrder, buy } from "../utils/market.js";
import { getAllowance, approve } from "../utils/usdt.js";
import { getMetadata } from "../utils/nft.js"

const NFTDetails = () => {
    const {tokenId} = useParams();
    const [order, setOrder] = useState({});
    const [metadata, setMetadata] = useState({});
    const [allowance, setAllowance] = useState(0);

    const getWalletAddress = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const account = accounts[0];
                return account;
            } catch (error) {
                console.log("Error occurred:", error);
            }
        }
    }

    const handleBuy = async () => {
        if (allowance < order.price) {
            await approve("0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",order.price);
        } else {
            await buy(order.tokenId, order.price)
        }
    }

    useEffect(() => {
        const getInfo = async () => {
            const address = await getWalletAddress();
            const metadata = await getMetadata(tokenId);
            const order = await getOrder(tokenId);
            const allowance = await getAllowance(address, "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0");
            
            setOrder(order);
            setMetadata(metadata);
            setAllowance(allowance);
        }
        getInfo();
    }, [allowance]);

    return (
        <div className="nft-details-container">
            <div className="nft-details">
                <div className="nft-image">
                    <img src={metadata.imageURL} alt={metadata.title}/>
                </div>
                <div className="nft-info">
                    <h3>{metadata.title}</h3>
                    <p>{metadata.description}</p>
                    <p>Seller: {order.seller}</p>
                    <p>Price: {order.price}</p>
                    <p>Token ID: {order.tokenId}</p>
                    <button onClick={handleBuy}>Buy</button>
                </div>
            </div>
        </div>
    );
}

export default NFTDetails;