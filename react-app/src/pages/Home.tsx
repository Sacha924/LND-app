import React from 'react';
import './../style/Home.css'; 

const Home = () => {
    return (            
        <div className="home-container">
            <div className="home-content">
                <h1>Welcome to the Lightning Network Dashboard!</h1>
                <p>This platform is designed to provide a user-friendly interface for interacting with the Lightning Network (LND). Here's a brief overview of what LND is and how this application can help you:</p>
                
                <h2>What is LND?</h2>
                <p>LND, or Lightning Network Daemon, is an implementation of the Lightning Network protocol. The Lightning Network is a "Layer 2" payment protocol that operates on top of the Bitcoin blockchain. It is designed to enable fast, scalable, and low-cost transactions.</p>
                
                <h2>Key Features of LND:</h2>
                <ul>
                    <li>Instant Payments: Lightning-fast blockchain payments without worrying about block confirmation times.</li>
                    <li>Scalability: Capable of millions to billions of transactions per second across the network.</li>
                    <li>Low Cost: By transacting and settling off-blockchain, the Lightning Network allows for exceptionally low fees.</li>
                    <li>Cross-Chain Atomic Swaps: Possible to conduct trustless transactions across blockchains (cross-chain).</li>
                </ul>

                <h2>How Our Application Helps:</h2>
                <p>Our Lightning Network Dashboard allows you to:</p>
                <ol>
                    <li>Monitor your node's status and performance.</li>
                    <li>Open and manage payment channels for efficient and low-cost transactions.</li>
                    <li>Create and pay invoices through a simple user interface.</li>
                    <li>View detailed statistics about your transactions and channels.</li>
                </ol>

                <p>Explore the tabs for detailed information and control over your Lightning Network activities!</p>
            </div>
        </div>
    );
};

export default Home;
