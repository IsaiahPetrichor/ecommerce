import { FC } from 'react';
import './footer.css';

const Footer: FC = () => {
	return (
		<footer>
			<p data-testid="copyright">© 2022 - Isaiah Petrichor</p>
			<p data-testid="contact">
				Contact us:{' '}
				<a href="mailto:contact@petrichorcoffee.com">
					contact@petrichorcoffee.com
				</a>
			</p>
			<p className="dev-note">Note: this is a dev project, not a real store.</p>
		</footer>
	);
};

export default Footer;
