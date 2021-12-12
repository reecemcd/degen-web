import { Box, Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import * as React from 'react';
import NextLink from 'next/link';
import { GuildDTO } from '../../core/interfaces/guild.dto';
import PoapTableCard from './poap-table-card';
import { useCallback, useEffect, useState } from 'react';
import { PoapSettingsDTO } from '../../core/interfaces/poap-settings.dto';

export interface PoapView {
  activeGuild: GuildDTO;
}

export function PoapView({ activeGuild }: PoapView) {
  const [state, setState] = useState({
    poapEvents: [],
  });

  const loadEvents = useCallback(() => {
    fetch(`/api/poap/event/${activeGuild?.id}`)
      .then((res) => res.json())
      .then(({ poapEvents }) => {
        setState({
          ...state,
          poapEvents: poapEvents.map((poapEvent: PoapSettingsDTO) => ({
            event: poapEvent.event,
            isActive: poapEvent.isActive,
            startTime: poapEvent.startTime,
            endTime: poapEvent.endTime,
            discordUserId: poapEvent.discordUserId,
            voiceChannelId: poapEvent.voiceChannelId,
            voiceChannelName: poapEvent.voiceChannelName,
            discordServerId: poapEvent.discordServerId,
            members: poapEvent.members,
            _id: poapEvent._id,
          })),
        });
      });
  }, []);

  useEffect(() => {
    loadEvents();
  }, [activeGuild.id, loadEvents]);

  return (
    <>
      {/* Toolbar Row */}
      <PoapTableCard
        title="POAP Events"
        description="Manage Poap Events for server"
        events={state.poapEvents}
      ></PoapTableCard>
    </>
  );
}
function setState(arg0: any) {
  throw new Error('Function not implemented.');
}
