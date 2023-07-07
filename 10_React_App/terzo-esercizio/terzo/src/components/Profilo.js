import React from 'react';

const Profilo = ({ user }) => {
    return (
        <section>
            <h2>Profilo</h2>
            <p>Benvenuto, {user}!</p>
        </section>
    );
};

export default Profilo;