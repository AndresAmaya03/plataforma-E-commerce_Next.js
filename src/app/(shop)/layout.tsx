
export default function ShopLayout({children}: {
 children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-gray-400">
      {children}
    </main>
  );
}