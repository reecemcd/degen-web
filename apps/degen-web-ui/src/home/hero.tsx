import { Text, Link, Box } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { GridRow } from '../shared/components/layout/grid-row';

export function Hero() {
  return (
    <>
      <GridRow span="full" className="py-24">
        {/* Hero Text */}
        <Box className="col-span-full md:col-span-6 text-left">
          {/* <Box style={{ height: '400px', width: '800px' }} ></Box> */}
          <Text fontSize="5xl" className="font-bold leading-tight mb-4">
            Manage your crypto community
          </Text>
          <Text fontSize="xl" color="gray.500">
            Automate <Link href="https://poap.vote/">POAP</Link> distribution and
            more...
          </Text>
        </Box>
      </GridRow>
    </>
  );
}
