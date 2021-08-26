import React, {useState, useContext} from 'react';


const Search = ({searchUser, clearClick, showBtn, setAlert}) => {

    const [text, useText] = useState("")
    const onChange = (event) => {
        useText(event.target.value)

    }
    const onsubmit = (event) => {
        event.preventDefault()
        if (text === "") {
            console.log("111")
           setAlert("Please enter NAME", "light")
        }
        else {
        event.preventDefault()
        searchUser(text)
        useText("")
        }
    }
    const clearClick1 = () => {
        event.preventDefault()
        clearClick()
    }


    return (
        <div>
            <form className={"form-text"} style={useStyle}>
                <input type="text" name={"text"} placeholder={"Search Users..."} value={text} onChange={onChange}/>
                <div style={divDisplay}><input type="submit" value={"Search"} className={"btn btn-dark btn-block"}
                                               style={useStyleBtn} onClick={onsubmit}/>
                    {showBtn && <button className={"btn btn-light btn-block "} style={useStyleBtn}
                                        onClick={clearClick1}>clear </button>}

                </div>

            </form>

        </div>
    )
}
const useStyle = {
    width: "80%",
    margin: "auto",
    borderRadius: "1px"
}
const useStyleBtn = {
    width: "15%",
    margin: "auto",
    borderRadius: "1px"
}
const divDisplay = {
    display: "flex",

}
export default Search;
