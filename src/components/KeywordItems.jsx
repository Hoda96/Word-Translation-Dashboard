// src/components/KeywordItems.jsx
import { useTranslation } from '../hook/useTranslation';

const KeywordItems = ({ keyword, language, isEditable }) => {
  const { updateTranslation } = useTranslation();
  console.log('keyword.translations[language]', keyword.translations[language]);

  const handleInputMouseDown = (e) => {
    e.stopPropagation(); // Prevent drag from starting when clicking the input
  };

  return (
    <div className="keyword-item">
      <span>{keyword.word}</span>
      {isEditable ? (
        <input
          type="text"
          value={keyword.translations[language] || ''}
          onChange={(e) => updateTranslation(keyword.id, language, e.target.value)}
          onMouseDown={handleInputMouseDown}
          placeholder="Enter translation"
        />
      ) : (
        <span>{keyword.translations[language] || 'No translation yet'}</span>
      )}
    </div>
  );
};

export default KeywordItems;