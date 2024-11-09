// Loading animation
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-greyBlue/60 before:to-transparent";

export function ColumnSkeleton() {
  return (
    <div className={`flex w-full flex-col overflow-hidden md:col-span-4`}>
      <div
        className={`${shimmer} relative mb-4 h-8 w-36 rounded-md bg-darkGreyBlue`}
      />
      <div
        className={`${shimmer} relative w-[280px] flex grow flex-col justify-between rounded-xl bg-darkGreyBlue p-4`}
      />
    </div>
  );
}

export default function LoadingSkeleton() {
  return (
    <>
      <div
        className={`relative h-screen m-trans ml-[250px] scroll-m-0 bg-greyBlue p-6 pt-[112.6px]`}
      >
        <div className="flex gap-6 h-full">
          <ColumnSkeleton />
          <ColumnSkeleton />
          <ColumnSkeleton />
          <ColumnSkeleton />
        </div>
      </div>
    </>
  );
}
