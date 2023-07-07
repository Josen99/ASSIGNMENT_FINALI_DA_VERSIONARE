import React, { useState } from 'react';
import axios from 'axios'; // serve per gestire le richieste http

const ModificaDettagli = ({ user, onUpdate }) => {
    const [bio, setBio] = useState(user.bio || '');    
    const [contacts, setContacts] = useState(user.contacts || '');   

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:3001/api/updateDetails', { bio, contacts }, {
                headers: { 'Authorization': token }
            });
            onUpdate({ bio, contacts });
        } catch (error) {
            console.error('Error updating profile', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>            
            <textarea
                placeholder="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={2}
            />
            <input
                type="text"
                placeholder="Contacts"
                value={contacts}
                onChange={(e) => setContacts(e.target.value)}
            />
            <button type="submit">Update Details</button>
        </form>
    );
};

export default ModificaDettagli;