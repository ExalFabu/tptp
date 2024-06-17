import {
  Box, Progress
} from '@chakra-ui/react';
import { SDKProvider } from '@tma.js/sdk-react';
import React, { Suspense } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from '../app/store';
import Logo from '../common/Logo';

const TPTP = React.lazy(() => import('../app/TPTP'));

const LoadingProgress: React.FC = () => (
  <Box
    height={"100vh"}
    display={"grid"}
    gridTemplateColumns={"1fr 3fr 1fr"}
    gridTemplateRows={"1fr 1fr 1fr 1fr"}

  >
    <Box
      id={"LoadingPage"}
      gridRow={2}
      gridColumn={2}
      alignSelf={"center"}
      justifySelf={"end"}
      width={"100%"}
      position={"relative"}
      height={"100%"}
    >
      <Logo layout="fill" />
    </Box>
    <Progress gridRow={3} gridColumn={2} isIndeterminate color='green.300' mt={"2em"} size={"xs"} />
  </Box>
)

function App() {
  return (
    <PersistGate persistor={persistor} loading={<LoadingProgress />}>
      <Suspense fallback={<LoadingProgress />}>
        <SDKProvider debug={process.env.NODE_ENV !== 'production'}>
          <TPTP />
        </SDKProvider>
      </Suspense>
    </PersistGate>
  );
}

export default App;
