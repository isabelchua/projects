import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import axios from 'axios';
import './App.css';

import GithubState from './context/github/GithubState';

const App = () => {
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState({});
	const [repos, setRepos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState(null);

	//search github users

	// get a single github user
	const getUser = async username => {
		//this.setState({loading:true});
		setLoading(true);

		const res = await axios.get(
			`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.SECRET}`
		);

		//this.setState({ user: res.data, loading: false });
		setUser(res.data);
		setLoading(false);
	};

	//Get users repos
	const getUserRepos = async username => {
		//this.setState({loading:true});
		setLoading(true);

		const res = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.SECRET}`
		);

		//this.setState({ repos: res.data, loading: false });
		setRepos(res.data);
		setLoading(false);
	};

	//clear users from state
	const clearUsers = () => {
		//this.setState({ users: [], loading: false });
		setUsers([]);
		setLoading(false);
	};

	//set alaert if blank
	const showAlert = (msg, type) => {
		//this.setState({alert: { msg, type }});
		setAlert({ msg, type });
		setTimeout(() => setAlert(null), 5000);
		//this.setState({alert: null}), 3000);
	};

	return (
		<GithubState>
			<Router>
				<div className='App'>
					<Navbar />
					<div className='container'>
						<Alert alert={alert} />
						<Switch>
							<Route
								exact
								path='/'
								render={props => (
									<Fragment>
										<Search
											clearUsers={clearUsers}
											showClear={users.length > 0 ? true : false}
											setAlert={showAlert}
										/>

										<Users />
									</Fragment>
								)}
							/>
							<Route exact path='/about' component={About} />
							<Route
								exact
								path='/user/:login'
								render={props => (
									<User
										{...props}
										getUser={getUser}
										getUserRepos={getUserRepos}
										user={user}
										repos={repos}
										loading={loading}
									/>
								)}
							/>
						</Switch>
					</div>
				</div>
			</Router>
		</GithubState>
	);
};

export default App;
