import { Box } from '@chakra-ui/layout';
import { useSession } from 'next-auth/client';
import React, { useEffect, useState } from 'react';
import { Container } from '../../src/layout/container';
import { GridRow } from '../../src/layout/grid-row';
import { GuildList } from '../../src/shared/components/guild-list';
import styles from './admin.module.scss';

export default function AdminPage() {
  const [guilds, setGuilds] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch('api/discord/get-user-guilds');
    const availableGuilds = await response.json();

    setGuilds(availableGuilds);
  };

  return (
    <GridRow span="full" className="py-6">
      <Box className="col-span-full text-left p-10">
        <GuildList availableGuilds={guilds}></GuildList>
      </Box>
    </GridRow>
  );
}
