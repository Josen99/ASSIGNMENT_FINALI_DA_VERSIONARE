import React from 'react';

const Progetti = ({projects}) => {
    const listaProgetti = [
        {
            nome:"Progetto 1",
            descrizione:"Descrizione del progetto 1"
        },
        {
            nome:"Progetto 2",
            descrizione:"Descrizione del progetto 2"
        },
        {
            nome:"Progetto 3",
            descrizione:"Descrizione del progetto 3"
        }
    ];

    return (
        <div>

            <h2>Progetti</h2>
            <ul>
                {projects&&listaProgetti.map((progetto, index) =>(
                <li key={index}>
                        {progetto}
                    </li>
            ))}
            </ul>
        </div>
    );
};

export default Progetti;