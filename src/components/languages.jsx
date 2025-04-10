import { useTranslation } from "../hook/useTranslation"

function Languages() {
  const { languages, selectedLang, setSelectedLang } = useTranslation();
  return (
    <div className="language-selector">
      <select value={selectedLang} onChange={(e) => setSelectedLang(e.target.value)}>
        {languages.map((lang) => (
          <option key={lang} value={lang} onChange={(e) => setSelectedLang(e.target.value)}>
            {lang}
          </option>
        ))}

      </select>
    </div >
  )
}

export default Languages