
import React from 'react';
import Layout from './Layout';

const Home: React.FC = () => {
    return (            
    <div>
        <Layout/>
        <div>
            <h1>Welcome to the Home Page!</h1>
            <p>This is the home page content after login.</p>
        </div>
    </div>
    );
};

export default Home;
