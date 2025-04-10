// src/pages/ManagementDashboard.tsx
import { useState } from 'react';
import { useTranslation } from '../hook/useTranslation';
import Languages from '../components/languages';
import KeywordList from '../components/KeywordList';


function ManagementDashboard() {
  const { addKeyword, selectedlang } = useTranslation();
  const [newWord, setNewWord] = useState('');
  const [newTranslation, setNewTranslation] = useState('');

  const handleAddKeyword = () => {
    if (newWord && newTranslation) {
      addKeyword(newWord, newTranslation, selectedlang);
      setNewWord('');
      setNewTranslation('');
    }
  };

  return (
    <div className="management-dashboard">
      <h1>Translation Management</h1>
      <Languages />
      <KeywordList isEditable={true} />
      <div className="add-keyword">
        <input
          type="text"
          placeholder="New keyword"
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
        />
        <input
          type="text"
          placeholder={`Translation in ${selectedlang}`}
          value={newTranslation}
          onChange={(e) => setNewTranslation(e.target.value)}
        />
        <button onClick={handleAddKeyword}>+ Add Keyword</button>
      </div>
    </div>
  );
};

export default ManagementDashboard;