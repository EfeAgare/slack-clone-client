import gql from 'graphql-tag';


const allWorkSpaceQuery =  gql`
  {
    allWorkSpace {
      id
      name
      userId
      channels {
        id
        name
      }
    }
  }
`

export default allWorkSpaceQuery