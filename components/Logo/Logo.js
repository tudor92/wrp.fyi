import { Text, Title } from '@mantine/core';
import Link from 'next/link';

export function Logo() {
    return (
        <Title order={1}>
            <Text component={Link} inherit size="xl" fw={900} variant="gradient" gradient={{ from: 'white', to: 'yellow' }}
                href={process.env.HOST_MAIN_D}>
                wraply
            </Text>
        </Title>
    );
}
