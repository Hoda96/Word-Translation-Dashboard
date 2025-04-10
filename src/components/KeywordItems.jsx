import { useState } from 'react';
import { useTranslation } from '../hook/useTranslation'

function KeywordItems({ keyword, language }) {
  const [isEditable, setIsEditable] = useState(false);
  const { changeTranslation } = useTranslation();
  console.log('keyword', keyword, language);

  return (
    <div className="keyword-item">

      <span>{keyword.word}</span>
      <span onClick={(prev) => setIsEditable(!prev)}>{keyword.translations[language] || '...'}</span>

      {isEditable &&
        <input
          type="text"
          value={keyword.translations[language] || ''}
          onChange={(e) => changeTranslation(keyword.id, language, e.target.value)}
          placeholder="Enter translation"
        />

      }

    </div>
  )
}

export default KeywordItems