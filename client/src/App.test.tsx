import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
//import App from './App';
import Footer from './footer';
import Header from './header';

test('Header returns title and links', () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
  // Verify Main Heading
  const header = screen.getByRole('heading');
  expect(header).toContainHTML('Petrichor Coffee');

  // Check Links
  const home = screen.getByRole('link', { name: 'Home' });
  expect(home).toBeInTheDocument();

  const products = screen.getByRole('link', { name: 'Products' });
  expect(products).toBeInTheDocument();

  const cart = screen.getByRole('link', { name: 'Cart' });
  expect(cart).toBeInTheDocument();

  const login = screen.getByRole('link', { name: 'Login' });
  expect(login).toBeInTheDocument();
});

test('Footer returns info and contact link', () => {
  render(
    <BrowserRouter>
      <Footer />
    </BrowserRouter>
  );
  const copyright = screen.getByTestId('copyright');
  expect(copyright).toContainHTML('© 2022 - Isaiah Petrichor');

  const devNote = screen.getByText(
    'Note: this is a dev project, not a real store.'
  );
  expect(devNote).toBeInTheDocument();

  const contact = screen.getByTestId('contact');
  expect(contact).toBeInTheDocument();
  const contactLink = screen.getByRole('link');
  expect(contactLink).toBeInTheDocument();
});
