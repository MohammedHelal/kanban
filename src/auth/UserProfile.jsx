import { useState, useEffect, useContext } from "react";
import { UserContext } from "../store/user-context";
import { ModalContext } from "../store/modal-context";
import Image from "next/image";
import { signOut } from "next-auth/react";
import profile from "@/src/assets/profile-user.png";

function UserProfile() {
  const { user } = useContext(UserContext);
  const { closeUserProfileModal } = useContext(ModalContext);
  const [imageSrc, setImageSrc] = useState(profile);

  useEffect(() => {
    function closeUserModal(event) {
      if (event.key === "Escape" || event.key === "Esc") {
        closeUserProfileModal();
      }
    }
    window.addEventListener("keydown", closeUserModal, false);

    return () => {
      window.removeEventListener("keydown", closeUserModal, false);
    };
  });

  useEffect(() => {
    if (user.image) {
      setImageSrc(user.image);
    }
  }, [user]);

  function addDefaultImg() {
    setImageSrc(profile);
  }

  return (
    <div className="">
      <button
        type="reset"
        className="block ml-auto -mr-6 md:-mr-12 -mt-6 md:-mt-12 rounded-tr-lg focus:outline-none user-profile-close"
        onClick={() => {
          closeUserProfileModal();
        }}
      >
        <i className="user-profile-close fa-solid fa-x p-3 pr-4 border-0 text-orange hover:bg-orange hover:text-white cursor-pointer"></i>
      </button>
      <Image
        src={imageSrc}
        alt="user image"
        width="200"
        height="200"
        onError={addDefaultImg}
        unoptimized={true}
        className="lg:w-[250px] lg:h-[250px] rounded-full border-0 mx-auto mb-[50px]"
      />
      <div className="flex justify-between items-center w-full">
        <h4>Name</h4>
        <p className="text-left font-bold text-magnumGrey dark:text-darkGreyBlue">
          {user.name}
        </p>
      </div>
      <hr />
      <div className="flex justify-between items-center w-full">
        <h4>Email</h4>
        <p className="text-left font-bold text-magnumGrey dark:text-darkGreyBlue">
          {user?.email}
        </p>
      </div>
      <hr />
      <button
        id="signOutBtn"
        onClick={() => signOut({ callbackUrl: "http://localhost:3000/" })}
        className="py-[3px] px-[25px] mt-[35px] text-white bg-orange hover:bg-lightOrange border-0 rounded-md w-full w-[calc(50% - 10px)]"
      >
        Sign out
      </button>
    </div>
  );
}

export default UserProfile;
