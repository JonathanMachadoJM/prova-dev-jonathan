import React from 'react';
import ToggleColorMode from './components/ToggleColorMode'

import Router from './routes';

const App = () => {
	return (
		<ToggleColorMode>
      <Router/>
    </ToggleColorMode>
	);
}

export default App


// const [users, setUsers] = useState([]);
// const usersCollectionRef = collection(db, "users");

// useEffect(() => {
// 	const getUsers = async () => {
// 		const data = await getDocs(usersCollectionRef);
// 		setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
// 	};
// 	getUsers();
// }, []);

//
// <container
// 	style={{backgroundColor: "#121212"}}>
// 	>
// 	<div
// 		className="App"
// 		style={{color: "white"}}>
// 		{" "}
// 		{users.map((user) => {
// 			return (
// 				<div>
// 					{" "}
// 					<h1>Name: {user.name}</h1>
// 					<h1>Name: {user.age}</h1>
// 				</div>
// 			);
// 		})}
// 	</div>
// </container>
