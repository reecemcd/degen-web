import { Grid, GridItem } from '@chakra-ui/react';
import MetamaskButton from '../src/shared/components/auth/metamask-button.js';

const Connect = () => {
  return (
    <Grid>
      <GridItem w="50%" h="10" bg="blue.500">
        <MetamaskButton />
      </GridItem>
    </Grid>
  );
};

export default Connect;
