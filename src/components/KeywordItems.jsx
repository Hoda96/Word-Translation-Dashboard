import { useState } from 'react';
import { useTranslation } from '../hook/useTranslation';

const KeywordItems = ({ keyword, language }) => {

  const { changeTranslation } = useTranslation();
  const [isEditable, setIsEditable] = useState(false);

  const handleInputMouseDown = (e) => {
    e.preventDefault();
    setIsEditable((prev) => !prev)
  };

  return (
    <div className="keyword-item">
      <span>{keyword.word}</span>
      {isEditable ? (
        <input
          type="text"
          value={keyword.translations[language] || ''}
          onChange={(e) => changeTranslation(keyword.id, language, e.target.value)}
          onMouseDown={(e) => e.stopPropagation()}
          placeholder="Enter translation"
        />
      ) : (
        <span onClick={(e) => handleInputMouseDown(e)
        }>{keyword.translations[language] || '...'}</span>
      )}
    </div>
  );
};

export default KeywordItems;