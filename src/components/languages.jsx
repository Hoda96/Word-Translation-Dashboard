import { useTranslation } from "../hook/useTranslation"

function Languages() {
  const { languages, selectedlang, setSelectedLang } = useTranslation();

  return (
    <div>
      <select value={selectedlang} defaultValue={selectedlang} onChange={(e) => setSelectedLang(e.target.value)}>
        {languages.map((lang) => (
          <option key={lang} value={lang} onChange={(e) => setSelectedLang(e.target.value)}>
            {lang}
          </option>
        ))}

      </select>
    </div>
  )
}

export default Languages