import React from 'react';

import PropTypes from 'prop-types';
import shortid from 'shortid';
import { storiesOf, action } from '@storybook/react';
import IconSettings from '../../icon-settings';

import { CARD } from '../../../utilities/constants';
import Button from '../../button';
import Card from '../../card';
import CardEmpty from '../../card/empty';
import CardFilter from '../../card/filter';
import DataTable from '../../data-table';
import DataTableColumn from '../../data-table/column';
import DataTableHighlightCell from '../../data-table/highlight-cell';
import Icon from '../../icon';

import MediaObject from '../../media-object';
import InlineEdit from '../../forms/input/inline';

const sampleItems = [
	{ name: 'Cloudhub' },
	{ name: 'Cloudhub + Anypoint Connectors' },
	{ name: 'Cloud City' },
];

class DemoCard extends React.Component {
	static displayName = 'DemoCard';

	static propTypes = {
		items: PropTypes.array,
		header: PropTypes.node,
		heading: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
	};

	state = {
		filter: null,
		items: this.props.items,
	};

	handleFilterChange = (event, ...rest) => {
		action('filter')(event, ...rest);

		const filter =
			event.target.value !== '' ? RegExp(event.target.value, 'i') : null;

		this.setState({
			filter,
		});
	};

	handleDeleteAllItems = (...rest) => {
		action('delete all')(...rest);

		this.setState({
			filter: null,
			items: [],
		});
	};

	handleAddItem = (...rest) => {
		action('add')(...rest);

		this.setState({
			items: [{ name: `New item #${shortid.generate()}` }, ...this.state.items],
		});
	};

	render() {
		let items = this.state.items;
		if (this.state.filter) {
			items = items.filter((item) => this.state.filter.test(item.name));
		}

		const isEmpty = items.length === 0;

		let heading = this.props.heading;

		if (!this.props.heading) {
			heading =
				items.length > 0 ? `Related Items (${items.length})` : 'Related Items';
		}

		return (
			<div className="slds-grid slds-grid_vertical">
				<Card
					id="ExampleCard"
					filter={
						!isEmpty || this.state.filter ? (
							<CardFilter onChange={this.handleFilterChange} />
						) : null
					}
					header={this.props.header}
					headerActions={
						!isEmpty ? (
							<Button
								label="Delete All Items"
								onClick={this.handleDeleteAllItems}
							/>
						) : (
							<Button label="New" onClick={this.handleAddItem} />
						)
					}
					footer="Card Footer"
					heading={heading}
					icon={<Icon category="standard" name="document" size="small" />}
					empty={isEmpty ? <CardEmpty heading="No Related Items" /> : null}
				>
					<DataTable id="SLDSDataTableExample-1" items={items} bordered>
						<DataTableColumn label="Opportunity Name" property="name" truncate>
							<DataTableHighlightCell search={this.state.filter} />
						</DataTableColumn>
					</DataTable>
				</Card>
			</div>
		);
	}
}

const SetHeightCard = () => (
	<Card
		bodyClassName="slds-grow slds-scrollable_y"
		className="slds-grid slds-grid_vertical"
		footer={<a href="javascript:void(0);">Footer text</a>} // eslint-disable-line no-script-url
		heading="Card with set height"
		icon={<Icon category="standard" name="document" size="small" />}
		style={{ height: '300px' }}
	>
		<div className="slds-card__body_inner">
			<div>asdf</div>
			<div>asdf</div>
			<div>asdf</div>
			<div>asdf</div>
			<div>asdf</div>
			<div>asdf</div>
			<div>asdf</div>
			<div>asdf</div>
			<div>asdf</div>
			<div>asdf</div>
			<div>asdf</div>
			<div>asdf</div>
			<div>asdf</div>
		</div>
	</Card>
);

SetHeightCard.displayName = 'SET_HEIGHT_CARD';

storiesOf(CARD, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('w/ Items', () => <DemoCard items={sampleItems} />)
	.add('Empty', () => <DemoCard items={[]} />)
	.add('Custom Header', () => (
		<DemoCard
			header={
				<MediaObject
					body={
						<InlineEdit
							className="slds-text-heading_small slds-truncate"
							name="inline-edit-standard"
							value="Write your own heading"
							id="inline-edit-standard"
						/>
					}
				/>
			}
			items={sampleItems}
		/>
	))
	.add('Custom Heading', () => (
		<DemoCard
			items={sampleItems}
			heading={<span style={{ color: 'red' }}>To Wanda! This is custom!</span>}
		/>
	))
	.add('Set height card', () => <SetHeightCard />);
