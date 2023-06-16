/**
 * The global Footer, displays a link to the website and the current Keystone
 * version in use
 */

import React from 'react';
import $ from 'jquery';
import moment from 'moment';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { selectList } from "../../screens/List/actions";
import { Link } from 'react-router';

let date = {
	start: moment().startOf('month').format('YYYY-MM-DD'),
	end: moment(new Date()).format('YYYY-MM-DD')
};

var Mis = React.createClass({
	displayName: 'Mis',
	componentDidMount() {
		this.setState({
			tabIndex: 0,
		});
		this.fetchMisData();
		let self = this;
		// fetch('/admin/api/')
		$(function () {
			var currency = "{{currentUser.currency}}";
			$('#date-range-picker').daterangepicker({
				"ranges": {
					"Today": [
						moment().format('DD/MM/YYYY'),
						moment().format('DD/MM/YYYY')
					],
					"Yesterday": [
						moment().subtract(1, 'day').format('DD/MM/YYYY'),
						moment().subtract(1, 'day').format('DD/MM/YYYY')
					],
					"Last 7 Days": [
						moment().subtract(7, 'day').format('DD/MM/YYYY'),
						moment().format('DD/MM/YYYY')
					],
					"Last 30 Days": [
						moment().subtract(30, 'day').format('DD/MM/YYYY'),
						moment().format('DD/MM/YYYY')
					],
					"This Month": [
						moment().startOf('month').format('DD/MM/YYYY'),
						moment().endOf('month').format('DD/MM/YYYY')
					],
					"Last Month": [
						moment().subtract('1', 'month').startOf('month').format('DD/MM/YYYY'),
						moment().subtract('1', 'month').endOf('month').format('DD/MM/YYYY')
					]
				},
				"locale": {
					"format": "DD/MM/YYYY",
					"separator": " - ",
					"applyLabel": "Select Date",
					"cancelLabel": "Cancel",
					"fromLabel": "From",
					"toLabel": "To",
					"customRangeLabel": "Custom",
					"weekLabel": "W",
					"daysOfWeek": [
						"Su",
						"Mo",
						"Tu",
						"We",
						"Th",
						"Fr",
						"Sa"
					],
					"monthNames": [
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
						"December"
					],
					"firstDay": 1
				},
				"alwaysShowCalendars": true,
				"startDate": moment().startOf('month').format('DD/MM/YYYY'),
				"endDate": moment().format('DD/MM/YYYY'),
				"opens": "center"
			}, function (start, end, label) {
				date = {
					start: start.startOf('day').format('YYYY-MM-DD'),
					end: end.add(1, 'day').endOf('day').format('YYYY-MM-DD'),
				};
				self.fetchMisData();
			});
		});
		this.scroll = this.scroll.bind(this)
	},
	fetchMisData() {
		this.setState({ ...this.state, loading: true });
		fetch(`/admin/api/mis/${JSON.stringify(date)}`)
			.then((res) => res.json())
			.then((res) => {
				this.setState({
					...this.state,
					response: res,
					loading: false
				});
			})
			.catch(() => {
				this.setState({ ...this.state, loading: false });
			});
	},
	scroll(direction) {
		let far = $('.react-tabs__tab-list').width() / 2 * direction;
		let pos = $('.react-tabs__tab-list').scrollLeft() + far;
		$('.react-tabs__tab-list').animate({ scrollLeft: pos }, 500)
	},
	renderTabContent(tabName, bookingDetails = []) {
		const filteredBookingDetails = tabName === 'Booking Details' ? (bookingDetails || []) : (bookingDetails || []).filter(_item => _item.subCategory === tabName)
		return (<div className="flex-container booking-detailssection">
			<div className="row">
				<div className="col-lg-12">
					<div className="title-row">
						{tabName}
				</div>
					<hr className="title-hr" />
				</div>
				<div className="col-lg-12">
					<div className="panel panel-primary filterable custom-table">
						<table className="table table-striped table-bordered">
							<thead>
								<tr className="filters">
									<th>Membership ID</th>
									<th>Month</th>
									<th>Customer Name</th>
									<th>Category</th>
									<th>Offer</th>
									<th>City</th>
									<th>Count</th>
								</tr>
							</thead>
							<tbody>
								{(filteredBookingDetails || []).map((listValue, index) => {
									return (<tr>
										<td><Link to={{
											pathname: "/admin/customers",
											query: {
												filters: `[{"path":"userName","value":"${listValue.customer.userName}"}]`,
												columns: 'userName, name,phoneNumbers, email, engagementStatus, comments, updatedBy',
												srbn: 5,
												page: 1
											}
										}}>{listValue.customer.userName}</Link></td>
										<td><span
											className="month_w">{moment(listValue.followupDate || listValue.createdAt).format('MMM-YY')}</span>
										</td>
										<td>{`${listValue.customer.name.first || ''} ${listValue.customer.name.last || ''}`}</td>
										<td>{listValue.subCategory}</td>
										<td>{listValue.offer.name}</td>
										<td>{listValue.customer.city}</td>
										<td>{listValue.totalCount}</td>
									</tr>)
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>)
	},
	render() {
		const { response = {}, loading = false } = this.state || {};
		console.log('oh yeah', this.state);
		let customerEnquiryTotal = 0, otherOutbounCallTotal = 0;
		customerEnquiryTotal = response.customerEnquiries && response.customerEnquiries[(response.customerEnquiries).length - 1]['total'].count;
		otherOutbounCallTotal = response.otherOutbounds && response.otherOutbounds[(response.otherOutbounds).length - 1]['total'].count;
		let filteredBookinDetails = [];
		(response.bookingDetails || []).forEach((listValue, index) => {
			let foundIndex = '';
			let found = false;
			let date1 = listValue.followupDate || moment(listValue.createdAt).format('MMM-YY');
			found = filteredBookinDetails.find((el, i) => {
				let date2 = el.followupDate || moment(el.createdAt).format('MMM-YY');
				if (el.customer.userName === listValue.customer.userName && date1 === date2 && el.offer.name === listValue.offer.name && el.subCategory === listValue.subCategory) {
					foundIndex = i;
					return true;
				} else {
					return false;
				}
			});
			if (found) {
				filteredBookinDetails[foundIndex].totalCount = (filteredBookinDetails[foundIndex].totalCount || 0) + 1;
			} else {
				listValue.totalCount = 1;
				filteredBookinDetails.push(listValue);
			}
		});

		return (
			<section className="body-wrapper" style={{ position: 'relative' }}>
				{
					loading && <div style={{
						position: 'absolute',
						zIndex: 1000,
						background: 'rgba(255,255,255,0.7)',
						height: '100%',
						width: '100%'
					}}>
						<img style={{ position: 'absolute', top: '14%', left: '24%' }}
							src={'https://thumbs.gfycat.com/FaintSpicyAnnashummingbird-size_restricted.gif'} />
					</div>
				}
				<Tabs selectedIndex={this.state && this.state.tabIndex ? this.state.tabIndex : 0}
					onSelect={tabIndex => this.setState({ tabIndex })}>

					<div className="sticky-tabs">
						<a className="prevLeft" onClick={this.scroll.bind(null, -1)}>&#10094;</a>
						<TabList>
							<Tab>Mis</Tab>
							<Tab>Voc</Tab>
							<Tab>Booking Details</Tab>
							<Tab>BMW Privileges</Tab>
							<Tab>Bespoke Travel</Tab>
							<Tab>Highlife</Tab>
							<Tab>Grandstand</Tab>
							<Tab>Outbound Call</Tab>
						</TabList>
						<a className="nextRight" onClick={this.scroll.bind(null, 1)}>&#10095;</a>
						<div className="sticky-range">
							<span>Select Range</span>
							<div className="date-from-to">
								<input type="text" name="date-range" id="date-range-picker"
									className="dashboard-input-date" />
							</div>
						</div>
					</div>
					<TabPanel>
						<div className="flex-container">

							<div className="col-lg-12">
								<div className="title-row">
									Mis
								</div>
								<hr className="title-hr" />
							</div>
							<div className="row">
								<div className="col-lg-9">
									<div className="panel panel-primary filterable custom-table">
										<div className="panel-heading">
											<div className="panel-title">Customer Enquiry</div>
										</div>
										<table className="table table-striped table-bordered">
											<thead>
												<tr className="filters">
													<th>Row Labels</th>
													<th>Contact Center</th>
													<th>Email / eDM</th>
													<th>Outbound</th>
													<th>Total</th>
												</tr>
											</thead>
											<tbody>
												{(response.customerEnquiries || []).map((listValue, index) => {
													return (<tr>
														<td>{listValue.rowLabel}</td>
														<td><Link to={listValue.contactCenter.link}>{listValue.contactCenter.count}</Link></td>
														<td><Link to={listValue.email.link}>{listValue.email.count}</Link></td>
														<td><Link to={listValue.outbound.link}>{listValue.outbound.count}</Link></td>
														<td><Link to={listValue.total.link}>{listValue.total.count}</Link></td>
													</tr>)
												})}
											</tbody>

										</table>
									</div>
									<div className="panel panel-primary filterable custom-table">
										<div className="panel-heading">
											<div className="panel-title">Others -Outbound only</div>
										</div>
										<table className="table table-striped table-bordered">
											<tbody>
												{(response.otherOutbounds || []).map((listValue, index) => {
													return (<tr>
														<td>{listValue.rowLabel}</td>
														<td><Link to={listValue.contactCenter.link}>{listValue.contactCenter.count}</Link></td>
														<td><Link to={listValue.email.link}>{listValue.email.count}</Link></td>
														<td><Link to={listValue.outbound.link}>{listValue.outbound.count}</Link></td>
														<td><Link to={listValue.total.link}>{listValue.total.count}</Link></td>
													</tr>)
												})}
												<tr className="filters-balck">
													<td colSpan="4" className="text-left">Grand Total of Inbound &
														Outbound
												</td>
													<td>{Number(customerEnquiryTotal) + Number(otherOutbounCallTotal)}</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
								<div className="col-lg-3">
									<div className="panel panel-primary filterable custom-table">
										<div className="panel-heading">
											<div className="panel-title">Conversions</div>
										</div>
										<table className="table table-striped table-bordered">
											<thead>
												<tr className="filters">
													<th>Enquiries</th>
													<th>Bookings</th>
												</tr>
											</thead>
											<tbody>
												{(response.customerEnquiries || []).map((listValue, index) => {
													return (
														<tr className={index === response.customerEnquiries.length - 1 ? 'filters' : ''}>
															<td><Link to={listValue.enquiries.link}>{listValue.enquiries.count}</Link></td>
															<td><Link to={listValue.bookings.link}>{listValue.bookings.count}</Link></td>
														</tr>)
												})}
											</tbody>
										</table>
									</div>
								</div>
								<div className="col-lg-6">
									<div className="panel panel-primary filterable custom-table">
										<div className="panel-heading">
											<div className="panel-title">Bookings -Details</div>
										</div>
										<table className="table table-striped table-bordered">
											<tbody>
												{(response.bookingCount || []).map((listValue, index) => {
													return (<tr className="filters">
														<td>{listValue.offer}</td>
														<td><Link to={listValue.link}>{listValue.count}</Link></td>
													</tr>)
												})}
											</tbody>
										</table>
									</div>
								</div>
								<div className="col-lg-6">
									<div className="panel panel-primary filterable custom-table">
										<div className="panel-heading">
											<div className="panel-title">Enquiry -Details</div>
										</div>
										<table className="table table-striped table-bordered">
											<tbody>
												{(response.enquiresCount || []).map((listValue, index) => {
													return (<tr>
														<td>{listValue.offer}</td>
														<td><Link to={listValue.link}>{listValue.count}</Link></td>
													</tr>)
												})}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</TabPanel>
					<TabPanel>
						<div className="flex-container voc-section">
							<div className="row">
								<div className="col-lg-12">
									<div className="title-row">
										VOC
									</div>
									<hr className="title-hr" />
								</div>
								<div className="col-lg-12">
									<div className="panel panel-primary filterable custom-table">
										<table className="table table-striped table-bordered">
											<thead>
												<tr className="filters">
													<th>Sr. <br />No.</th>
													<th>Membership id</th>
													<th>Person Name</th>
													<th>Person Mobile</th>
													<th>Person Email</th>
													<th>City</th>
													<th>Event/Campaign</th>
													<th>VOC</th>
												</tr>
											</thead>
											<tbody>
												{(response.voc || []).map((listValue, index) => {
													return (
														<tr>
															<td>{index + 1}</td>
															<td><Link to={{
																pathname: "/admin/customers",
																query: {
																	filters: `[{"path":"userName","value":"${listValue.customer.userName}"}]`,
																	columns: 'userName, name,phoneNumbers, email, engagementStatus, comments, updatedBy',
																	srbn: 5,
																	page: 1
																}
															}}>{listValue.customer.userName}</Link></td>
															<td><span
																className="span_col">{`${listValue.customer.name.first || ''} ${listValue.customer.name.last || ''}`}</span>
															</td>
															<td>{(listValue.customer.phoneNumbers || []).join(',\n')}</td>
															<td>{listValue.customer.email}</td>
															<td>{listValue.customer.city}</td>
															<td>{listValue.callType}</td>
															<td><Link to={{
																pathname: "/admin/followups",
																query: {
																	filters: `[{"path":"isVoc","value":"true"}, {"path":"createdAt","mode":"between","inverted":false,"value":"${new Date(+new Date() - (1000 * 60 * 60 * 24 * 90)).toISOString()}","before":"${new Date(date.end).toString()}","after":"${new Date(date.start).toString()}"}]`,
																	columns: 'customer, subCategory, callType, offer, createdAt, isVoc',
																	srbn: 5,
																	page: 1
																}
															}}><p className="pera">{listValue.comments || ''}</p></Link>
															</td>
														</tr>
													);
												})}
											</tbody>
										</table>
									</div>
								</div>
								<div className="col-lg-12">
									<div className="panel panel-primary filterable custom-table">
										<table className="table table-striped table-bordered">
											<thead>
												<tr className="filters">
													<th colSpan="5" className="th_blacksrtip">
														<div className="panel-heading">
															<div className="panel-title text-white">Customer Escalations
														</div>
														</div>
													</th>
												</tr>
												<tr className="filters">
													<th>Sr. <br />No.</th>
													<th>Membership ID</th>
													<th>Month</th>
													<th>Customer Name</th>
													<th>Dealership</th>
												</tr>
											</thead>
											<tbody>
												{(response.escalation || []).map((listValue, index) => {
													return (<tr className="">
														<td>{index + 1}</td>
														<td>{listValue.customer.userName}</td>
														<td><span
															className="month_w">{moment(listValue.followupDate || listValue.createdAt).format('MMM-YY')}</span>
														</td>
														<td>{`${listValue.customer.name.first || ''} ${listValue.customer.name.last || ''}`}</td>
														<td>{listValue.customer.dealership.name}</td>
													</tr>)
												})}
											</tbody>

										</table>
									</div>
								</div>
							</div>
						</div>
					</TabPanel>
					<TabPanel>
						{this.renderTabContent("Booking Details", filteredBookinDetails)}
					</TabPanel>
					<TabPanel>
						{this.renderTabContent("BMW Privileges", filteredBookinDetails)}
					</TabPanel>
					<TabPanel>
						{this.renderTabContent("Bespoke Travel", filteredBookinDetails)}
					</TabPanel>
					<TabPanel>
						{this.renderTabContent("Highlife", filteredBookinDetails)}
					</TabPanel>
					<TabPanel>
						{this.renderTabContent("Grandstand", filteredBookinDetails)}
					</TabPanel>
					<TabPanel>
						<div className="flex-container booking-detailssection">
							<div className="row">
								<div className="col-lg-12">
									<div className="title-row">
										Outbound Call
									</div>
									<hr className="title-hr" />
								</div>
								<div className="col-lg-12">
									<div className="panel panel-primary filterable custom-table">
										<table className="table table-striped table-bordered">
											<thead>
												<tr className="filters">
													<th>Call<br /> Disposition</th>
													{((response.boundCall || {}).callTypeOptions || []).map((listValue, index) => {
														return (<th>{listValue}</th>)
													})}
												</tr>
											</thead>
											<tbody>
												{((response.boundCall || {}).callDisposition || []).map((listValue, index) => {
													return (
														<tr>
															<th>{listValue}</th>
															{((response.boundCall || {}).callTypeOptions || []).map((_header) => {
																return (<td>{response.boundCall[listValue][_header]}</td>)
															})}
														</tr>)
												})}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</TabPanel>
				</Tabs>
			</section>
		);
	},
});

module.exports = Mis;
