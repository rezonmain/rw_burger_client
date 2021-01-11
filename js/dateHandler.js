const DateTime = luxon.DateTime;
export { localTime, localOpeningHour, getClosingTime, getDateString };
let localOpeningHour = 14;
// let utcOpeningHour = DateTime.fromObject({ zone: 'America/Tijuana', hour: localOpeningHour }).toUTC().hour;
let localTime = DateTime.fromObject({ zone: 'America/Tijuana' });

function getDateString(ts) {
	let date = DateTime.fromMillis(ts)
		.setZone('America/Tijuana')
		.toLocaleString(Object.assign({ locale: 'es' }, DateTime.DATETIME_HUGE_WITH_SECONDS));
	return date.slice(0, -29);
}

function getClosingTime(day) {
	switch (day) {
		case 1:
			return 21;
		case 2:
			return null;
		case 3:
			return null;
		case 4:
			return 21;
		case 5:
			return 22;
		case 6:
			return 22;
		case 7:
			return 21;
		default:
			return null;
	}
}
