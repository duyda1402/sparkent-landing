import { createBrowserRouter } from 'react-router-dom';
import HomePage from '@/pages/Home/index';
import AcademyPage from '@/pages/Academy/index';
import BookingPage from '@/pages/Booking/index';
import NotFoundPage from '@/pages/NotFound/index';
import ArtistDetailPage from '@/pages/ArtistDetail/index';
import ProjectDetailPage from '@/pages/ProjectDetail/index';
import PillarPage from '@/pages/Pillar/index';
import Layout from '@/components/Layout';

/**
 * Router Configuration with canonical clean URLs:
 * /academy -> Dedicated Spark Academy Page
 * /booking -> Dedicated Spark Booking Hub
 * /artists/:slug -> Dedicated Artist Profile
 * /projects/:slug -> Dedicated Case Study
 * /about/:pillar -> Intro pillar pages (learn | create | develop | release)
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/academy',
        element: <AcademyPage />,
      },
      {
        path: '/booking',
        element: <BookingPage />,
      },
      {
        path: '/artists/:slug',
        element: <ArtistDetailPage />,
      },
      {
        // Keep the hidden project inaccessible through its direct URL.
        path: '/projects/city-of-stars',
        element: <NotFoundPage />,
      },
      {
        path: '/projects/:slug',
        element: <ProjectDetailPage />,
      },
      {
        path: '/about/:pillar',
        element: <PillarPage />,
      },
      // Convenience aliases for direct navigation
      {
        path: '/about',
        element: <HomePage />,
      },
      {
        path: '/ecosystem',
        element: <HomePage />,
      },
      {
        path: '/studio',
        element: <HomePage />,
      },
      {
        path: '/media',
        element: <HomePage />,
      },
      {
        path: '/label',
        element: <HomePage />,
      },
      {
        path: '/artists',
        element: <HomePage />,
      },
      {
        path: '/projects',
        element: <HomePage />,
      },
      {
        path: '/news',
        element: <HomePage />,
      },
      {
        path: '/contact',
        element: <HomePage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
