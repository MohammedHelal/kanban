import { signIn } from "@/auth";
import Image from "next/image";
import google from "@/src/assets/google.png";
import github from "@/src/assets/github.png";
import Link from "next/link";

function SignIn() {
  return (
    <div className="w-[350px] mt-[50px] py-[15px] px-[20px] bg-white border-0 shadow-xl rounded-lg">
      <svg
        width="153"
        height="26"
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto"
      >
        <g fill="none" fillRule="evenodd">
          <path
            d="M44.56 25v-5.344l1.92-2.112L50.928 25h5.44l-6.304-10.432 6.336-7.04h-5.92l-5.92 6.304V.776h-4.8V25h4.8Zm19.36.384c2.176 0 3.925-.672 5.248-2.016V25h4.48V13.48c0-1.259-.315-2.363-.944-3.312-.63-.95-1.51-1.69-2.64-2.224-1.13-.533-2.432-.8-3.904-.8-1.856 0-3.483.427-4.88 1.28-1.397.853-2.352 2.005-2.864 3.456l3.84 1.824a4.043 4.043 0 0 1 1.424-1.856c.65-.47 1.403-.704 2.256-.704.896 0 1.605.224 2.128.672.523.448.784 1.003.784 1.664v.48l-4.832.768c-2.09.341-3.648.992-4.672 1.952-1.024.96-1.536 2.176-1.536 3.648 0 1.579.55 2.816 1.648 3.712 1.099.896 2.587 1.344 4.464 1.344Zm.96-3.52c-.597 0-1.099-.15-1.504-.448-.405-.299-.608-.715-.608-1.248 0-.576.181-1.019.544-1.328.363-.31.885-.528 1.568-.656l3.968-.704v.544c0 1.067-.363 1.973-1.088 2.72-.725.747-1.685 1.12-2.88 1.12ZM81.968 25V14.792c0-1.003.299-1.808.896-2.416.597-.608 1.365-.912 2.304-.912.939 0 1.707.304 2.304.912.597.608.896 1.413.896 2.416V25h4.8V13.768c0-1.323-.277-2.48-.832-3.472a5.918 5.918 0 0 0-2.32-2.32c-.992-.555-2.15-.832-3.472-.832-1.11 0-2.09.208-2.944.624a4.27 4.27 0 0 0-1.952 1.904V7.528h-4.48V25h4.8Zm24.16.384c1.707 0 3.232-.405 4.576-1.216a8.828 8.828 0 0 0 3.184-3.296c.779-1.387 1.168-2.923 1.168-4.608 0-1.707-.395-3.248-1.184-4.624a8.988 8.988 0 0 0-3.2-3.28c-1.344-.81-2.848-1.216-4.512-1.216-2.112 0-3.787.619-5.024 1.856V.776h-4.8V25h4.48v-1.664c.619.661 1.392 1.168 2.32 1.52a8.366 8.366 0 0 0 2.992.528Zm-.576-4.32c-1.301 0-2.363-.443-3.184-1.328-.821-.885-1.232-2.043-1.232-3.472 0-1.408.41-2.56 1.232-3.456.821-.896 1.883-1.344 3.184-1.344 1.323 0 2.41.453 3.264 1.36.853.907 1.28 2.053 1.28 3.44 0 1.408-.427 2.56-1.28 3.456-.853.896-1.941 1.344-3.264 1.344Zm17.728 4.32c2.176 0 3.925-.672 5.248-2.016V25h4.48V13.48c0-1.259-.315-2.363-.944-3.312-.63-.95-1.51-1.69-2.64-2.224-1.13-.533-2.432-.8-3.904-.8-1.856 0-3.483.427-4.88 1.28-1.397.853-2.352 2.005-2.864 3.456l3.84 1.824a4.043 4.043 0 0 1 1.424-1.856c.65-.47 1.403-.704 2.256-.704.896 0 1.605.224 2.128.672.523.448.784 1.003.784 1.664v.48l-4.832.768c-2.09.341-3.648.992-4.672 1.952-1.024.96-1.536 2.176-1.536 3.648 0 1.579.55 2.816 1.648 3.712 1.099.896 2.587 1.344 4.464 1.344Zm.96-3.52c-.597 0-1.099-.15-1.504-.448-.405-.299-.608-.715-.608-1.248 0-.576.181-1.019.544-1.328.363-.31.885-.528 1.568-.656l3.968-.704v.544c0 1.067-.363 1.973-1.088 2.72-.725.747-1.685 1.12-2.88 1.12ZM141.328 25V14.792c0-1.003.299-1.808.896-2.416.597-.608 1.365-.912 2.304-.912.939 0 1.707.304 2.304.912.597.608.896 1.413.896 2.416V25h4.8V13.768c0-1.323-.277-2.48-.832-3.472a5.918 5.918 0 0 0-2.32-2.32c-.992-.555-2.15-.832-3.472-.832-1.11 0-2.09.208-2.944.624a4.27 4.27 0 0 0-1.952 1.904V7.528h-4.48V25h4.8Z"
            className="fill-magnumGrey"
            fillRule="nonzero"
          />
          <g transform="translate(0 1)" fill="#635FC7">
            <rect width="6" height="25" rx="2" />
            <rect opacity=".75" x="9" width="6" height="25" rx="2" />
            <rect opacity=".5" x="18" width="6" height="25" rx="2" />
          </g>
        </g>
      </svg>
      <hr className="-mx-[20px] my-[15px] border-greyBlue" />
      <form
        action={async (formData) => {
          "use server";
          await signIn("credentials", formData);
        }}
      >
        <h2 className="mb-[15px] text-3xl text-darkPurple">Sign in</h2>
        <div className="my-[5px]">
          <label className="text-md text-darkPurple" htmlFor="email">
            Email:
          </label>
          <input
            name="email"
            type="email"
            className="w-full border-[1px] rounded-md border-lightPurple p-1 pl-3"
          />
        </div>
        <div className="my-[5px]">
          <label className="text-md text-darkPurple" htmlFor="password">
            Password:
          </label>
          <input
            name="password"
            type="password"
            className="w-full border-[1px] rounded-md border-lightPurple p-1 pl-3"
          />
        </div>
        <button
          id="submitCredentialBtn"
          name="submitCredentialBtn"
          type="submit"
          className="py-[10px] px-[25px] mt-[15px] text-white bg-indigo-500 hover:bg-indigo-700 border-0 rounded-md w-full w-[calc(50% - 10px)]"
        >
          Sign in
        </button>
      </form>
      <div className="my-[15px]">
        <Link href="/register" className="text-darkPurple hover:underline">
          Register, if you dont have an account
        </Link>
      </div>
      <div className="relative">
        <hr className="-mx-[20px] my-[15px] border-greyBlue" />
        <p className="absolute left-[calc(50%-20px)] -top-[13px] text-platinum px-[15px] bg-white">
          or
        </p>
      </div>
      {/*<form
        action={async (formData) => {
          "use server";
          await signIn("nodemailer", formData);
        }}
      >
        <input
          name="email"
          type="email"
          placeholder="Email..."
          className="my-[5px] w-full border-[1px] rounded-md border-lightPurple p-1 pl-3"
        />
        <button
          id="submitEmailBtn"
          name="submitEmailBtn"
          className="py-[10px] px-[25px] mt-[5px] text-white bg-darkPurple hover:bg-darkerPurple border-0 rounded-md w-full w-[calc(50% - 10px)]"
        >
          Sign in by email
        </button>
      </form>
      <div className="relative">
        <hr className="-mx-[20px] my-[15px] border-greyBlue" />
        <p className="absolute left-[calc(50%-20px)] -top-[13px] text-platinum px-[15px] bg-white">
          or
        </p>
      </div>*/}
      <form
        action={async () => {
          "use server";
          await signIn();
        }}
      >
        <div className="flex items-center justify-between">
          <button
            id="github"
            className="flex items-center p-[10px] bg-magnumGrey hover:bg-platinum text-white border-[1px] border-magnumGrey hover:border-platinum rounded-md w-[calc(50% - 10px)] cursor-pointer"
            formAction={async () => {
              "use server";
              await signIn("github");
            }}
          >
            <Image src={github} priority className="w-[15px] mr-[5px]" alt="" />
            Sign in with GitHub
          </button>
          <button
            id="google"
            className="flex items-center p-[10px] bg-white hover:bg-darkPurple text-darkPurple hover:text-white border-darkPurple border-[1px] rounded-md w-[calc(50% - 10px)] cursor-pointer"
            formAction={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <Image src={google} priority className="w-[15px] mr-[5px]" alt="" />
            Sign in with Google
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;

/*
      <div className="w-full my-[15px]">
        <input
          id="username"
          name="username"
          className="w-full py-[10px] px-[15px] border-[1px] border-darkGreyBlue  ouline-0 rounded-lg"
          placeholder="User name or email address"
        />
      </div>
      <div className="w-full my-[15px]">
        <input
          id="password"
          name="password"
          type="password"
          className="w-full py-[10px] px-[15px] border-[1px] border-darkGreyBlue ouline-0 rounded-lg"
          placeholder="password"
        />
      </div>
*/
