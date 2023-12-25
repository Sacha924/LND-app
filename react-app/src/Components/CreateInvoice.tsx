import React, { useState } from 'react';
import "./../style/CreateInvoice.css";

const CreateInvoice = () => {
    const [memo, setMemo] = useState('');
    const [amount, setAmount] = useState('');
    const [expiry, setExpiry] = useState('');
    const [paymentRequest, setPaymentRequest] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/node/createInvoice', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    memo,
                    value: amount,
                    expiry
                })
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message || 'Erreur lors de la création de la facture.');
            }
            console.log('Facture créée avec succès:', responseData);
            setPaymentRequest(responseData.payment_request);
        } catch (error) {
            console.error('Erreur:', (error as any).message);
            setError((error as any).message);
        }
    };

    return (
        <div className="create-invoice-container">
            <h2>Create Invoice</h2>
            <form onSubmit={handleSubmit} className="create-invoice-form">
                <input 
                    type="text" 
                    className="create-invoice-input"
                    value={memo} 
                    onChange={(e) => setMemo(e.target.value)} 
                    placeholder="Description"
                />
                <input 
                    type="number" 
                    className="create-invoice-input"
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                    placeholder="Montant en satoshis"
                />
                <input 
                    type="number" 
                    className="create-invoice-input"
                    value={expiry} 
                    onChange={(e) => setExpiry(e.target.value)} 
                    placeholder="Durée de validité en secondes"
                />
                <button type="submit" className="create-invoice-button">Créer la Facture</button>
                {
                    paymentRequest && (
                        <div className="create-invoice-payment-request">
                            <p>Payment Request: (longer than what is displayed)</p>
                            <p>{paymentRequest}</p>
                        </div>
                    )
                }
                {
                    error && (
                        <div className="create-invoice-error">
                            <p>Erreur:</p>
                            <p>{error}</p>
                        </div>
                    )
                }
            </form>
        </div>
    );
};

export default CreateInvoice;
