// Loading animation

import logo from "@/src/assets/logo-dark.svg";
import logoMobile from "@/src/assets/logo-mobile.svg";
import more from "@/src/assets/icon-vertical-ellipsis.svg";

import Image from "next/image";

const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-greyBlue/60 dark:before:via-magnumGrey/60 before:to-transparent";

const shimmerWhite =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 dark:before:via-darkGrey/60 before:to-transparent";

export function ColumnSkeleton() {
  return (
    <div
      className={`w-[280px] shrink-0 flex flex-col overflow-hidden md:col-span-4`}
    >
      <div
        className={`${shimmer} relative mb-4 h-8 w-36 rounded-md bg-darkGreyBlue dark:bg-darkGrey`}
      />
      <div
        className={`${shimmer} relative w-[280px] my-3 px-4 flex grow flex-col justify-between rounded-xl bg-darkGreyBlue dark:bg-darkGrey`}
      />
    </div>
  );
}

export function HeaderSkeleton() {
  return (
    <header
      className={`absolute left-0 right-0 w-full h-[88.6px] p-0 flex items-center shadow-lg bg-white dark:bg-darkGrey border-b-[1px] dark:border-grey z-10`}
    >
      <div className="hidden md:flex items-center w-[250px] h-full border-r-[1px] border-greyBlue dark:border-grey">
        <Image src={logo} className="ml-[20px] mb-[5px]" alt="Logo" priority />
      </div>
      <div className="md:hidden flex items-center px-[20px] h-full border-r-[1px] border-greyBlue dark:border-grey">
        <Image src={logoMobile} className="" alt="Logo" priority />
      </div>
      <div
        className={`w-full md:w-[calc(100vw-250px)] p-6 flex justify-between items-center overflow-hidden md:col-span-4`}
      >
        <div
          className={`${shimmerWhite} relative h-12 w-32 md:w-52 rounded-md bg-greyBlue dark:bg-magnumGrey`}
        />
        <div className="relative flex justify-between items-center min-w-1/5">
          <div
            className={`${shimmerWhite} relative h-12 w-32 md:w-52 mr-3 rounded-md bg-greyBlue dark:bg-magnumGrey`}
          />
          <Image
            src={more}
            className="mx-3 mr-0 cursor-pointer"
            alt="drop down menu"
          />
        </div>
      </div>
    </header>
  );
}

export default function LoadingSkeleton() {
  return (
    <>
      <HeaderSkeleton />
      <main
        className={`relative h-screen m-trans md:ml-[250px] p-6 pt-[112.6px] scroll-m-0 bg-greyBlue dark:bg-magnumGrey`}
      >
        <div className="flex gap-12 h-full">
          <ColumnSkeleton />
          <ColumnSkeleton />
          <ColumnSkeleton />
          <ColumnSkeleton />
        </div>
      </main>
    </>
  );
}
