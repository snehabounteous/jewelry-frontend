// src/components/Footer.test.tsx

import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('<Footer />', () => {
  test('renders without crashing', () => {
    render(<Footer />);
    expect(screen.getByLabelText('Footer')).toBeInTheDocument();
  });

  test('displays the brand name', () => {
    render(<Footer />);
    expect(screen.getByText('LUMIÈRE')).toBeInTheDocument();
  });

  test('shows the copyright text', () => {
    render(<Footer />);
    expect(screen.getByText('© 2024 Lumière. All rights reserved.')).toBeInTheDocument();
  });

  test('renders the brand logo', () => {
    render(<Footer />);
    expect(screen.getByLabelText('Brand logo')).toBeInTheDocument();
  });

  test('renders five stars', () => {
    render(<Footer />);
    const stars = screen.getAllByTestId('lucide-star');
    expect(stars).toHaveLength(5);
  });
});
