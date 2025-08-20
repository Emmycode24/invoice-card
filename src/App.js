

import { useState } from "react";
import Sidebar from "./sidebar";
import InvoiceForm from "./invoiceform";
import InvoicePreview from "./invoicepreview";

function App() {
  const [showPreview, setShowPreview] = useState(false);
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

  // Previewed invoice state
  const [previewInvoice, setPreviewInvoice] = useState(null);

  const subtotal = previewInvoice ? previewInvoice.items.reduce((acc, item) => acc + item.qty * item.cost, 0) : 0;
  const tax = previewInvoice ? subtotal * previewInvoice.taxRate : 0;
  const total = previewInvoice ? subtotal + tax - previewInvoice.discount : 0;

  // Handler to update preview and show it
  const handleSendAndPreview = () => {
    setPreviewInvoice(invoice);
    setShowPreview(true);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6 grid grid-cols-1 gap-6 relative">
        <InvoiceForm
          invoice={invoice}
          setInvoice={setInvoice}
          togglePreview={() => setShowPreview(!showPreview)}
          showPreview={showPreview}
          onSend={handleSendAndPreview}
        />
        {showPreview && previewInvoice && (
          <InvoicePreview
            invoice={previewInvoice}
            subtotal={subtotal}
            tax={tax}
            total={total}
            showPreview={showPreview}
            togglePreview={() => setShowPreview(false)}
          />
        )}
      </main>
    </div>
  );
}

export default App;
