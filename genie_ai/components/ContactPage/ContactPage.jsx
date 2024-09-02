import React from "react";
import Image from "next/image";
import Header from "./Header";
import ContactForm from "./ContactForm";
import Footer from "./Footer";
import SidePanel from "./SidePanel";

function ContactPage() {
  return (
    <>
      <main className="overflow-hidden">
        <div className="flex gap-5 max-md:flex-col">
          <section className="flex flex-col w-[70%] max-md:ml-0 max-md:w-full">
            <div className="grow max-md:mt-2.5 max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col">
                <div className="flex flex-col w-[39%] max-md:ml-0 max-md:w-full">
                  <div className="flex relative flex-col grow items-start pt-14 pb-8 pl-12 font-bold aspect-[0.383]">
                    <Image
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/bd3a5198e4c1b0a658019a04197811417f6d1297f3172d97afe6668d3964b96f?placeholderIfAbsent=true&apiKey=fd1d99d423ec46cd8ed04855fd0c52b5"
                      alt=""
                      fill
                      style={{ objectFit: "cover" }}
                      
                    />
                    <Header />
                    <Image
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/8037f88c4b063333846b424618d680ae73098257a723ca50110ebce392f751ff?placeholderIfAbsent=true&apiKey=fd1d99d423ec46cd8ed04855fd0c52b5"
                      alt=""
                      width={200}
                      height={200}
                      className="object-contain self-end mt-40 mr-12 max-w-full aspect-square max-md:mt-10 max-md:mr-2.5"
                    />
                    <Image
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/fd6009bcd54be0d5d01957c9188ba336983eb124c63cab1be22dcd70ff5eaa0a?placeholderIfAbsent=true&apiKey=fd1d99d423ec46cd8ed04855fd0c52b5"
                      alt=""
                      width={120}
                      height={120}
                      className="object-contain self-center mt-36 ml-11 max-w-full aspect-square w-[120px] max-md:mt-10"
                    />
                  </div>
                </div>
                <div className="flex flex-col ml-5 w-[61%] max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col self-stretch my-auto w-full text-xl text-black max-md:mt-10 max-md:max-w-full">
                    <p className="self-center mt-40 font-medium max-md:mt-10">
                      Please fill out the information below to join our
                      waitlist, and be the first know about our project launch
                      or email us at studygenieAI@gmail.com . Thank You !
                    </p>
                    <ContactForm />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <SidePanel />
        </div>
      </main>
    </>
  );
}

export default ContactPage;
