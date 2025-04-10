// src/pages/ManagementDashboard.tsx
import { useState } from 'react';
import { useTranslation } from '../hook/useTranslation';
import Languages from '../components/languages';
import KeywordList from '../components/KeywordList';


function ManagementDashboard() {
  const { addKeyword, selectedLang } = useTranslation();
  const [newWord, setNewWord] = useState('');
  const [newTranslation, setNewTranslation] = useState('');
  const [showAddKeyword, setShowAddKeyword] = useState(false)

  const handleAddKeyword = () => {
    if (newWord && newTranslation) {
      addKeyword(newWord, newTranslation, selectedLang);
      setNewWord('');
      setNewTranslation('');
    }
    setShowAddKeyword((prev) => !prev)
  };

  return (
    <div className="management-dashboard">
      <div className='header'>
        <h1>Translation Management</h1>
        <Languages />
      </div>

      <KeywordList isEditable={false} />
      <div className="add-keyword" >
        <button onClick={handleAddKeyword}>+ Add Keyword</button>
        {showAddKeyword &&
          <>
            <input
              type="text"
              placeholder="New keyword"
              value={newWord}
              onChange={(e) => setNewWord(e.target.value)}
            />
            <input
              type="text"
              placeholder={`Translation in ${selectedLang}`}
              value={newTranslation}
              onChange={(e) => setNewTranslation(e.target.value)}
            />
          </>
        }
      </div>
    </div>
  )
};

export default ManagementDashboard;