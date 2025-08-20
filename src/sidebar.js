export default function Sidebar({ onNavigate }) {
  return (
    <aside className="w-64 bg-white border-r p-4">
      <h2 className="text-xl font-bold mb-6">Knockturnals</h2>
      <nav className="space-y-4">
        <button type="button" className="block text-left w-full text-gray-700 hover:underline bg-transparent border-none p-0">MENU</button>
        <button type="button" className="block text-left w-full text-gray-700 hover:underline bg-transparent border-none p-0">Dashboard</button>
        <button type="button" className="block text-left w-full text-gray-700 hover:underline bg-transparent border-none p-0">Transactions</button>
        <button type="button" className="block text-left w-full text-gray-700 hover:underline bg-transparent border-none p-0">Wallet</button>
        <button type="button" className="block text-left w-full text-black font-semibold hover:underline bg-transparent border-none p-0" onClick={() => onNavigate && onNavigate("invoice")}>Invoice</button>
        <button type="button" className="block text-left w-full text-gray-700 hover:underline bg-transparent border-none p-0" onClick={() => onNavigate && onNavigate("drafts")}>View Drafts</button>
        <button type="button" className="block text-left w-full text-gray-700 hover:underline bg-transparent border-none p-0">Budgeting</button>
        <button type="button" className="block text-left w-full text-gray-700 hover:underline bg-transparent border-none p-0">Reports</button>
      </nav>
    </aside>
  );
}
