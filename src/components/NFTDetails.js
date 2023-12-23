import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import "../styles/ImageDetails.css";

import { getOrder, buy } from "../utils/market.js";
import { getAllowance, approve } from "../utils/usdt.js";
import { getMetadata } from "../utils/nft.js"
import config from "../config.js";

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
            await approve(config.ContractAddress.marketAddress,order.price);
        } else {
            await buy(order.tokenId, order.price)
        }
    }

    useEffect(() => {
        const getInfo = async () => {
            const address = await getWalletAddress();
            const metadata = await getMetadata(tokenId);
            const order = await getOrder(tokenId);
            const allowance = await getAllowance(address, config.ContractAddress.marketAddress);
            
            setOrder(order);
            setMetadata(metadata);
            setAllowance(allowance);
        }
        getInfo();
    }, [allowance, tokenId]);

    return (
        <div className="nft-details-container">
            <div className="nft-details">
                <div className="nft-details-image">
                    <img src={metadata.imageURL} alt={metadata.title}/>
                </div>
                <div className="nft-details-info">
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