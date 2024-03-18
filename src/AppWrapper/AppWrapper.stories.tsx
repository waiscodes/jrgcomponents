// Import React.
import React from 'react';

// Import Storybook.
import type { Meta, StoryObj } from '@storybook/react';

// Import Component.
import PopoutDrawerWrapperComponent, { PopoutDrawerWrapperProps } from './AppWrapper';
import { Box, Typography } from '@mui/material';
import SwitchDark from '../Theming/SwitchDark';
import SwitchColorblind from '../Theming/SwitchColorblind';

type Story = StoryObj<typeof meta>;

// Configure Component Stories.
export const DoubleMenuSingleLayer: Story = (args: PopoutDrawerWrapperProps) => (
  <PopoutDrawerWrapperComponent {...args}>
    <p>Page Contents</p>
  </PopoutDrawerWrapperComponent>
);
DoubleMenuSingleLayer.args = {
  title: 'Single Layer Menu',
  left: {
    heading: 'Left Menu',
    swr: null,
    menu: () => {
      return <div>Left Menu Contents</div>;
    },
    width: '20rem',
  },
  right: {
    heading: 'Right Menu',
    swr: null,
    menu: () => {
      return <div>Right Menu Contents</div>;
    },
    width: '20rem',
  },
  height: '3rem',
};
export const DoubleMenuDoubleLayer: Story = (args: any) => (
  <PopoutDrawerWrapperComponent {...args.outer}>
    <PopoutDrawerWrapperComponent {...args.inner}>
      <p>Page Contents</p>
    </PopoutDrawerWrapperComponent>
  </PopoutDrawerWrapperComponent>
);
DoubleMenuDoubleLayer.args = {
  inner: {
    title: 'Inner Popout Menu',
    left: {
      heading: 'Inner Left Menu',
      swr: null,
      menu: () => {
        return <div>Inner Left Menu Contents</div>;
      },
      width: '20rem',
    },
    right: {
      heading: 'Inner Right Menu',
      swr: null,
      menu: () => {
        return <div>Inner Right Menu Contents</div>;
      },
      width: '20rem',
    },
    height: '3rem',
    innerMost: true,
  },
  outer: {
    title: (
      <>
        <Box flex='1 1 auto' />
        <Box flex='2 1 auto'>
          <Typography variant='h6' component='h1' textAlign='center' height='100%'>
            Outer Popout Menu
          </Typography>
        </Box>

        <Box flex='1 1 auto' display='flex' justifyContent='flex-end' flexBasis='0' height='100%'>
          <SwitchDark />
          <SwitchColorblind />
        </Box>
      </>
    ),
    left: {
      heading: 'Outer Left Menu',
      swr: null,
      menu: () => {
        return <div>Outer Left Menu Contents</div>;
      },
      width: '20rem',
    },
    right: {
      heading: 'Outer Right Menu',
      swr: null,
      menu: () => {
        return <div>Outer Right Menu Contents</div>;
      },
      width: '20rem',
    },
    height: '3rem',
    footer: {
      height: '2rem',
      children: [
        <Typography key='by' variant='h6' component='p' textAlign='center' height='100%'>
          Created by Jameson Grieve
        </Typography>,
      ],
    },
  },
};
// Configure Metadata.
const meta: Meta = {
  title: 'Application/AppWrapper',
  component: PopoutDrawerWrapperComponent,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: 'A Double-Sided Popout Menu',
    docs: {
      description: {
        component: 'Provides an app bar with popout menus on either side.',
      },
    },
    references: [],
    argTypes: {
      title: { control: 'text' },
    },
    layout: 'fullscren',
  },
} satisfies Meta<typeof PopoutDrawerWrapperComponent>;
export default meta;