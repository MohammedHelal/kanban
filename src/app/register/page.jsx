import Register from "@/src/auth/Register";
import office from "@/src/assets/office-workers-gettyimages.jpg";

export default async function RegisterPage() {
  return (
    <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden">
      <div className="rounded-bottom flex justify-center absolute top-0 -left-[250px] -right-[250px] h-[55%] overflow-hidden -z-10">
        <div className="absolute top-0 left-0 right-0 bottom-0  bg-darkPurple/80 -z-20" />
        <div
          className={`office-img absolute -top-[25px] w-[75%] h-[120%] bg-cover -z-30`}
          style={{
            backgroundImage: `url(${office.src})`,
            boxShadow: "0 -12px 12px 12px white inset",
          }}
        />
      </div>
      <Register />
    </div>
  );
}
