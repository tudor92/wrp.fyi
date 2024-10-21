import { Title, Text, Container, Group, Anchor, Center } from '@mantine/core';
import Link from 'next/link';
import classes from './styles/NotFound.module.css';
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
    <Container className={classes.root}>
      <Center className={classes.description}><Logo/></Center>
      <Title className={classes.title}>You have found a secret place.</Title>
      <Text size="lg" ta="center" className={classes.description}>
        Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has
        been moved to another URL.
      </Text>
      <Group justify="center">
      <Text>Taking you to <Anchor size="lg" component={Link} href={hrefWraply}>wraply.io</Anchor></Text>
      </Group>
    </Container>
  );
}
