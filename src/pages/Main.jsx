import { DndContext } from "@dnd-kit/core/dist";
import KeywordItems from "../components/KeywordItems";
import KeywordList from "../components/KeywordList";
import Languages from "../components/languages";
import { useTranslation } from "../hook/useTranslation";

function Main() {

  const { keywords, languages, selectedLang } = useTranslation();
  console.log(keywords, languages, selectedLang);

  return (
    <>
      <div className="public-view">
        <div className="header">
          <h1>Word Translations</h1>
          <Languages />
        </div>
        <KeywordList />

      </div>

    </>
  )
}

export default Main;
