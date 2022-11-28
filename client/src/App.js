import React from 'react';
import jsonServerProvider from 'ra-data-json-server';
import { Admin, ListGuesser, Resource } from 'react-admin';
import authProvider from './resources/auth/authProvider';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

function App() {
	return (
		<Admin dataProvider={dataProvider} authProvider={authProvider}>
			<Resource name='posts' list={ListGuesser} />
			<Resource name='comments' list={ListGuesser} />
		</Admin>
	);
}

export default App;
