import './App.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Navbar from './components/Navbar';
import UploadSuccess from './components/UploadSuccess';
import UploadImage from './components/UploadImage';
import HomePage from './components/HomePage.js';
import NFTDetails from './components/NFTDetails.js';
import OwnedNFTs from './components/OwnedNFTs.js';

function App() {
  const [myWallet, connectMyWallet] = useState("");

  useEffect(() => {
    getWalletAddress();
    addListener();
  }, []);

  async function getWalletAddress() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        connectMyWallet(account);
      } catch (error) {
        console.log("Error occured:",error);
      }
    }
  }

  async function addListener() {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', function (accounts) {
        connectMyWallet(accounts[0]);
      });
    } else {
      alert('Please install MetaMask!');
    }
  }

  return (
    <div className="App">
      <Router>
        <Navbar connectMyWallet={getWalletAddress} WalletAddress={myWallet} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/upload" element={<UploadImage address={ myWallet }/>} />
          <Route path="/uploadSuccess" element={<UploadSuccess />} />
          <Route path="/nft-details/:tokenId" element={<NFTDetails />} />
          <Route path="/owned-nfts" element={<OwnedNFTs address={ myWallet } />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
