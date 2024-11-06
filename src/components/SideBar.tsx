// icons
import { FaFolder, FaUser } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";

const SideBar = () => {
  return (
    <aside className="fixed top-0 left-0 w-24 h-screen bg-gray-200 text-gray-700 p-4 flex flex-col gap-10">
      <h1 className="text-gray-800 font-bold text-lg">
        <a href="#">Dash</a>
      </h1>
      {/* icons */}
      <div className="flex flex-col gap-4">
        <FaFolder className="hover:text-gray-800 cursor-pointer" />
        <FaUser className="hover:text-gray-800 cursor-pointer" />
        <FaGear className="hover:text-gray-800 cursor-pointer" />
      </div>
    </aside>
  );
};

export default SideBar;
