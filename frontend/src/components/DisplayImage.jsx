import { IoMdClose } from "react-icons/io";
 const DisplayImage = ({ imgUIrl, onClose }) => {
  return (
    <div className="fixed bottom-0 top-0 left-0 right-0 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded max-w-5xl max-auto p-2">
        <div className="w-fit ml-auto text-2xl" onClick={onClose}>
          <IoMdClose />
        </div>
        <div className="flex justify-center p-4 max-w-[80vh] max-h-[80vh">
          <img src={imgUIrl} alt="" className="h-full w-full" />
        </div>
      </div>
    </div>
  );
};

export default DisplayImage;
