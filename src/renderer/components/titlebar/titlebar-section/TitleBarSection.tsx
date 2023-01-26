import { Flex } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

type Align = 'left' | 'center' | 'right';

interface TitleBarSectionProps extends PropsWithChildren {
  align: Align;
}

function alignToFlex(align: Align): string {
  switch (align) {
    case 'left':
      return 'flex-start';
    case 'right':
      return 'flex-end';
    default:
      return align;
  }
}

export default function TitleBarSection({
  align,
  children,
}: TitleBarSectionProps) {
  return (
    <Flex width="33%" alignItems="center" justifyContent={alignToFlex(align)}>
      {children}
    </Flex>
  );
}
