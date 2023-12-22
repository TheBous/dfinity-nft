const humanReadableDate = (date: Date) => {
	const options: Intl.DateTimeFormatOptions = {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
	}
	return date.toLocaleDateString('en', options)
}

export default humanReadableDate
