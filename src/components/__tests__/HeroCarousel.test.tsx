import { render, screen, fireEvent, act } from '@testing-library/react';
import HeroCarousel from '../HeroCarousel';
import { useRouter } from 'next/navigation';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const slides = [
  {
    id: 1,
    title: 'Slide 1',
    subtitle: 'This is slide 1',
    ctaText: 'Shop Now',
    imageUrl: '/slide1.jpg',
  },
  {
    id: 2,
    title: 'Slide 2',
    subtitle: 'This is slide 2',
    ctaText: 'Explore',
    imageUrl: '/slide2.jpg',
  },
];

describe('<HeroCarousel />', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  test('renders first slide initially', () => {
    render(<HeroCarousel slides={slides} />);
    expect(screen.getByText('Slide 1')).toBeInTheDocument();
    expect(screen.getByText('This is slide 1')).toBeInTheDocument();
    expect(screen.getByText('Shop Now')).toBeInTheDocument();
  });

  test('clicking CTA button calls router.push', () => {
    render(<HeroCarousel slides={slides} />);
    fireEvent.click(screen.getByText('Shop Now'));
    expect(pushMock).toHaveBeenCalledWith('/products');
  });

  test('automatically changes slides after interval', () => {
    render(<HeroCarousel slides={slides} />);
    expect(screen.getByText('Slide 1')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(screen.getByText('Slide 2')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    // Loops back to first slide
    expect(screen.getByText('Slide 1')).toBeInTheDocument();
  });

  test('dot buttons navigate to respective slides', () => {
    render(<HeroCarousel slides={slides} />);
    const dots = screen.getAllByRole('button');

    // Click second dot
    fireEvent.click(dots[1]);
    expect(screen.getByText('Slide 2')).toBeInTheDocument();

    // Click first dot
    fireEvent.click(dots[0]);
    expect(screen.getByText('Slide 1')).toBeInTheDocument();
  });

  test('parallax offset updates on scroll', () => {
    render(<HeroCarousel slides={slides} />);
    const backgroundDivs = document.querySelectorAll(
      '.absolute.inset-0.bg-cover'
    ) as NodeListOf<HTMLElement>;

    // Initial offset
    backgroundDivs.forEach((div) => {
      expect(div.style.transform).toBe('translateY(0px)');
    });

    // Mock scroll
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
      window.dispatchEvent(new Event('scroll'));
    });

    backgroundDivs.forEach((div) => {
      expect(div.style.transform).toBe('translateY(30px)');
    });
  });
});
