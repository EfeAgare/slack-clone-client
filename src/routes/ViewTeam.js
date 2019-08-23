import React from 'react';

import Channels from '../components/Channels';
export default () => (
  <div class="app-layout">
    <div class="teams">Teams</div>
    <Channels>Channels</Channels>
    <div class="header">Header</div>
    <div class="messages">
      <ul class="message-list">
        <li />
        <li />
      </ul>
    </div>
    <div class="input">
      <input type="text" placeholder="CSS Grid Layout Module" />
    </div>
  </div>
);
