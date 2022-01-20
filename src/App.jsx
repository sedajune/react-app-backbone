import React from "react";
import { useCallback, useState, useEffect } from "react";

const Code = ({ code }) => (
	<pre>
		<code>{JSON.stringify(code, null, 4)}</code>
	</pre>
);

const useLocalStorage = (key, initialValue) => {
	const [value, setValue] = useState(JSON.parse(window.localStorage.getItem(key)));

	useEffect(() => {
		const storedValue = JSON.parse(window.localStorage.getItem(key));
		console.log(storedValue);
		if (storedValue !== null) {
			setValue(storedValue);
		}
	}, [key]);

	//useEffect( () => {
	//window.localStorage.setItem(key, JSON.stringify(value));
	//}, [key, value]);

	const storeValue = useCallback(
		newValue => {
			window.localStorage.setItem(key, JSON.stringify(newValue));
			setValue(newValue);
		},
		[key]
	);

	return [value, storeValue];
};

const App = () => {
	const [checked, setChecked] = useLocalStorage("secret", false);
	useEffect(() => {
		console.log("triggered");
	}, [setChecked]);
	return (
		<div>
			<input
				type="checkbox"
				checked={checked}
				onChange={() => {
					setChecked(!checked);
				}}
			/>
		</div>
	);
};
export default App;
