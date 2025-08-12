import Image from "next/image";
import React from "react";
import { formateName } from "../lib/utils";

const UserProfile = ({ user }) => {
  if (!user) return <p className="text-center p-5">No user data available.</p>;
  const { name, email, image } = user;

  const renderProfileImage = user?.image ? (
    <Image
      src={image}
      alt={name}
      className="block mx-auto ring-2 ring-transparent ring-offset-4 shadow-md rounded-full w-20 h-20 object-cover"
      width="80"
      height="80"
    />
  ) : (
    <span className="w-20 h-20 text-2xl flex justify-center mx-auto items-center rounded-full bg-gray-200 font-medium text-gray-800">
      {formateName(name)}
    </span>
  );

  return (
    <div className="p-5">
      <h2 className="pb-5 lg:text-center font-semibold">Profile Overview</h2>
      <div className="flex justify-start items-center gap-5 lg:gap-0 lg:flex-col">
        {renderProfileImage}
        <div className="w-full">
          <h3 className="lg:mt-5 font-medium text-gray-900 lg:text-center">{name}</h3>
          <div className="lg:text-center block">
            <a
              href={`mailto:${email}`}
              className="text-blue-500 lg:p-2 rounded-md text-sm lg:text-center inline-block mx-auto hover:underline"
            >
              {email}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
