import { useState, useEffect } from 'react';
import "../styles/ownedCard.css"

import { getMetadata, balanceOf, tokenOfOwnerByIndex, List} from '../utils/nft.js';
import { getMyAllNFTs, cancelOrder, getOrder, isListed, changePrice } from '../utils/market.js';
import config from '../config.js';

const NFTCard = ({ tokenId, address }) => {
    const [metadata, setMetadata] = useState('');
    const [order, setOrder] = useState('');
    const [Listed, setIsListed] = useState(false);

    useEffect(() => {
        const getInfo = async () => {
            const metadata = await getMetadata(tokenId);
            const Listed = await isListed(tokenId);
            const order = await getOrder(tokenId);

            setMetadata(metadata);
            setIsListed(Listed);
            setOrder(order);
        }
        getInfo();
    }, []);

    const handleRemove = async () => {
        try {
            await cancelOrder(tokenId);
        } catch (error) {
            console.log(error);
        }

    }

    const handleChangePrice = async () => {
        try {
            const newPrice = prompt("Please enter the new price: ");
            await changePrice(tokenId, newPrice);
            let order = await getOrder(tokenId);
            setOrder(order);
        } catch (error) {
            console.log(error);
        }
    }

    const handleList = async () => {
        const price = prompt("Please enter the price: ");

        await List(
            address, 
            config.ContractAddress.marketAddress, 
            tokenId, 
            price);
    }
    

    return (
        <div className="nft-card">
            <div className="nft-image">
                <img src={metadata.imageURL} alt={metadata.title} />
            </div>
            <div className="nft-card-details">
                <h3>Title: {metadata.title}</h3>
                <p>Description: {metadata.description}</p>
                <p>Status: {Listed ? "On sale" : "Waiting for sheleves"}</p>
                <p>Token ID: {order.tokenId || tokenId}</p>
                {Listed && (
                    <>
                <p>Price: {order.price} USDT</p>
                    </>
                )}
            </div>
            <div className="btn">
                {!Listed && (
                    <>
                    <button onClick={handleList}>List</button>
                    </>
                )}
                {Listed && (
                    <>
                    <button onClick={handleRemove}>RemovingList</button>
                    <button onClick={handleChangePrice}>ChangePrice</button>
                    </>
                )}
            </div>
        </div>
    );
}

const OwnedNFTs = ({ address }) => {
    const [nfts, setNFTs] = useState([]);


    useEffect(() => {
        const getNFTs = async () => {
            const AllOfMyNFTs = await getMyAllNFTs();
            for (let i = 0; i < AllOfMyNFTs.length; i++) {
                const tokenId = AllOfMyNFTs[i][1];
                // console.log('tokenId', tokenId);
                setNFTs((prev) => [...new Set([...prev, tokenId])]);
            }
            // console.log('AllOfMyNFTs', AllOfMyNFTs);
            const length = await balanceOf(address)
            // console.log('length', length);
            for (let i = 0; i < length; i++) {
                const tokenId = await tokenOfOwnerByIndex(address, i);
                // console.log('tokenId', tokenId);
                setNFTs((prev) => [...new Set([...prev, tokenId])]);
            }
        }
        getNFTs();
    }, []);

    return (
        <div className="nfts-container">
            {nfts.map(nft => (
                <NFTCard key={nft} tokenId={nft} address={address} />
                ))}
        </div>
    );
}

export default OwnedNFTs;