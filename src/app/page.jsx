import Logo from "../ui/Logo";

export default async function Home() {
  return (
    <>
      <header
        className={`absolute left-0 right-0 w-full h-[88.6px] p-0 flex items-center shadow-lg bg-white z-10`}
      >
        <Logo />
      </header>
      <main className={`h-screen bg-greyBlue`}></main>
    </>
  );
}
