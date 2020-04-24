import React from 'react';



const UserData = props => {
    
    
    return(
        <div>
            {props.users.map(user =>(
                <div key={user.id}>
                    <h2>{user.name}</h2>
                    <p>{user.role}</p>
                    <p>{user.email}</p>
                    <p>{user.civil}</p>
                </div>
            ))}
        </div>    
    )
};

export default UserData;