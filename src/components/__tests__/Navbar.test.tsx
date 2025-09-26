import { render, screen, fireEvent, within } from '@testing-library/react';
import Navbar from '../Navbar';

// Mock Next.js
jest.mock('next/link', () => ({ children }: any) => children);
jest.mock('next/image', () => (props: any) => {
  const { priority, ...rest } = props; // strip priority
  return <img {...rest} />;
});
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

// Mock Zustand stores
jest.mock('@/store/useUserStore', () => ({
  useUserStore: () => ({
    isLoggedIn: true,
    user: { name: 'Test User' },
    logout: jest.fn(),
  }),
}));

jest.mock('@/store/useCart', () => ({
  useCart: () => ({
    cart: [
      { id: '1', name: 'Ring', quantity: 2, price: 1000, image: '/ring.jpg' },
    ],
    fetchCart: jest.fn(),
    removeFromCart: jest.fn(),
  }),
}));

describe('<Navbar />', () => {
  test('renders logo and brand', () => {
    render(<Navbar />);
    expect(screen.getByAltText('LUMIÈRE Logo')).toBeInTheDocument();
    expect(screen.getByText('LUMIÈRE')).toBeInTheDocument();
  });

  test('renders desktop nav links', () => {
    render(<Navbar />);
    ['Collections', 'About', 'Services', 'Contact'].forEach((link) => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });
  });

  test('cart badge shows correct count', () => {
    render(<Navbar />);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

// test('removeFromCart button works', async () => {
//   const { useCart } = require('@/store/useCart');
//   const removeMock = jest.spyOn(useCart(), 'removeFromCart');

//   render(<Navbar />);

//   // Open the cart
//   const cartButton = screen.getByLabelText('Shopping Bag');
//   fireEvent.click(cartButton);

//   // Wait for the Remove button
//   const removeBtn = await screen.findByText('Remove');
//   fireEvent.click(removeBtn);

//   expect(removeMock).toHaveBeenCalledWith('1');
// });


//   test('mobile menu opens and closes', () => {
//   render(<Navbar />);
  
//   const toggleBtn = screen.getByLabelText('Open mobile menu');
//   fireEvent.click(toggleBtn);

//   // Menu should now be expanded
//   const menu = screen.getByRole('menu'); // or find closest nav/ul
//   expect(menu).toBeVisible();

//   const closeBtn = screen.getByLabelText('Close mobile menu');
//   fireEvent.click(closeBtn);

//   // Check menu is hidden
//   expect(menu).not.toBeVisible(); // or expect(menu).toHaveAttribute('aria-expanded', 'false')
// });

});
