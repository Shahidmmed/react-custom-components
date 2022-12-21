import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [navToggled, setNavToggled] = useState(false);

  const navItems = {
    header: {
      name: "Side Bar Component",
      logo: "https://flowbite.com/docs/images/logo.svg",
    },
    menus: [
      {
        title: "Dashboard",
        href: "/",
        icon: "",
      },
      {
        title: "Categories",
        href: "/categories",
        icon: "",
      },
      {
        title: "E-commerce",
        href: "",
        icon: "",
        submenu: [
          { title: "Products", href: "/courses" },
          { title: "Billing", href: "/topics" },
          { title: "Invoice", href: "/lessons" },
        ],
      },
      {
        title: "Profile",
        href: "/banners",
        icon: "",
      },
      {
        title: "Analytics",
        href: "/analytics",
        icon: "",
      },
    ],
    footer: {
      name: "Sign Out",
    },
  };

  const showNav = () => {};

  return (
    <aside className="" aria-label="Sidebar">
      <div className="overflow-y-auto w-full py-4 relative px-3 bg-gray-50 rounded dark:bg-gray-800  h-screen">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
          <img
            src={navItems.header.logo}
            alt="Logo"
            className="mr-3 h-6 sm:h-9"
          />
          <h3 className="self-center text-xl font-semibold">
            {navItems.header.name}
          </h3>
        </div>
        <ul className="space-y-2 pt-4">
          {navItems.menus.map((menu, idx) => (
            <li
              key={idx}
              className={
                menu.submenu && menu.submenu.length > 0 ? "parent" : ""
              }
            >
              <NavLink
                to={menu.href}
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {menu.icon}
                <span className="flex-1 ml-3 text-left whitespace-nowrap">
                  {menu.title}
                </span>
                {menu.submenu && menu.submenu.length > 0 ? (
                  <svg
                    sidebar-toggle-item=""
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                ) : null}
              </NavLink>
              {menu.submenu && menu.submenu.length > 0 ? (
                <ul className="hidden py-2 space-y-2">
                  {menu.submenu.map((submenu, id) => (
                    <li key={id}>
                      <NavLink
                        to={submenu.href}
                        className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        {submenu.title}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
        <div className="pt-4 mt-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
          <div
            id="dropdown-cta"
            className="p-4 mt-6 bg-blue-50 rounded-lg dark:bg-blue-900"
            role="alert"
          >
            <div className="mb-3 text-sm text-blue-900 dark:text-blue-400">
              <div className="flex items-center mb-3">
                <span className="bg-orange-100 text-orange-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900">
                  {navItems.footer.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
