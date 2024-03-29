import ArrayFieldMixin from '../../mixins/HobbiesArrayField';
import Select from 'react-select';
import Field from '../Field';
import React from 'react';

module.exports = Field.create({

	displayName: 'SelectArrayField',
	statics: {
		type: 'SelectArray',
	},
	mixins: [ArrayFieldMixin],

	processInputValue(value) {
		console.log('props value >>>>> ', value)
		return value
	},

	formatValue(value) {
		return value;
	},

	getInputComponent() {
		return Select
	},

});
