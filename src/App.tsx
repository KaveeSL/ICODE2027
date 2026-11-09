import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { CallForPapersPage } from './pages/CallForPapersPage'
import { RegistrationPage } from './pages/RegistrationPage'
import { ProgrammePage } from './pages/ProgrammePage'
import { GovernancePage } from './pages/GovernancePage'
import { ProceedingsPage } from './pages/ProceedingsPage'

const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="call-for-papers" element={<CallForPapersPage />} />
          <Route path="registration" element={<RegistrationPage />} />
          <Route path="programme" element={<ProgrammePage />} />
          <Route path="programme/:daySlug" element={<ProgrammePage />} />
          <Route path="governance" element={<GovernancePage />} />
          <Route path="proceedings" element={<ProceedingsPage />} />
          <Route path="abstracts" element={<Navigate to="/proceedings" replace />} />
          <Route path="gallery" element={<Navigate to="/" replace />} />
          <Route path="gallery/:daySlug" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
