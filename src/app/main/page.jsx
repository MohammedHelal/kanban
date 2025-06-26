import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Logo from "../../ui/Logo";
import BoardWrapper from "./BoardWrapper";
import UserList from "./UserList";

export default async function Home() {
  const session = await auth();

  if (!session?.user) {
    console.log("logged out!");
    redirect("/");
  }

  return (
    <>
      <header
        className={`absolute left-0 right-0 w-full h-[88.6px] p-0 flex items-center shadow-lg bg-white dark:bg-darkGrey border-b-[1px] dark:border-grey z-10`}
      >
        <Logo />
      </header>
      <BoardWrapper>
        <div className="absolute top-0 bottom-0 right-0 left-0 flex justify-center items-center">
          <div>
            <h1 className="dark:text-platinum">
              Select or add board to continue
            </h1>
          </div>
        </div>
      </BoardWrapper>
    </>
  );
}
