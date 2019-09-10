import React from 'react';

import Messages from '../components/Messages';
import AppLayout from '../components/AppLayout';
import SendMessage from '../components/SendMessage';
import Header from '../components/Header';
import SideBar from '../containers/SideBar';

const ViewWorkSpace = ({ match: { params } }) => (
  <AppLayout>
    <SideBar currentWorkSpaceId={params.id} />
    <Header channelName="general" />
    <Messages>
      <ul className="message-list">
        <li />
        <li />
      </ul>
    </Messages>
    <SendMessage channelName="general" />
  </AppLayout>
);

export default ViewWorkSpace;
