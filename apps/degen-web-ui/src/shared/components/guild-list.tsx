import { Box, Flex } from '@chakra-ui/layout';
import { BaseProps } from '../../core/interfaces/app-props.interface';
import { Guild } from '../../core/models/guild';
import { GridRow } from '../../layout/grid-row';
import { GuildListItem } from './guild-list-item';

export interface GuildProps extends BaseProps {
  availableGuilds: Guild[];
}

export function GuildList({ availableGuilds }: GuildProps) {
  const guilds = availableGuilds;
  if (availableGuilds?.length > 0) {
    const guildItems = guilds.map((guild) => (
      <Box key={guild.id} className="col-span-full p-3">
        <GuildListItem guild={guild}></GuildListItem>
      </Box>
    ));
    return <GridRow span="full">{guildItems}</GridRow>;
  }

  return <Box>No Guilds Available</Box>;
}
