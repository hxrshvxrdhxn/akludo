var React = require('react');

import _ from 'lodash';
import { findDOMNode } from 'react-dom';

var Button = require('elemental').Button;
var FormField = require('elemental').FormField;
var FormInput = require('elemental').FormInput;

var lastId = 0;
var ENTER_KEYCODE = 13;

function newItem (value) {
	lastId = lastId + 1;
	return { key: 'i' + lastId, value: value };
}

function reduceValues (values) {
	return values.map(i => i.value);
}

module.exports = {
	getInitialState: function () {
		return {
            values: Array.isArray(this.props.value) ? this.props.value.map(newItem) : [],
            hobbies: []
		};
    },
    
    componentWillMount: function () {
        this.fetchApi();
    },

    fetchApi: function() {
        this.fetchHobbies().then(res => {
            this.setState({
                hobbies: res
            })
        });
    },

	componentWillReceiveProps: function (nextProps) {
		if (nextProps && nextProps.value && nextProps.value.join('|') !== reduceValues(this.state.values).join('|')) {
			this.setState({
				values: nextProps.value.map(newItem),
			});
		}
	},

	addItem: function () {
		var newValues = this.state.values.concat(newItem(''));
		this.setState({
			values: newValues,
		}, () => {
			if (!this.state.values.length) return;
			findDOMNode(this.refs['item_' + this.state.values.length]).focus();
		});
		this.valueChanged(reduceValues(newValues));
	},

	removeItem: function (i) {
		var newValues = _.without(this.state.values, i);
		this.setState({
			values: newValues,
		}, function () {
			findDOMNode(this.refs.button).focus();
		});
		this.valueChanged(reduceValues(newValues));
	},

	updateItem: function (i, event, mannual = false, index) {
        var updatedValues = this.state.values;
		var updateIndex = mannual ? index : updatedValues.indexOf(i);
		var newValue = event.value || event.target.value;
        updatedValues[updateIndex].value = this.cleanInput ? this.cleanInput(newValue) : newValue;
		this.setState({
            values: updatedValues,
        });
        if(mannual) this.refs['hobbyinput_' + index].refs.input.value = '';
		this.valueChanged(reduceValues(updatedValues));
    },

	valueChanged: function (values) {
		this.props.onChange({
			path: this.props.path,
			value: values,
		});
	},

	renderField: function () {
		return (
			<div>
				{this.state.values.map(this.renderItem)}
				<Button ref="button" onClick={this.addItem}>Add item</Button>
			</div>
		);
	},

	addItemOnEnter: async function (event) {
		if (event.keyCode === ENTER_KEYCODE) {
            let a = event.target.value;
            a = a.substr(0,1).toUpperCase() + a.substring(1);
            await this.createHobby(a);
            this.updateItem({key: "i1", value: a}, {value: a}, true);
            this.fetchApi();
			event.preventDefault();
		}
	},
	
	calculateIndex: function (i) {
		if(i == 1) return 1;
		else return i + 1 + this.calculateIndex(i -1);
	},

    addHobbyButton: async function (event, index) {
        let inputbox = this.refs['hobbyinput_' + event].refs.input;
        if(inputbox.value.trim()) {
            let a = inputbox.value;
            a = a.substr(0,1).toUpperCase() + a.substring(1);
            await this.createHobby(a);
            this.updateItem({key: `i${this.calculateIndex(event + 1)}`, value: a}, {value: a}, true, event);
            this.fetchApi();
			// event.preventDefault();
        } else inputbox.value = '';
    },
    
    fetchHobbies: async function() {
        let fetchData = await fetch('/getHobbies');
        let data = await fetchData.json();
        return data.map(el => { return {value: el.name, label: el.name}});
    },

    createHobby: async function(hobby) {
        let fetchData = await fetch(`/createHobby?hobby=${hobby}`);
        let data = await fetchData.json();
        return (data.success ? true : false);
    },

	renderItem: function (item, index) {
		const Input = this.getInputComponent ? this.getInputComponent() : FormInput;
		const value = this.processInputValue ? this.processInputValue(item.value) : item.value;
		// let ops = [...(this.props.ops || [])];
        let ops = this.state.hobbies;
		if(!ops.find(el => el.value === value)) ops.push({label: value, value: value});
		// console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<< ARRAY VAL', value, ops);
		return (
            <div>
                <FormField key={item.key}>
                    <Input options={ops} ref={'item_' + (index + 1)} name={this.getInputName(this.props.path)} value={value} onChange={this.updateItem.bind(this, item)} autoComplete="off" />
                    <Button type="link-cancel" onClick={this.removeItem.bind(this, item)} className="keystone-relational-button">
                        <span className="octicon octicon-x" />
                    </Button>
                </FormField>
                <FormInput ref={'hobbyinput_' + index} placeholder="Please enter hobby if not present in list" />
                <Button style={{marginTop:'13px', marginBottom: '13px'}} id={'add_' + index} onClick={this.addHobbyButton.bind(this, index)}>Add Hobby</Button>
                <br />
            </div>
		);
	},

	renderValue: function () {
		const Input = this.getInputComponent ? this.getInputComponent() : FormInput;
		return (
			<div>
				{this.state.values.map((item, i) => {
					const value = this.formatValue ? this.formatValue(item.value) : item.value;
					return (
						<div key={i} style={i ? { marginTop: '1em' } : null}>
							<Input noedit value={value} />
						</div>
					);
				})}
			</div>
		);
    },

	// Override shouldCollapse to check for array length
	shouldCollapse: function () {
		return this.props.collapse && !this.props.value.length;
	}
};
