
import { Card, CardContent } from "./components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

export default function InvoicePreview({ invoice, subtotal, tax, total, showPreview, togglePreview }) {
  return (
    <AnimatePresence>
      {showPreview && (
        <>
          {/* Background overlay */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-30 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={togglePreview}
          />
          {/* Slide-in panel */}
          <motion.div
            className="fixed right-0 top-0 h-full w-1/3 bg-white shadow-xl z-20"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          >
            <Card className="h-full">
              <CardContent className="p-6 overflow-y-auto">

                <h2 className="text-xl font-semibold mb-4">Invoice</h2>
                <p className="text-sm">Invoice Number: {invoice.invoiceNumber}</p>
                <p className="mt-2 text-sm">Billed by: {invoice.firstName} {invoice.lastName}</p>
                <p className="text-sm">Address: {invoice.address}</p>
                <p className="text-sm">Issued: {invoice.issuedDate}</p>
                <p className="text-sm">Due: {invoice.dueDate}</p>

                <div className="mt-4 border-t pt-2">
                  {invoice.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm mb-1">
                      <span>{item.name} (x{item.qty})</span>
                      <span>
                        {invoice.currency} {(item.qty * item.cost).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 border-t pt-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{invoice.currency} {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax ({invoice.taxRate * 100}%)</span>
                    <span>{invoice.currency} {tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{invoice.currency} {total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
