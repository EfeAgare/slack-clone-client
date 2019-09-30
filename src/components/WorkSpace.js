import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const WorkSpaceWrapper = styled.div`
  grid-column: 1;
  grid-row: 1 / 5;
  background-color: #362234;
  color: #958993;
`;

const WorkSpaceList = styled.ul`
  width: 100%;
  padding-left: 0px;
  list-style: none;
`;

const WorkSpaceListItem = styled.li`
  height: 50px;
  width: 50px;
  background-color: #676066;
  color: #fff;
  margin: auto;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  border-radius: 11px;
  &:hover {
    border-style: solid;
    border-width: thick;
    border-color: #767676;
  }
`;

const WorkSpace = ({ id, letter }) => (
  <Link key={`workSpaces-${id}`} to={`/view-workspace/${id}`}>
    <WorkSpaceListItem>{letter}</WorkSpaceListItem>
  </Link>
);

export default ({ allWorkSpaces }) => {
  return (
    <WorkSpaceWrapper>
      <WorkSpaceList>
        {allWorkSpaces.map(WorkSpace)}
        <Link key="add-team" to="/create-workspace">
          <WorkSpaceListItem>+ </WorkSpaceListItem>
        </Link>
      </WorkSpaceList>
    </WorkSpaceWrapper>
  );
};
