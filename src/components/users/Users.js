import React, { useContext} from "react";
import UserItem from "./UserItem";
import Spinner from "../layout/Spinner"
import PropTypes from "prop-types"



const Users=({loading,users}) => {

  if(loading){
    return   <Spinner/>
  }

  return(
      <div style={useStyle}>
        {
          users.map(user=>(
              <UserItem  key = {user.id} user = {user}/>  ))
        }
      </div>
  )

}
export default Users;

Users.prototype={
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
}

const useStyle = {
  display: "grid",
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem'
}