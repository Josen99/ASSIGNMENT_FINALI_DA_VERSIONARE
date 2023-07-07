import React, { useState } from 'react';
import axios from 'axios'; // serve per gestire le richieste http
import Progetti from './Progetti';
import Competenze from './Competenze';

const ModificaDettagli2 = ({ user }) => {
    const [projects, setProjects] = useState(user.projects || []);
    const [newProject, setNewProject] = useState('');
    const [skills, setSkills] = useState(user.skills || []);
    const [newSkill, setNewSkill] = useState('');

    const addProject = (project) => {
        setProjects([...projects, project]);
        setNewProject('');
    };

    const addSkill = (skill) => {
        setSkills([...skills, skill]);
        setNewSkill('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:3001/api/updateDetails', { projects, skills }, {
                headers: { 'Authorization': token }
            });
            if (newProject) {
              addProject(newProject);
            }
            if (newSkill) {
              addSkill(newSkill);
            }
        } catch (error) {
            console.error('Error updating profile', error);
        }
      };

      return (
        <div>
          <Progetti projects={projects} />
          <Competenze skills={skills} />
    
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nuovo progetto"
              value={newProject}
              onChange={(e) => setNewProject(e.target.value)}
            />
            <input
              type="text"
              placeholder="Nuova competenza"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
            />
            <button type="submit">Aggiungi</button>
          </form>
        </div>
      );
};

export default ModificaDettagli2;