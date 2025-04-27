import { gql, useQuery } from '@apollo/client'
import React from 'react'

const GET_USERS = gql`
query{
    users{
        id
        name
        address
    }
}
`;

function Users() {
    const { loading, isError, data: {users} } = useQuery(GET_USERS);


    return (
        <div>
            {
                users?.map((user) => (
                    <div key={user.id}>
                        <h1>{user.name}</h1>
                        <p>{user.address}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default Users