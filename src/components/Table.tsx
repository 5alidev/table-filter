import { useState } from "react";

// data
import { data } from "../data/Data";

// icons
import { BsThreeDots } from "react-icons/bs"; // icons
import { FaSort, FaFilter } from "react-icons/fa";
import { IoIosArrowDropdownCircle } from "react-icons/io";

const Table = () => {
  const [isSortOpen, setIsSortOpen] = useState<boolean>(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);

  const [projects, setProjects] = useState(data);
  const [searchQuery] = useState<string>("");
  const [filters, setFilters] = useState({
    name: "",
    country: "",
    email: "",
    project: "",
    status: "",
  });
  // sort state
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  } | null>(null);

  const [isStatusOpen, setIsStatusOpen] = useState<number | null>(null);

  // sort function
  const sortProjects = (key: string) => {
    const sortedProjects = [...projects];

    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      sortedProjects.sort((a, b) => (a[key] > b[key] ? -1 : 1));
      setSortConfig({ key, direction: "descending" });
    } else {
      sortedProjects.sort((a, b) => (a[key] > b[key] ? 1 : -1));
      setSortConfig({ key, direction: "ascending" });
    }

    setProjects(sortedProjects);
  };

  const handleSortOptionsClick = (key: string) => {
    sortProjects(key);
    setIsSortOpen(false);
  };

  // filter inputs
  const handleFiltersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  //   status
  const handleStatusChange = (index: number, newStatus: string) => {
    const updatedProjects = projects.map((project, i) =>
      i === index
        ? {
            ...project,
            status: newStatus,
            progress: newStatus === "Completed" ? "100%" : project.progress,
          }
        : project
    );
    setProjects(updatedProjects);
    setIsStatusOpen(null);
  };

  // filter projects
  const filteredProjects = projects.filter(
    (project) =>
      (searchQuery === "" ||
        Object.values(project).some((value) =>
          value.toLowerCase().includes(searchQuery.toLowerCase())
        )) &&
      (filters.name === "" ||
        project.client.toLowerCase().includes(filters.name.toLowerCase())) &&
      (filters.country === "" ||
        project.country
          .toLowerCase()
          .includes(filters.country.toLowerCase())) &&
      (filters.email === "" ||
        project.email.toLowerCase().includes(filters.email.toLowerCase())) &&
      (filters.project === "" ||
        project.project
          .toLowerCase()
          .includes(filters.project.toLowerCase())) &&
      (filters.status === "" ||
        project.status.toLowerCase().includes(filters.status.toLowerCase()))
  );

  //   pagination
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const projectsPerPage = 6;
  const startIndex = (currentPage! - 1) * projectsPerPage;
  const currentProjects = filteredProjects.slice(
    startIndex,
    startIndex + projectsPerPage
  );
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const handlePageNumber = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="mt-12 w-full flex flex-col gap-6">
      {/* filter buttons */}
      <div className="flex items-center gap-6 relative">
        <button
          className="py-2 px-5 bg-gray-200 rounded-sm text-gray-700 flex items-center gap-4 hover:bg-gray-500 hover:text-gray-100"
          onClick={() => setIsSortOpen(!isSortOpen)}
        >
          <span className="flex items-center gap-2">
            <FaSort />
            <span>Sort</span>
          </span>
          <IoIosArrowDropdownCircle />
        </button>
        <button
          className="py-2 px-5 bg-gray-200 rounded-sm text-gray-700 flex items-center gap-4 hover:bg-gray-500 hover:text-gray-100"
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
        >
          <span className="flex items-center gap-2">
            <FaFilter />
            <span>Filters</span>
          </span>
          <IoIosArrowDropdownCircle />
        </button>

        {isSortOpen && (
          <div className="absolute top-12 flex flex-col items-start bg-gray-200 rounded-sm gap-2 w-32">
            <button
              className="hover:bg-gray-500 hover:text-gray-100 w-full py-2 px-5"
              onClick={() => handleSortOptionsClick("client")}
            >
              Name
            </button>
            <button
              className="hover:bg-gray-500 hover:text-gray-100 w-full py-2 px-5"
              onClick={() => handleSortOptionsClick("country")}
            >
              Country
            </button>
            <button
              className="hover:bg-gray-500 hover:text-gray-100 w-full py-2 px-5"
              onClick={() => handleSortOptionsClick("date")}
            >
              Date
            </button>
          </div>
        )}

        {isFiltersOpen && (
          <div className="absolute top-12 left-[9.4rem] flex flex-col items-start bg-gray-200 rounded-sm gap-2 w-36 p-2">
            <div>
              <label htmlFor="" className="text-sm text-gray-500">
                By Name:
              </label>
              <input
                type="text"
                className="w-full py-2 px-3 outline-none bg-transparent border-b border-b-gray-800"
                placeholder="name"
                name="name"
                value={filters.name}
                onChange={handleFiltersChange}
              />
            </div>

            <div>
              <label htmlFor="" className="text-sm text-gray-500">
                By Country:
              </label>
              <input
                type="text"
                className="w-full py-2 px-3 outline-none bg-transparent border-b border-b-gray-800"
                placeholder="country"
                name="country"
                value={filters.country}
                onChange={handleFiltersChange}
              />
            </div>

            <div>
              <label htmlFor="" className="text-sm text-gray-500">
                By Email:
              </label>
              <input
                type="email"
                className="w-full py-2 px-3 outline-none bg-transparent border-b border-b-gray-800"
                placeholder="email"
                name="email"
                value={filters.email}
                onChange={handleFiltersChange}
              />
            </div>

            <div>
              <label htmlFor="" className="text-sm text-gray-500">
                By Project:
              </label>
              <input
                type="text"
                className="w-full py-2 px-3 outline-none bg-transparent border-b border-b-gray-800"
                placeholder="project"
                name="project"
                value={filters.project}
                onChange={handleFiltersChange}
              />
            </div>

            <div>
              <label htmlFor="" className="text-sm text-gray-500">
                By Status:
              </label>
              <input
                type="text"
                className="w-full py-2 px-3 outline-none bg-transparent border-b border-b-gray-800"
                placeholder="status"
                name="status"
                value={filters.status}
                onChange={handleFiltersChange}
              />
            </div>
          </div>
        )}
      </div>

      <table className="w-full table-auto border border-gray-200 text-gray-800">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Image</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Country</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Project</th>
            <th className="px-4 py-2 text-left">Progress</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProjects.map((person, index) => (
            <tr key={index} className="border border-gray-200">
              <td className="px-4 py-2">
                <img
                  src={person.image}
                  alt={person.client}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </td>
              <td className="px-4 py-2">{person.client}</td>
              <td className="px-4 py-2">{person.country}</td>
              <td className="px-4 py-2">{person.email}</td>
              <td className="px-4 py-2">{person.project}</td>
              <td className="px-4 py-2">
                <div className="w-24 bg-gray-700 rounded">
                  <div
                    className={`w-[${person.progress}] h-2 rounded bg-green-400`}
                  ></div>
                </div>
              </td>
              <td className={`px-4 py-2`}>
                <span
                  className={`py-1 px-2 rounded-sm ${
                    person.status === "Completed"
                      ? "bg-green-300"
                      : "bg-yellow-300"
                  }`}
                >
                  {person.status}
                </span>
              </td>
              <td className="px-4 py-2">{person.date}</td>
              <td className="px-4 py-2">
                <div className="relative">
                  <BsThreeDots
                    className="cursor-pointer"
                    onClick={() => setIsStatusOpen(index)}
                  />
                  {isStatusOpen === index && (
                    <div className="absolute top-full right-0 mt-2 bg-gray-100 border border-gray-200 rounded shadow-md z-10 w-32">
                      <button
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left"
                        onClick={() => handleStatusChange(index, "In Progress")}
                      >
                        In Progress
                      </button>
                      <button
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-300 w-full text-left"
                        onClick={() => handleStatusChange(index, "Completed")}
                      >
                        Completed
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* pagination */}
      <div className="w-full flex items-center justify-center gap-4 mt-6">
        <button
          className="bg-transparent outline-none py-2 px-5 border border-gray-400 rounded-md transition-colors ease-linear duration-300 hover:bg-gray-300 hover:border-gray-600 disabled:cursor-not-allowed"
          disabled={currentPage === 1}
          onClick={() => handlePageNumber(currentPage! - 1)}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="bg-transparent outline-none py-2 px-5 border border-gray-400 rounded-md transition-colors ease-linear duration-300 hover:bg-gray-300 hover:border-gray-600 disabled:cursor-not-allowed"
          disabled={currentPage === totalPages}
          onClick={() => handlePageNumber(currentPage! + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
