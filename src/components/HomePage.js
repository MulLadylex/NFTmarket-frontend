import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "../styles/NFTCard.css";

import NFTCard from "./NFTCard";
import { balanceOf, tokenOfOwnerByIndex } from "../utils/nft.js";
import config from "../config.js";

const HomePage = () => {
    const navigate = useNavigate();
    const [nfts, setNFTs] = useState([]);

    const handleNFTClick = (tokenId) => {
        navigate(`/nft-details/${tokenId}`);
    }

    useEffect(() => {
        const getNFTs = async () => {
            const length = await balanceOf(config.ContractAddress.marketAddress);
            // console.log('length', length);
            for (let i = 0; i < length; i++) {
                const tokenId = await tokenOfOwnerByIndex(config.ContractAddress.marketAddress, i);
                // console.log('tokenId', tokenId);
                setNFTs((prev) => [...prev, tokenId]);
                setNFTs((prev) => [...new Set(prev)]);
            }
        }
        getNFTs();
    }, []);

    return (
        <div className="container">
            {nfts.map(nft => (
                <NFTCard tokenId={nft} onClick={() => handleNFTClick(nft)} />
            ))}
        </div>
    );
}

export default HomePage;