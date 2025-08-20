

import { useState } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";



export default function InvoiceForm({ invoice, setInvoice, togglePreview, showPreview, onSend }) {
  const [feedback, setFeedback] = useState("");

  // Validation
  const isValid = () => {
    if (!invoice.firstName.trim() || !invoice.lastName.trim() || !invoice.address.trim()) return false;
    if (!invoice.items.length) return false;
    for (const item of invoice.items) {
      if (!item.name.trim() || item.qty <= 0 || item.cost <= 0) return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid()) {
      setFeedback("Please fill all required fields and ensure all product details are valid.");
      return;
    }
    setFeedback("");
    if (!showPreview) togglePreview();
  };

  const handleAddItem = () => {
    setInvoice({
      ...invoice,
      items: [...invoice.items, { name: "", qty: 1, cost: 0 }],
    });
  };

  const handleRemoveItem = (i) => {
    const items = invoice.items.filter((_, idx) => idx !== i);
    setInvoice({ ...invoice, items });
  };

  const handleSaveDraft = () => {
    setFeedback("Invoice saved as draft!");
  };

  const handleSend = () => {
    if (!isValid()) {
      setFeedback("Please fill all required fields and ensure all product details are valid.");
      return;
    }
    setFeedback("Invoice sent successfully!");
    if (onSend) onSend();
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: invoice.currency }).format(value);
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">New Invoice</h2>
            <div className="flex gap-2">
              <Button variant="outline" type="button" onClick={handleSaveDraft}>Save as Draft</Button>
              <Button className="bg-black text-white" type="button" onClick={handleSend}>Send Invoice</Button>
              <Button variant="outline" type="button" onClick={togglePreview} disabled={!isValid()}>
                {showPreview ? "Hide Preview" : "Show Preview"}
              </Button>
            </div>
          </div>

          {feedback && <div className="text-sm text-center text-red-500 mb-2">{feedback}</div>}

          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="First Name"
              className="border rounded p-2"
              value={invoice.firstName}
              onChange={(e) => setInvoice({ ...invoice, firstName: e.target.value })}
              required
            />
            <input
              placeholder="Last Name"
              className="border rounded p-2"
              value={invoice.lastName}
              onChange={(e) => setInvoice({ ...invoice, lastName: e.target.value })}
              required
            />
            <input
              placeholder="Address"
              className="col-span-2 border rounded p-2"
              value={invoice.address}
              onChange={(e) => setInvoice({ ...invoice, address: e.target.value })}
              required
            />
            <input
              placeholder="Invoice Number"
              className="border rounded p-2"
              value={invoice.invoiceNumber}
              readOnly
            />
            <select
              className="border rounded p-2"
              value={invoice.currency}
              onChange={(e) => setInvoice({ ...invoice, currency: e.target.value })}
            >
              <option>USD</option>
              <option>EUR</option>
            </select>
            <input
              type="date"
              className="border rounded p-2"
              value={invoice.issuedDate}
              onChange={(e) => setInvoice({ ...invoice, issuedDate: e.target.value })}
            />
            <input
              type="date"
              className="border rounded p-2"
              value={invoice.dueDate}
              onChange={(e) => setInvoice({ ...invoice, dueDate: e.target.value })}
            />
          </div>

          <h3 className="font-medium mt-4">Product Details</h3>
          {invoice.items.map((item, i) => (
            <div key={i} className="grid grid-cols-3 gap-2 mb-2 items-center">
              <input
                value={item.name}
                className="border rounded p-2"
                onChange={(e) => {
                  const items = [...invoice.items];
                  items[i].name = e.target.value;
                  setInvoice({ ...invoice, items });
                }}
                required
              />
              <input
                type="number"
                min="1"
                value={item.qty}
                className="border rounded p-2"
                onChange={(e) => {
                  const items = [...invoice.items];
                  items[i].qty = Number(e.target.value);
                  setInvoice({ ...invoice, items });
                }}
                required
              />
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={item.cost}
                  className="border rounded p-2 w-24"
                  onChange={(e) => {
                    const items = [...invoice.items];
                    items[i].cost = Number(e.target.value);
                    setInvoice({ ...invoice, items });
                  }}
                  required
                />
                <span className="text-xs text-gray-500">{formatCurrency(item.cost)}</span>
                {invoice.items.length > 1 && (
                  <Button type="button" variant="outline" className="px-2 py-1" onClick={() => handleRemoveItem(i)}>
                    Remove
                  </Button>
                )}
              </div>
            </div>
          ))}
          <Button type="button" variant="outline" className="mt-2" onClick={handleAddItem}>
            + Add Item
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
