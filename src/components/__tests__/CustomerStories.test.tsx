import { render, screen } from '@testing-library/react';
import CustomerStories from '../CustomerStories';

describe('<CustomerStories />', () => {
  test('renders header with title and subtitle', () => {
    render(<CustomerStories />);
    expect(screen.getByText(/Customer Stories/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Discover what our customers say about their LUMIÈRE experience/i)
    ).toBeInTheDocument();
  });

  test('renders all review names', () => {
    render(<CustomerStories />);
    const names = ['Ariana', 'Sophia', 'Meera', 'Riya', 'Kavya', 'Anisha'];
    names.forEach((name) => {
      // Because reviews are duplicated, each name appears twice
      expect(screen.getAllByText(name).length).toBe(2);
    });
  });

  test('renders all review icons', () => {
    render(<CustomerStories />);
    const icons = ['💎', '🎁', '👂', '👑', '💍', '📿'];
    icons.forEach((icon) => {
      // Each icon duplicated
      expect(screen.getAllByText(icon).length).toBe(2);
    });
  });

  test('renders 4 control buttons', () => {
    render(<CustomerStories />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(4);
  });

  test('renders star ratings for each review', () => {
    render(<CustomerStories />);
    // Each review has 5 stars, duplicated -> 6*2*5 = 60 stars
    const stars = screen.getAllByText('★');
    expect(stars.length).toBe(60);
  });
});
