import React, { useState } from 'react';
import "./../style/SendPayment.css";

type PaymentRequestResponse = {
    payment_error: string;
    payment_preimage: string;
    payment_hash: string;
    payment_route: any;
};


const SendPayment = () => {
    const [paymentRequest, setPaymentRequest] = useState('');
    const [error, setError] = useState('');
    const [paymentRequestResponse, setPaymentRequestResponse] = useState<PaymentRequestResponse | null>(null);

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
            setPaymentRequestResponse(responseData);
        } catch (error: any) {
            console.error('Erreur:', error.message);
            setError(error.message);
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
            {error && <p className="send-payment-error">{error}</p>}
            {paymentRequestResponse && (
                <div className="send-payment-response">
                    <p>Montant envoyé: {paymentRequestResponse.payment_preimage}</p>
                    <p>Frais: {paymentRequestResponse.payment_hash}</p>
                </div>
            )}
        </div>
    );
};

export default SendPayment;
