import { useEffect,useState } from 'react';
import { getMetadata } from '../utils/nft.js';
import { getOrder } from '../utils/market.js';
import '../styles/NFTCard.css';

const NFTCard = ({tokenId,onClick}) => {
    // console.log(tokenId)
    const [metadata, setMetadata] = useState('');
    const [order, setOrder] = useState('');

    useEffect(() => {
        const getInfo = async () => {
            const metadata = await getMetadata(tokenId);
            const order = await getOrder(tokenId);

            setMetadata(metadata);
            setOrder(order);
        }
        getInfo();
    }, []);

return (
    <div className="home-nft-card" onClick={onClick}>
        <div className="home-nft-image">
            < img src={metadata.imageURL} alt={metadata.title}/>
        </div>
        <div className="home-nft-info">
        <h3>{metadata.title}</h3>
        <p>{metadata.description}</p>
        <p>Price: {order.price} USDT</p >
        </div>
    </div>
    );
}

export default NFTCard;
