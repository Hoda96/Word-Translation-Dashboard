import KeywordList from "../components/KeywordList";
import Languages from "../components/languages";

function Main() {

  return (
    <>
      <div className="public-view">
        <div className="header">
          <h1>Word Translations</h1>
          <Languages />
        </div>
        <KeywordList isEditable={false} />

      </div>

    </>
  )
}

export default Main;
