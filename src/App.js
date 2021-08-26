import React, { Fragment, useState} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import './App.css'
import Navbar from "./components/layout/Navbar";
import UserItem from "./components/users/UserItem";
import Users from "./components/users/Users";
import axios from "axios";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/Pages/About";
import User from "./components/users/User";

const App= ()=> {
    const [users,setUsers]=useState([])
    const [user,setUser]=useState({})
    const [repos,setRepos]=useState([])
    const [loading,setLoading]=useState(false)
    const [alert,setAlert]=useState(null)

     const searchUsers = async text => {
         setLoading( true)
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&
        client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
        client_server = ${process.env.REACT_APP_GITHUB_CLIENT_ID}`)
         setUsers(res.data.items)
         setLoading(false)

    }
    const clearClick = () => {
        setUsers([])
        setLoading(false)
    }
    const setAlertfunc = (msg, types) => {
        setAlert({msg, types})
        setTimeout(() => setAlert(null,null), 5000)
    }
    const getUser = async (username) => {

        setLoading(true)
        const res = await axios.get(`https://api.github.com/users/${username}?
        client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
        client_server = ${process.env.REACT_APP_GITHUB_CLIENT_ID}`)
        setUser(res.data)
        setLoading(false)
    }

    const getUserRepos = async (username) => {
        setLoading(true)
        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&
        client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
        client_server = ${process.env.REACT_APP_GITHUB_CLIENT_ID}`)

        setRepos(res.data)
        setLoading(false)
    }

        return (
            <Router>
                <div className="App">
                    <Navbar title='Github finder' icon='fab fa-github'/>
                    {alert && <Alert type={alert.types} msg={alert.msg}/>}
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={props => (
                                <Fragment>
                                    <Search
                                        searchUser={searchUsers}
                                        clearClick={clearClick}
                                        showBtn={users.length > 0}
                                        setAlert={setAlertfunc}/>
                                    <div className={"container"}>
                                        <Users
                                            loading={loading}
                                            users={users}
                                        />
                                    </div>
                                </Fragment>
                            )}/>
                        <Route exact path="/About" component={About}/>
                        <Route
                            exact
                            path="/user/:login"
                            render={props => (
                                <Fragment>
                            <User {...props}
                                   getUser={getUser}
                                   getUserRepos={getUserRepos}
                                   user={user}
                                   repos = {repos}
                                   loading={loading}>
                            </User>

                                </Fragment>
                        )}/>
                    </Switch>
                </div>
            </Router>
        )}

export default App;
