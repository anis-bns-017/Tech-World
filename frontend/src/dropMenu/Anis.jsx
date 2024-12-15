import React, { useState } from "react";
import menuData from "../dropMenu/anis.json"; // Adjust path accordingly

const Anis = () => {
  const [visibleSubmenus, setVisibleSubmenus] = useState({});

  const toggleSubmenu = (id) => {
    setVisibleSubmenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const showSubmenu = (id) => {
    setVisibleSubmenus((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  const hideSubmenu = (id) => {
    setVisibleSubmenus((prev) => ({
      ...prev,
      [id]: false,
    }));
  };

  const renderMenu = (items) => {
    return (
      <ul className="flex text-black">
        {items.map((item) => (
          <li
            key={item.id}
            className="relative group"
            onMouseEnter={() => showSubmenu(item.id)}
            onMouseLeave={() => hideSubmenu(item.id)}
          >
            <div
              className={`px-1 py-2 bg-slate-50 hover:text-red-500 cursor-pointer ${
                item.children ? "" : ""
              }`}
              onClick={() => toggleSubmenu(item.id)}
            >
              <span>{item.title}</span>
            </div>

            {item.children && visibleSubmenus[item.id] && (
              <ul className="absolute top-full left-0 bg-cyan-400 shadow-lg rounded w-[20rem] p-2">
                {item.children.map((subItem) => (
                  <li
                    key={subItem.id}
                    className="relative group"
                    onMouseEnter={() => showSubmenu(subItem.id)}
                    onMouseLeave={() => hideSubmenu(subItem.id)}
                  >
                    <div
                      className="flex justify-between items-center px-4 py-2 hover:bg-gray-100 rounded cursor-pointer"
                      onClick={() => toggleSubmenu(subItem.id)}
                    >
                      <span>{subItem.title}</span>
                      {subItem.children && <span>▶</span>}
                    </div>
                    {subItem.children && visibleSubmenus[subItem.id] && (
                      <ul className="absolute top-0 left-full bg-blue-900 text-white shadow-lg w-[200px] max-h-[20rem] overflow-scroll scrollbar-none  rounded mt-0 ml-2 p-2">
                        {/* {renderMenu(subItem.children)} */}
                        {/* <span>{subItem.children.title}</span> */}
                        {subItem.children.map((one) => (
                          <li
                            key={one.id}
                            className="relative group"
                            onMouseEnter={() => showSubmenu(one.id)}
                            onMouseLeave={() => hideSubmenu(one.id)}
                          >
                            <div
                              className="flex justify-between items-center hover:text-black px-4 py-2 hover:bg-gray-100 rounded cursor-pointer"
                              onClick={() => toggleSubmenu(one.id)}
                            >
                              <span>{one.title}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return <div className="flex justify-start">{renderMenu(menuData)}</div>;
};

export default Anis;
