import { useEffect, useState } from "react"
import { TranslationsContext } from "./context";
import initialWords from "../data/initialWords.json"


function TranslationsProvider({ children }) {
    const [keywords, setKeywords] = useState(() => {
        const storedKeywords = localStorage.getItem("keywords")
        return storedKeywords ? JSON.parse(storedKeywords) : initialWords.keyword
    });

    const [selectedLang, setSelectedLang] = useState("en");

    const addKeyword = (word, translation, lang) => {
        const existingKeyword = keywords.find((k) => k.word === word);

        let updatedKeywords;

        if (existingKeyword) {
            // Check if the language already has a translation
            if (existingKeyword.translations[lang]) {
                alert(`Translation for ${lang} already exists for "${word}"`);
                return;
            }

            updatedKeywords = keywords.map((keyword) => {
                if (keyword.word === word) {
                    return {
                        ...keyword,
                        translations: {
                            ...keyword.translations,
                            [lang]: translation,
                        },
                    };
                }
                return keyword;
            });
        } else {
            const newId = crypto.randomUUID();
            const newTranslations = initialWords.languages.reduce((acc, language) => {
                acc[language] = language === lang ? translation : '';
                return acc;
            }, {});

            const newKeyword = {
                id: newId,
                word: word,
                translations: newTranslations,
            };

            updatedKeywords = [...keywords, newKeyword];
        }

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
        localStorage.setItem('translationData', JSON.stringify({ keywords, languages: initialWords.languages }));
    }, [keywords]);



    return (
        <TranslationsContext.Provider
            value=
            {{
                keywords, reorderKeywords, addKeyword, changeTranslation, languages: initialWords.languages, selectedLang, setSelectedLang
            }}
        >
            {children}
        </TranslationsContext.Provider>
    )
}


export default TranslationsProvider;