import { Select } from "./select/select.js"

const select = new Select('#select', {
	placeholder: "Select your preferred programming language",
	defaultSelectId: null, //or any id from data
	data: [
		{ id: '1', value: "JavaScript" },
		{ id: '2', value: "TypeScript" },
		{ id: '3', value: "C++" },
		{ id: '4', value: "Python" },
		{ id: '5', value: "Java" },
		{ id: '6', value: "Kotlin" },
		{ id: '7', value: "Swift" },
	]
})