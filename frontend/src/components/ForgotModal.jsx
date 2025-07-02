import React from "react";

const ForgotModal = ({isOpen, children}) => {
  return (
    <>
    {isOpen && (
    <div>
     
         <div className="w-[60vw] h-[90vh] px-6 inset-0 z-10 flex items-center justify-center">
         <div className="w-full h-full bg-white flex flex-col items-center  rounded-2xl px-8 py-24 border border-black">
           {children}
         </div>
       </div>
     
    </div>
        )}
        </>
  );
};

export default ForgotModal;
