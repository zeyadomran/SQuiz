export const formatDate = (date: string) => {
	const d = new Date(date);
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	const monthName = months[d.getMonth()];
	const dayName = days[d.getDay()];

	return `${dayName}, ${d.getDate()} ${monthName} ${d.getFullYear()}`;
};
