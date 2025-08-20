// pages/InvoicePage.jsx
import { useState } from "react";
import Sidebar from "/";
import InvoiceForm from "@/components/InvoiceForm";
import InvoicePreview from "@/components/InvoicePreview";

export default function InvoicePage() {
  const [showPreview, setShowPreview] = useState(true);
  const [invoice, setInvoice] = useState({
    firstName: "",
    lastName: "",
    address: "",
    invoiceNumber: "INV-0231",
    currency: "USD",
    issuedDate: "2025-07-28",
    dueDate: "2025-07-31",
    items: [
      { name: "Website Design", qty: 1, cost: 49 },
      { name: "Logo", qty: 1, cost: 499 },
      { name: "3D Animation", qty: 1, cost: 1232 },
      { name: "Framer Sub.", qty: 1, cost: 190 },
    ],
    taxRate: 0.1,
    discount: 0,
  });

  const subtotal = invoice.items.reduce((acc, item) => acc + item.qty * item.cost, 0);
  const tax = subtotal * invoice.taxRate;
  const total = subtotal + tax - invoice.discount;

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6 grid grid-cols-1 gap-6 relative">
        <InvoiceForm
          invoice={invoice}
          setInvoice={setInvoice}
          togglePreview={() => setShowPreview(!showPreview)}
          showPreview={showPreview}
        />
        <InvoicePreview
          invoice={invoice}
          subtotal={subtotal}
          tax={tax}
          total={total}
          showPreview={showPreview}
          togglePreview={() => setShowPreview(!showPreview)}
        />
      </main>
    </div>
  );
}
