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
        // Check if the keyword already exists
        const existingKeyword = keywords.find((k) => k.word === word);
        if (existingKeyword) {
            alert('Keyword already exists');
            return;
        }

        const newId = crypto.randomUUID();

        // Create the translations object with the specified language having the translation,
        // and other languages having empty translations
        const newTranslations = initialvalues.languages.reduce((acc, language) => {
            acc[language] = language === lang ? translation : '';
            return acc;
        }, {});

        // Create the new keyword object
        const newKeyword = {
            id: newId,
            word: word,
            translations: newTranslations,
        };

        // Update the keywords array and state
        const updatedKeywords = [...keywords, newKeyword];
        setKeywords(updatedKeywords);
        localStorage.setItem('keywords', JSON.stringify(updatedKeywords));
    };

    const changeTranslation = (id, lang, newTranslation) => {
        // Find the keyword with the given id
        const keywordToUpdate = keywords.find((keyword) => keyword.id === id);

        // If the keyword is not found, do nothing
        if (!keywordToUpdate) {
            console.log(`Keyword with id ${id} not found`);
            return;
        }

        // Check if there are any languages without a translation
        const hasEmptyTranslation = Object.values(keywordToUpdate.translations).some(
            (translation) => translation === ''
        );

        // If there are no empty translations, do nothing
        if (!hasEmptyTranslation) {
            console.log('All languages already have translations, no update needed');
            return;
        }

        // Update the translation for the specified language
        const updatedKeywords = keywords.map((keyword) => {
            if (keyword.id === id) {
                return {
                    ...keyword,
                    translations: {
                        ...keyword.translations,
                        [lang]: newTranslation,
                    },
                };
            }
            return keyword;
        });

        // Update state and localStorage
        setKeywords(updatedKeywords);
        localStorage.setItem('keywords', JSON.stringify(updatedKeywords));
    };

    const reorderKeywords = (newKeywords) => {
        setKeywords(newKeywords);
    };

    useEffect(() => {
        localStorage.setItem('translationData', JSON.stringify({ keywords, languages: initialvalues.languages }));
    }, [keywords]);



    return (
        <TranslationsContext.Provider
            value=
            {{
                keywords, reorderKeywords, addKeyword, changeTranslation, languages: initialvalues.languages, selectedlang, setSelectedLang
            }}
        >
            {children}
        </TranslationsContext.Provider>
    )
}


export default TranslationsProvider;