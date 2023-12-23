// Desc: Config file for the app
//
// Path: src/config.js

const config = {
    // Deployed smart contract addresses on the network
    ContractAddress: {
        usdtAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        nftAddress: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
        marketAddress: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
    },
    // Backend API URL
    BackendURL: {
        baseURL: "http://localhost:3000",
        ImagePostURL: "http://localhost:3000/upload",
    }
};

export default config;