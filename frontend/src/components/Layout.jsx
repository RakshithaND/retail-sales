import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Box,
  FileText,
  ShieldCheck,
  Ban,
  Lock,
} from "lucide-react";

import { FaFileInvoiceDollar, FaFileInvoice } from "react-icons/fa";
import { Tooltip } from "react-tooltip";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50 font-inter">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl border-r border-gray-200 flex flex-col">

        {/* Brand */}
        <div className="p-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md">
          <h1 className="text-xl font-bold tracking-wide">
            Retail<span className="text-yellow-300">X</span>
          </h1>
          <p className="text-xs opacity-80 mt-1">Smart Sales Monitor</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-6 text-gray-700">
          
          {/* MAIN */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
              Main
            </p>

            <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" to="/" />
            <NavItem icon={<Box size={18} />} label="Nexus" to="/nexus" />
            <NavItem icon={<FileText size={18} />} label="Intake" to="/intake" />
          </div>

          {/* SERVICES */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
              Services
            </p>

           
            <NavItem icon={<Ban size={18} />} label="Blocked" to="/blocked" />
            <NavItem icon={<Lock size={18} />} label="Closed" to="/closed" />
          </div>

          {/* INVOICES */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
              Invoices
            </p>

            {/* PROFORMA (disabled UI but clickable) */}
            <DisabledItem
              icon={<FaFileInvoiceDollar size={18} />}
              label="Proforma Invoices"
              to="/proforma"
            />

            {/* FINAL INVOICES (disabled UI but clickable) */}
            <DisabledItem
              icon={<FaFileInvoice size={18} />}
              label="Final Invoices"
              to="/final-invoices"
            />
          </div>

        </nav>

        {/* Footer */}
        <div className="p-4 text-xs text-gray-500 border-t">
          © {new Date().getFullYear()} RetailX — All Rights Reserved
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8 bg-gray-50 overflow-y-auto">{children}</main>

      {/* Tooltip Component */}
      <Tooltip id="tooltip" place="right" effect="solid" />
    </div>
  );
}

/* ---------------------- NAV ITEM ---------------------- */
function NavItem({ icon, label, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 py-2 px-3 rounded-lg cursor-pointer transition-all text-sm ${
          isActive
            ? "bg-indigo-100 text-indigo-700 font-medium shadow-sm"
            : "hover:bg-gray-100 text-gray-700"
        }`
      }
    >
      {icon}
      {label}
    </NavLink>
  );
}

/* ---------------------- DISABLED ITEM ---------------------- */
function DisabledItem({ icon, label, to }) {
  return (
    <NavLink
      to={to}
      data-tooltip-id="tooltip"
      data-tooltip-content="Yet to add"
      className="flex items-center gap-3 py-2 px-3 rounded-lg cursor-not-allowed text-gray-400 bg-gray-100"
    >
      {icon}
      {label}
    </NavLink>
  );
}
