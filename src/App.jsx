import TranslationsProvider from "./context/TranslationsContext"
import Main from "./pages/Main";
import ManagementTranslations from "./pages/ManagementTranslations";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
function App() {

  return (
    <TranslationsProvider>
      <BrowserRouter>
        <nav>
          <Link to="/translations">Management Dashboard</Link>
          <Link to="/">Public View</Link>
        </nav>
        <Routes>
          <Route path="/" index element={<Main />} />
          <Route path="/translations" element={<ManagementTranslations />} />
        </Routes>

      </BrowserRouter>

    </TranslationsProvider>
  )
}

export default App
