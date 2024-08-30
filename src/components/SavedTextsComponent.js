import React from 'react';
import { SavedTextsContainer, SavedTextItem, DeleteButton, Input } from '../styles/styledComponents';

const SavedTextsComponent = ({
  isMobile,
  showSavedTexts,
  searchTerm,
  setSearchTerm,
  filteredTexts,
  handleSelectText,
  handleDeleteText,
  handleEditText
}) => {
  if (!showSavedTexts && isMobile) {
    return null;
  }

  return (
    <SavedTextsContainer>
      <Input
        type="text"
        placeholder="Search saved texts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredTexts.map((text) => (
        <SavedTextItem key={text.id}>
          <div onClick={() => handleSelectText(text)}>
            {text.content ? `${text.content.substring(0, 50)}...` : 'No content'}
          </div>
          <div>
            <DeleteButton onClick={() => handleDeleteText(text.id)}>Delete</DeleteButton>
            <DeleteButton onClick={() => handleEditText(text)}>Edit</DeleteButton>
          </div>
        </SavedTextItem>
      ))}
    </SavedTextsContainer>
  );
};

export default SavedTextsComponent;