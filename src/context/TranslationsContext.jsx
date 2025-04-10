import { useEffect, useState } from "react"
import { TranslationsContext } from "./context";

const initialvalues = {
    "keyword": [
        { id: 1, word: "hello", translations: { en: "hello", fa: "سلام", de: "hallo" } },
        { id: 2, word: "world", translations: { en: "world", fa: "جهان", de: "welt" } },
        { id: 3, word: "apple", translations: { en: "apple", fa: "سیب", de: "apfel" } }
    ],
    "languages": ["en", "fa", "de"]
}


function TranslationsProvider({ children }) {
    const [keywords, setKeywords] = useState(() => {
        const storedKeywords = localStorage.getItem("keywords")
        return storedKeywords ? JSON.parse(storedKeywords) : initialvalues.keyword
    });

    const [selectedlang, setSelectedLang] = useState("en");

    const addKeyword = (word, translation, lang) => {
        const newId = keywords.length ? Math.max(keywords.map(k => k.id)) + 1 : 1
        const newKeyword = {
            id: newId,
            word: word,
            translations: {
                [lang]: translation
            }
        }
        const updatedKeywords = [...keywords, newKeyword]
        setKeywords(updatedKeywords)
        localStorage.setItem("keywords", JSON.stringify(updatedKeywords))
    }

    const changeTranslation = (id, lang, newTranslation) => {
        const updatedKeywords = keywords.map((keyword) => {
            if (keyword.id === id) {
                return {
                    ...keyword,
                    translations: {
                        ...keyword.translations,
                        [lang]: newTranslation
                    }
                }
            }
            return keyword
        })
        setKeywords(updatedKeywords)
        localStorage.setItem("keywords", JSON.stringify(updatedKeywords))
    }
    useEffect(() => {
        localStorage.setItem('translationData', JSON.stringify({ keywords, languages: initialvalues.languages }));
    }, [keywords]);



    return (
        <TranslationsContext.Provider
            value=
            {{
                keywords, addKeyword, changeTranslation, languages: initialvalues.languages, selectedlang, setSelectedLang
            }}
        >
            {children}
        </TranslationsContext.Provider>
    )
}


export default TranslationsProvider;