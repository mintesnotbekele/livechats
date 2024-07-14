import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import IvyLiveChat from './IvyLiveChat';

export default {
  title: 'IvyLiveChat',
  component: IvyLiveChat,
  argTypes: {
    userName: { control: 'text' },
    agentId: { control: 'text' },
  },
} as Meta;

const Template: StoryFn<typeof IvyLiveChat> = (args) => <IvyLiveChat {...args} />;

export const Default = Template.bind({});
Default.args = {
  userName: 'Atomic_enrollment',
  agentId: '7Yuek8JRBEfepLiAMtLN',
};
