// frontend/src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import SalesPage from "./pages/SalesPage";
import NexusPage from "./pages/NexusPage";
import IntakePage from "./pages/IntakePage";
import ActivePage from "./pages/ActivePage";
import BlockedPage from "./pages/BlockedPage";
import ClosedPage from "./pages/ClosedPage";
import ProformaPage  from "./pages/ProformaPage";
import FinalInvoicesPage from "./pages/FinalInvoicesPage";
export default function App(){
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<SalesPage />} />
        <Route path="/nexus" element={<NexusPage />} />
        <Route path="/intake" element={<IntakePage />} />
        <Route path="/active" element={<ActivePage />} />
        <Route path="/blocked" element={<BlockedPage />} />
        <Route path="/closed" element={<ClosedPage />} />
        <Route path="/proforma" element={<ProformaPage />} />
        <Route path="/final-invoices" element={<FinalInvoicesPage />} />
      
      </Routes>
    </Layout>
  );
}
