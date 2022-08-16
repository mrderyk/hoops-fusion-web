import React from 'react';
import { DirectoryImage, DirectoryLink, DirectoryList, DirectoryListItem, FirstName, LastName } from './styled';

interface DirectoryEntry {
  firstName: string;
  lastName: string;
  key: string;
  imgUrl: string;
}

interface DirectoryProps {
  entries: DirectoryEntry[];
}

export const Directory: React.FC<DirectoryProps> = ({ entries }) => {
  return (
    <DirectoryList>
    {
      entries.map((entry: DirectoryEntry) => (
        <DirectoryListItem key={`directory_entry_${entry.key}`}>
          <DirectoryLink href={`/player/${entry.key}`}>
            <DirectoryImage src={entry.imgUrl} />
            <LastName>{entry.lastName}</LastName>,
            <FirstName>{entry.firstName}</FirstName>
          </DirectoryLink>
        </DirectoryListItem>
      ))
    }
    </DirectoryList>
  )
}