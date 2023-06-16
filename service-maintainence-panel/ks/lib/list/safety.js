/* eslint-disable no-mixed-spaces-and-tabs */
module.exports = function handleInputs (
	field,
	data,
	updateErrors,
	addFieldUpdateError
) {
	let error = {
		name: 'Error',
		message: '',
	};
	let dateRegex = /^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[1-2])-\d{4}$/;
	let utcRegex = /^(\+|-)(0[0-9]|1[0-2]):(0|3)0$/;
	let timeFullRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
	let timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
	let value = data[field.path];
	if (field.list.key === 'ShiftType') {
		let fixInputTime = function () {
			if (value.length > 0 && value.match(timeFullRegex) === null) {
				if (value.match(timeRegex)) {
					data[field.path] = value.split(':').concat('00').join(':');
				} else {
					error.message = `Wrong ${field.path}! [Format-> HH:MM or HH:MM:SS]`;
				}
			}
		};
		switch (field.path) {
			case 'endTime':
				fixInputTime();
				break;
			case 'startTime':
				fixInputTime();
				break;
			case 'minutes':
				let time = [];
				['startTime', 'endTime'].map((key) => {
					let obj = data[key]
						.split(':')
						.slice(0, 2)
						.map((v) => parseInt(v));
					time.push({
						hour: obj[0],
						minute: obj[1],
					});
				});
				let gap = time.reduce(
					(prev, current) => ({
						hour: current.hour - prev.hour,
						minute: current.minute - prev.minute,
					}),
					{ hour: 0, minute: 0 }
				);
				gap = gap.hour * 60 + gap.minute;
				if (gap > 0) data.minutes = gap.toString();
				else {
					error.message
						= 'Wrong startTime and endTime [difference cannot be negative]!';
				}
				break;
			default:
				break;
		}
	} else if (field.list.key === 'Job') {
		switch (field.path) {
			case 'dates':
				data.dates
					= value !== undefined
						? value.map((entry, entryIndex) => {
							if (!entry.date.match(dateRegex)) {
								error.message = `Wrong date for Date ${
										entryIndex + 1
									}! [Format-> DD-MM-YYYY]`;
							} else if (!entry.utc.match(utcRegex)) {
								error.message = `Wrong utc format for Date ${
										entryIndex + 1
									}! [Format-> +|- HH:MM] HH <= 12, MM in [00, 30]`;
							} else if (
									entry.start.length > 0
									&& entry.start.match(timeFullRegex) === null
								) {
								if (!entry.start.match(timeRegex)) {
									error.message = `Wrong start time for Date ${
											entryIndex + 1
										}! [Format-> HH:MM or HH:MM:SS]`;
								}
							} else if (
									entry.end.length > 0
									&& entry.end.match(timeFullRegex) === null
								) {
								if (!entry.end.match(timeRegex)) {
									error.message = `Wrong end time for Date ${
											entryIndex + 1
										}! [Format-> HH:MM or HH:MM:SS]`;
								}
							}
							let dateString = entry.date
									.split('-')
									.reverse()
									.join('-');
							return {
								...entry,
								date: entry.date,
								start:
										entry.start.length !== 5
											? entry.start
											: entry.start + ':00',
								end:
										entry.end.length !== 5
											? entry.end
											: entry.end + ':00',
								startTime:
										entry.start.length > 0
											? new Date(
													`${dateString} ${entry.start} UTC ${entry.utc}`
											  ).getTime()
											: null,
								endTime:
										entry.end.length > 0
											? new Date(
													`${dateString} ${entry.end} UTC ${entry.utc}`
											  ).getTime()
											: null,
							};
						  })
						: undefined;
				break;
			default:
				break;
		}
	} else if (field.list.key === 'NurseCheckin') {
		if (!data.date.match(dateRegex)) {
			error.message = 'Wrong date! [Format-> DD-MM-YYYY]';
		} else if (!data.utc.match(utcRegex)) {
			error.message
				= 'Wrong utc format! [Format-> +|- HH:MM] HH <= 12, MM in [00, 30]';
		} else if (data.timeString.match(timeFullRegex) === null) {
			if (!data.timeString.match(timeRegex)) {
				error.message = 'Wrong time! [Format-> HH:MM or HH:MM:SS]';
			}
		}
		let dateString = data.date.split('-').reverse().join('-');
		data.timeString
			= data.timeString.length !== 5
				? data.timeString
				: data.timeString + ':00';
		data.time
			= data.timeString.length > 0
				? new Date(
						`${dateString} ${data.timeString} UTC ${data.utc}`
				  ).getTime()
				: null;
	}
	if (error.message !== '') {
		addFieldUpdateError(updateErrors, field, error);
	}
	return data;
};
