export default function Layout({ children }: any) {
  return (
    <>
      <main
        id="main"
        className="min-h-screen overflow-hidden flex flex-col items-center"
      >
        {children}
      </main>
    </>
  );
}
