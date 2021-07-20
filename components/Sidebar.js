import { Flex, Stack } from '@chakra-ui/layout';
import { Avatar, IconButton, Button } from '@chakra-ui/react';
import { ChatIcon, ChevronDownIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useColorMode } from '@chakra-ui/color-mode';

const Sidebar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex direction="column">
      <Flex>
        <Avatar m="3" />
        <Stack isInline>
          <IconButton icon={<ChatIcon />} _focus={{ boxShadow: 'none' }} size="sm" isRound />
          <IconButton
            size="sm"
            isRound
            onClick={toggleColorMode}
            _focus={{ boxShadow: 'none' }}
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          />

          <IconButton icon={<ChevronDownIcon />} _focus={{ boxShadow: 'none' }} size="sm" isRound />
        </Stack>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
