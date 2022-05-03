import { FC } from 'react';
import './products.css';

interface Category {
	id: string;
	name: string;
	description: string;
}

type CategoryProp = {
	props: Category[];
};

const Filters: FC<CategoryProp> = (props) => {
	return (
		<div className="filters">
			<hr className="right-hr" />
			<div className="filter-menu">
				<div className="filter-header">
					<h2 className="filter-title">Filters</h2>
					<button>Clear</button>
				</div>
				<hr />
			</div>
		</div>
	);
};

export default Filters;
