import { useTranslation } from '../hook/useTranslation';

const KeywordItems = ({ keyword, language, isEditable }) => {
  const { changeTranslation } = useTranslation();

  const handleInputMouseDown = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="keyword-item">
      <span>{keyword.word}</span>
      {isEditable ? (
        <input
          type="text"
          value={keyword.translations[language] || ''}
          onChange={(e) => changeTranslation(keyword.id, language, e.target.value)}
          onMouseDown={handleInputMouseDown}
          placeholder="Enter translation"
        />
      ) : (
        <span>{keyword.translations[language] || '...'}</span>
      )}
    </div>
  );
};

export default KeywordItems;