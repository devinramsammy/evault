import React from 'react';
import jsonServerProvider from 'ra-data-json-server';
import { Admin, ListGuesser, Resource } from 'react-admin';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

function App() {
	console.log(dataProvider);
	return (
		<Admin dataProvider={dataProvider}>
			<Resource name='posts' list={ListGuesser} />
			<Resource name='comments' list={ListGuesser} />
		</Admin>
	);
}

export default App;
