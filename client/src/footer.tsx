import { FC } from 'react';
import './footer.css';

const Footer: FC = () => {
	return (
		<footer>
			<p>© 2022 - Isaiah Petrichor</p>
			<p>
				Contact us:{' '}
				<a href="mailto:contact@petrichorcoffee.com">
					contact@petrichorcoffee.com
				</a>
			</p>
		</footer>
	);
};

export default Footer;
