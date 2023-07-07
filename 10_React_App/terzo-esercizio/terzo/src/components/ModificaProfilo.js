import React, { useState } from 'react';
import axios from 'axios'; // serve per gestire le richieste http

const ModificaProfilo = ({ user, onUpdate }) => {
    const [name, setName] = useState(user.name|| '');
    const [ biography, setBiography ]=useState(user.biography|| '');
    const [ projects, setProjcts ]=useState(user.projects|| '');
    const [ skills, setSkills ]=useState(user.skills|| '');
    const [ contacts, setContacts ]=useState(user.contacts|| '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:3001/api/updateProfile', { name, biography,projects,skills,contacts }, {
                headers: { 'Authorization': token }
            });
            onUpdate({name ,biography,projects,skills,contacts});
        } catch (error) {
            console.error('Error updating profile', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
             <input
                type="text"
                placeholder="biography"
                value={biography}
                onChange={(e) => setBiography(e.target.value)}
            />
             <input
                type="text"
                placeholder="projects"
                value={projects}
                onChange={(e) => setProjcts(e.target.value)}
            />
             <input
                type="text"
                placeholder="skills"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
            />
             <input
                type="text"
                placeholder="Contacts"
                value={contacts}
                onChange={(e) => setContacts(e.target.value)}
            />
            <button type="submit">Update Profile</button>
        </form>
    );
};

export default ModificaProfilo;