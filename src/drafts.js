import { useState } from "react";
import { Card, CardContent } from "./components/ui/card";

export default function DraftsPage({ drafts = [], onSelectDraft, onDeleteDraft }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Invoice Drafts</h1>
      {drafts.length === 0 ? (
        <p className="text-gray-500">No drafts saved yet.</p>
      ) : (
        <div className="space-y-4">
          {drafts.map((draft, idx) => (
            <Card key={idx} className="max-w-xl">
              <CardContent className="flex flex-col md:flex-row md:items-center justify-between p-4">
                <div>
                  <div className="font-semibold">{draft.firstName} {draft.lastName}</div>
                  <div className="text-sm text-gray-600">Invoice #: {draft.invoiceNumber}</div>
                  <div className="text-sm text-gray-600">Address: {draft.address}</div>
                  <div className="text-sm text-gray-600">Items: {draft.items.length}</div>
                </div>
                <div className="flex gap-2 mt-2 md:mt-0">
                  <button
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={() => onSelectDraft(draft)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => onDeleteDraft(idx)}
                  >
                    Delete
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
