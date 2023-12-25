import React, { useState } from 'react';
import './../style/CloseChannel.css';

const CloseChannel = () => {
    const [channelPoint, setChannelPoint] = useState('');
    const [forceClose, setForceClose] = useState(false);

    const handleCloseChannel = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:4000/node/closeChannel', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    channel_point: channelPoint,
                    force: forceClose
                })
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message || 'Erreur lors de la fermeture du canal.');
            }
            console.log('Canal fermé avec succès:', responseData);
        } catch (error) {
            console.error('Erreur:', (error as any).message);
        }
    };

    return (
        <div className="close-channel-container">
            <h2>Fermer un Canal</h2>
            <form onSubmit={handleCloseChannel} className="close-channel-form">
                <input 
                    type="text" 
                    value={channelPoint} 
                    onChange={(e) => setChannelPoint(e.target.value)} 
                    placeholder="Point du canal (funding_txid:output_index)"
                />
                <label>
                    Fermeture forcée :
                    <input 
                        type="checkbox"
                        checked={forceClose}
                        onChange={(e) => setForceClose(e.target.checked)}
                    />
                </label>
                <button type="submit" className="close-channel-button">Fermer le Canal</button>
            </form>
        </div>
    );
};

export default CloseChannel;
