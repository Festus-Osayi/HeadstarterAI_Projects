import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import React from "react";
import Image from "next/image";

function SidePanel() {
  return (
    <aside className="flex flex-col ml-5 w-[30%] max-md:ml-0 max-md:w-full">
      <div className="flex relative flex-col grow text-xl leading-none min-h-[1024px] text-slate-900 max-md:mt-2.5 max-md:max-w-full">
        <Image
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/722dcc4e32fbf4f8fe00a05a8604a02f17a4f65118918b6fc6b11257f10902d6?placeholderIfAbsent=true&apiKey=fd1d99d423ec46cd8ed04855fd0c52b5"
          alt=""
          fill
          style={{ objectFit: "cover" }}
        />
        <div className="flex relative flex-col pt-14 pr-7 pb-8 pl-14 w-full min-h-[1024px] max-md:px-5 max-md:max-w-full">
        
          {/* <nav className="flex relative gap-10 self-start">
            <a href="#about">about</a>
            <a href="#study-tools">study tools</a>
            <a href="#contact">contact</a>
            <a href="#sign-in">sign in</a>
          </nav> */}
          <Image
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/fd6009bcd54be0d5d01957c9188ba336983eb124c63cab1be22dcd70ff5eaa0a?placeholderIfAbsent=true&apiKey=fd1d99d423ec46cd8ed04855fd0c52b5"
            alt=""
            width={120}
            height={120}
            className="object-contain self-center mt-36 ml-11 max-w-full aspect-square w-[120px] max-md:mt-10"
          />
          <Image
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/0b994ce155d7000afba2e39532e9aa6ecc80414135479460446721052a0c1353?placeholderIfAbsent=true&apiKey=fd1d99d423ec46cd8ed04855fd0c52b5"
            alt=""
            width={120}
            height={120}
            className="object-contain mt-96 ml-6 max-w-full aspect-square w-[120px] max-md:mt-10 max-md:ml-2.5"
          />

          <div className="flex justify-center items-center mt-10 gap-5">
            <a
              href="https://www.instagram.com/studygenieai?igsh=MzI4MXg0bnNsd3ho"
              target="__blank"
            >
              <FaInstagram className='text-2xl'/>
            </a>
            <a
              href="https://www.linkedin.com/company/studygenie-ai/posts/?feedView=all"
              target="__blank"
            >
              <FaLinkedinIn className="text-2xl"/>
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default SidePanel;
