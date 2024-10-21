import { Center, Loader } from '@mantine/core';
import classes from '@/app/styles/Loading.module.css';

export default function Loading() {
    return (
    <Center className={classes.loader}>
      <Loader size={50} color="gray" type="dots" />
    </Center>);
  }
