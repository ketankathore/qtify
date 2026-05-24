import { fireEvent, render, screen } from '@testing-library/react';
import axios from 'axios';
import App from './App';

jest.mock('axios');
jest.mock(
  'swiper/react',
  () => ({
    Swiper: ({ children }) => <div data-testid="swiper">{children}</div>,
    SwiperSlide: ({ children }) => <div data-testid="swiper-slide">{children}</div>,
  }),
  { virtual: true }
);
jest.mock(
  'swiper/modules',
  () => ({
    Navigation: {},
  }),
  { virtual: true }
);
jest.mock('swiper/css', () => ({}), { virtual: true });
jest.mock('swiper/css/navigation', () => ({}), { virtual: true });

const mockedTopAlbums = [
  {
    id: 1,
    title: 'Sunset Vibes',
    image: 'https://example.com/sunset.jpg',
    followers: 1234,
  },
];

const mockedNewAlbums = [
  {
    id: 2,
    title: 'Midnight Echo',
    image: 'https://example.com/midnight.jpg',
    followers: 567,
  },
];

const mockedSongs = [
  {
    id: 11,
    title: 'Solar Pop',
    image: 'https://example.com/pop.jpg',
    likes: 500,
    genre: { key: 'pop', label: 'Pop' },
  },
  {
    id: 12,
    title: 'Moon Rock',
    image: 'https://example.com/rock.jpg',
    likes: 450,
    genre: { key: 'rock', label: 'Rock' },
  },
];

const mockedGenres = {
  data: [
    { key: 'jazz', label: 'Jazz' },
    { key: 'rock', label: 'Rock' },
    { key: 'pop', label: 'Pop' },
    { key: 'blues', label: 'Blues' },
  ],
};

beforeEach(() => {
  axios.get.mockImplementation((url) => {
    if (url.includes('/albums/top')) {
      return Promise.resolve({ data: mockedTopAlbums });
    }

    if (url.includes('/albums/new')) {
      return Promise.resolve({ data: mockedNewAlbums });
    }

    if (url.includes('/songs')) {
      return Promise.resolve({ data: mockedSongs });
    }

    if (url.includes('/genres')) {
      return Promise.resolve({ data: mockedGenres.data });
    }

    return Promise.reject(new Error('Unexpected URL'));
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

test('renders the QTify navbar, hero section, album sections, and song filters', async () => {
  render(<App />);

  expect(screen.getByRole('banner')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /give feedback/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /discover music that speaks to your soul/i })).toBeInTheDocument();

  expect(await screen.findByText(/sunset vibes/i)).toBeInTheDocument();
  expect(await screen.findByText(/midnight echo/i)).toBeInTheDocument();
  expect(screen.getByText(/1,234 follows/i)).toBeInTheDocument();

  expect(await screen.findByText(/solar pop/i)).toBeInTheDocument();
  expect(await screen.findByText(/moon rock/i)).toBeInTheDocument();
  expect(screen.getByText(/500 likes/i)).toBeInTheDocument();

  const collapseButtons = screen.getAllByRole('button', { name: /collapse/i });
  fireEvent.click(collapseButtons[0]);

  expect(screen.getAllByRole('button', { name: /show all/i }).length).toBeGreaterThan(0);

  fireEvent.click(screen.getByRole('tab', { name: /rock/i }));
  expect(screen.queryByText(/solar pop/i)).not.toBeInTheDocument();
  expect(screen.getByText(/moon rock/i)).toBeInTheDocument();
});
