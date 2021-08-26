import React from "react";

const Alert  = ({msg, type})=>{

    return(
        <div>
            {alert!== null&&(
                <div className={`alert alert-${type}` }>
                <i className={"fas fa-info-circle"}/>{msg}

                </div>
            )}
        </div>
    )
}
export default Alert