import { useState } from 'react';
import { useTranslation } from '../hook/useTranslation';

const KeywordItems = ({ keyword, language }) => {
  const { changeTranslation } = useTranslation();
  const [isEditable, setIsEditable] = useState(false);
  const [inputValue, setInputValue] = useState(keyword.translations[language] || '');

  const handleInputClick = (e) => {
    e.preventDefault();
    setIsEditable(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      changeTranslation(keyword.id, language, inputValue);
      setIsEditable(false);
    }
  };

  return (
    <div className="keyword-item">
      <span>{keyword.word}</span>
      {isEditable ? (
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            changeTranslation(keyword.id, language, inputValue);
            setIsEditable(false);
          }}
          onMouseDown={(e) => e.stopPropagation()}
          placeholder="Enter translation"
          autoFocus
        />
      ) : (
        <span onClick={handleInputClick}>
          {keyword.translations[language] || '...'}
        </span>
      )}
    </div>
  );
};

export default KeywordItems;