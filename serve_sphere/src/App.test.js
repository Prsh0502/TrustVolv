import { render, screen } from '@testing-library/react';
import App from './App';

test('renders ServeSphere app title', () => {
  render(<App />);
  const titleElement = screen.getByText(/ServeSphere/i);
  expect(titleElement).toBeInTheDocument();
});

test('shows upcoming events section', () => {
  render(<App />);
  const heading = screen.getByText(/Upcoming Events/i);
  expect(heading).toBeInTheDocument();
});
