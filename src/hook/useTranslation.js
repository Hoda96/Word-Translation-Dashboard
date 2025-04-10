import { useContext } from "react"
import { TranslationsContext } from "../context/context"

export const useTranslation = () => {
    const context = useContext(TranslationsContext)
    if (context === undefined) {
        throw new Error("useTranslations must be used within a TranslationsProvider")
    }
    return context
}