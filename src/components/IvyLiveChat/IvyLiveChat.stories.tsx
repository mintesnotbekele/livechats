import React from 'react';
import { Meta, Story } from '@storybook/react';

import IvyLiveChat, { IvyLiveChatProps } from './IvyLiveChat';

export default {
  title: 'IvyLiveChat',
  component: IvyLiveChat,
  argTypes: {
    userName: { control: 'text' },
    agentId: { control: 'text' },
  },
} as Meta;

const Template: Meta<IvyLiveChatProps> = (args) => <IvyLiveChat {...args} />;

export const Default = Template.bind({});
Default.args = {
  userName: 'Atomic_enrollment',
  agentId: '7Yuek8JRBEfepLiAMtLN',
};
