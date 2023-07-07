import React from 'react';

const Competenze = ({skills}) => {  
    const listaCompetenze = [
        "JavaScript","React","Node.js","Express", "C#"
    ];

    return (
        <div className='skills'>
            <h2>skills ssss</h2>
            <ul>
                {skills&&listaCompetenze.map((skills,index)=>(
                    <li key={index}>{skills}</li>
                    ))}
            </ul>
        </div>
    );
};

export default Competenze;