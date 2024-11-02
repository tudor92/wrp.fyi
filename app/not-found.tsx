import { Logo } from '@/components/Logo/Logo'

export const metadata = {
  title: 'Wraply | Page Not Found | 404',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  },
};

export default async function NotFound() {

  const hrefWraply = process.env.HOST_MAIN_D || '/';

  return (
    <Logo/>
  );
}
