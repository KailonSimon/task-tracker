import Navbar from "./Navbar";

export default function Layout({ children }: any) {
  return (
    <>
      <Navbar />
      <main
        id="main"
        className="pt-16 min-h-screen overflow-hidden flex flex-col items-center"
      >
        {children}
      </main>
    </>
  );
}
