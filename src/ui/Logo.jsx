import logo from "@/src/assets/logo-dark.svg";
import logoMobile from "@/src/assets/logo-mobile.svg";
import Image from "next/image";

function Logo() {
  return (
    <>
      <div className="hidden md:flex items-center w-[250px] h-full border-r-[1px] border-greyBlue">
        <Image src={logo} className="ml-[20px] mb-[5px]" alt="Logo" priority />
      </div>
      <div className="md:hidden flex items-center px-[20px] h-full border-r-[1px] border-greyBlue">
        <Image src={logoMobile} className="" alt="Logo" priority />
      </div>
    </>
  );
}

export default Logo;
