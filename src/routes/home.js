import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

 export const  Home = () =>{
  const { loading, error, data } = useQuery(gql`
    {
  allUsers {
    id
    username
    email
  }
}
  `);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

    return data.allUsers.map(({ id, username, email }) => (
      <div key={id}>
        <p>{username}</p>
        <p>{email}</p>
      </div>
    ));
}


// {
//   allUsers {
//     id
//     username
//     email
//   }
// }