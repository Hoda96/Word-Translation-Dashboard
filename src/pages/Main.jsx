import Languages from "../components/languages";
import { useTranslation } from "../hook/useTranslation";

function Main() {

  const { keywords, languages, selectedlang } = useTranslation();
  console.log(keywords, languages, selectedlang);

  return (
    <>
      <Languages />
      {keywords.map((keyword) => (
        < div key={keyword.id} >
          <div>{keyword.word}</div>
          <div>{Object.entries(keyword.translations).map(([lang, translation]) => (
            <div key={lang}>
              {lang}: {translation}
            </div>
          ))}</div>
        </div >
      ))
      }
      <div>Selected Language: {selectedlang}</div>
      <div>Available Languages: {languages.join(", ")}</div>
    </>
  )
}

export default Main;
