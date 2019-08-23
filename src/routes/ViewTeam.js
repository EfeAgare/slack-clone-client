import React from 'react';

import Channels from '../components/Channels';
import Messages from '../components/Messages';
import AppLayout from '../components/AppLayout';
import SendMessage from '../components/SendMessage';
import Header from '../components/Header';
import Teams from '../components/Teams';

export default () => (
  <AppLayout>
    <Teams teams={[{ id: 1, letter: 'G' }, { id: 2, letter: 'F' }]} />
    <Channels
      teamName="Efe"
      username="Username"
      channels={[{ id: 1, name: 'general' }, { id: 2, name: 'random' }]}
      users={[{ id: 1, name: 'efe' }, { id: 2, name: 'knowledge' }]}
    >
      Channels
    </Channels>
    <Header channelName="general" />
    <Messages>
      <ul class="message-list">
        <li />
        <li />
      </ul>
    </Messages>
    <SendMessage channelName="general" />
  </AppLayout>
);
