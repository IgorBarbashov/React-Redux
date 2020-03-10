import React from 'react';

export const Users = ({ resource }) => {
    const users = resource.users.read();

    return (
        <>
            <h3>Users</h3>
            <ul>
                {users.map(el => (
                    <li key={el.id}>{el.name}</li>
                ))}
            </ul>
        </>
    )
}