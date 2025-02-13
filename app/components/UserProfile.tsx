import Image from "next/image";
import React from "react";

const UserProfile = ({ user }) => {
  if (!user) return <p className="text-center p-5">No user data available.</p>;
  const { name, email, image } = user;
  return (
    <div className="p-5">
      <h2 className="p-5 text-center font-semibold">Profile Overview</h2>
      <Image
        src={image}
        alt={name}
        className="block mx-auto ring-2 ring-transparent ring-offset-4 shadow-md rounded-full  min-w-[140px] min-h-[140px] w-full h-full max-w-[140px] max-h-[140px] object-cover"
        width="140"
        height="140"
      />
      <h3 className="mt-5 font-medium text-gray-900 text-center">{name}</h3>
    </div>
  );
};

export default UserProfile;
