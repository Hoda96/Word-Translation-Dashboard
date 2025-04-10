import TranslationsProvider from "./context/TranslationsContext"
import Main from "./pages/main";
import ManagementTranslations from "./pages/managementTranslations";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
function App() {

  return (
    <TranslationsProvider>
      <BrowserRouter>
        <nav>
          <Link to="/">Management Dashboard</Link>
          <Link to="/public">Public View</Link>
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
