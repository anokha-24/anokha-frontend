import React from "react";
import Image from "next/image";
import Link from "next/link";

const PhonePromo = () => {
  return (
    <div className="px-10 pt-10 z-10 md:flex justify-center gap-[60px] mx-auto w-full items-center">
      <div className="flex justify-center">
        <Image
          src="/images/apppromo.png"
          width={400}
          height={500}
          alt="Anokha 2024 mobile app mockups."
        />
      </div>
      <div className="text-white justify-center gap-0 md:w-[45%] bg-[rgba(0,0,0,0.4)] backdrop-blur-lg rounded-3xl p-8 mt-8">
        <h1 className="text-bold md:text-5xl sm:text-4xl w-fit">
          Anokha 2024 in Your Pocket!
        </h1>
        <h3 className="md:text-[1.1rem] leading-2 sm:text-md mt-8 text-justify w-fit">
          {
            "The team behind Anokha'24 is beyond thrilled to unveil our official app, a seamless platform to access all the information you need in just a few taps. The app will act as a one-stop shop for anything and everything Anokha. Stay up-to-date with all the latest information about the fest, including the schedule, venue, and event details. You can also register for various events and real-time updates. So don't miss out! Download the Anokha app now and get ready to unlock a world of tech and innovation!"
          }
        </h3>
        <Link href="https://play.google.com/store/apps/details?id=com.vaisakhkrishnank.anokha_home">
          <Image
            src="/images/getonplaystore.png"
            className="mt-5"
            width={200}
            height={100}
            alt="Download from Google Play Store button."
          />
        </Link>
        <p className="text-xs mt-2 text-gray-300">
          Available on the Google Play Store.
        </p>
      </div>
    </div>
  );
};

export default PhonePromo;
