import React, { useState } from 'react';
import "./../style/SendPayment.css";

const SendPayment = () => {
    const [paymentRequest, setPaymentRequest] = useState('');

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/node/sendPayment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ payment_request: paymentRequest })
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message || 'Erreur lors de l’envoi du paiement.');
            }
            console.log('Paiement envoyé avec succès:', responseData);
        } catch (error: any) {
            console.error('Erreur:', error.message);
        }
    };

    return (
        <div className='send-payment-container'>
            <h2>Envoyer un Paiement</h2>
            <form onSubmit={handleSubmit} className="send-payment-form">
                <input 
                    type="text" 
                    className="send-payment-input"
                    value={paymentRequest} 
                    onChange={(e) => setPaymentRequest(e.target.value)} 
                    placeholder="Entrez la requête de paiement"
                />
                <button type="submit" className="send-payment-button">Envoyer le Paiement</button>
            </form>
        </div>
    );
};

export default SendPayment;
