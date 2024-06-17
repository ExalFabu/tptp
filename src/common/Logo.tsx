import { Box, useColorModeValue } from '@chakra-ui/react';
import Image from "next/legacy/image";
import React from 'react';

const WhiteLogo = ({ display = "inherit", ...props }: { display?: string }) => {
  return (
    <Box display={display}>
      <Image
        alt="TPTP Logo"
        src={'/images/TPTP-w.svg'}
        {...props}
      />
    </Box>
  );
};

const BlackLogo = ({ display = "inherit", ...props }: { display?: string }) => {
  return (
    <Box display={display}>
      <Image
        alt="TPTP Logo"
        src={'/images/TPTP-b.svg'}
        {...props}
      />
    </Box>
  );
};

const Logo = ({ ...props }) => {
  const colorMode = useColorModeValue('white', 'black');
  if (colorMode === "white")
    return <BlackLogo {...props} />
  else
    return (
      <WhiteLogo  {...props} />
    );
};
export default React.memo(Logo)
