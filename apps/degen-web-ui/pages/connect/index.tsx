import { useWeb3React } from '@web3-react/core';
import MetamaskButton from '../../src/shared/components/auth/metamask-button';
import { useSession } from 'next-auth/react';
import { SessionStatus } from '../../src/core/enums/auth.enums';
import React, { useEffect } from 'react';
import { GridContainer } from '../../src/shared/components/layout/grid-container';
import { Box } from '@chakra-ui/react';

const Connect = () => {
  const { account, active } = useWeb3React();
  const { data: session, status } = useSession();

  const activatedContent = (
    <div>
      <h1>Account: {account}</h1>
      <h1>Discord: {session?.user?.name}</h1>
    </div>
  );

  useEffect(() => {
    if (active && session?.user?.id) {
      fetch(`/api/wallet/connect`, {
        method: 'POST',
        body: JSON.stringify({
          account,
          userId: session.user.id,
          username: session.user.name,
        }),
        headers: new Headers({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
      });
    }
  }, [active, session, account]);

  return (
    <GridContainer className="py-6">
      <Box className="col-span-full">
        {session && status === SessionStatus.Authenticated ? (
          <MetamaskButton activatedContent={active && activatedContent} />
        ) : (
          <h1>Please login with Discord to continue. </h1>
        )}
      </Box>
    </GridContainer>
  );
};

export default Connect;
