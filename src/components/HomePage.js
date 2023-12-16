import "../App.css";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import NFTCard from "./NFTCard";
import { balanceOf, tokenOfOwnerByIndex } from "../utils/nft.js";

const HomePage = () => {
    const navigate = useNavigate();
    const [nfts, setNFTs] = useState([]);

    const handleNFTClick = (tokenId) => {
        navigate(`/nft-details/${tokenId}`);
    }

    useEffect(() => {
        const getNFTs = async () => {
            const length = await balanceOf("0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0");
            console.log('length', length);
            for (let i = 0; i < length; i++) {
                const tokenId = await tokenOfOwnerByIndex("0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0", i);
                console.log('tokenId', tokenId);
                setNFTs((prev) => [...prev, tokenId]);
                setNFTs((prev) => [...new Set(prev)]);
            }
        }
        getNFTs();
    }, []);

    return (
        <div className="nfts-container">
            {nfts.map(nft => (
                <NFTCard tokenId={nft} onClick={() => handleNFTClick(nft)} />
            ))}
        </div>
    );
}

export default HomePage;