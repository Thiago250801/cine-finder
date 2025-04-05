import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import cineFinderLogo from "../../assets/cineFinderLogo.png";
import { Link, useLocation } from "react-router";

const navigation = [
  { name: "Filmes", href: "/movies" },
  { name: "Séries", href: "/series" },
];

function classNames(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const location = useLocation(); 

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto px-2 sm:px-6 lg:px-8 shadow-md">
        <div className="relative flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex flex-1 items-center justify-start">
            <div className="flex shrink-0 items-center">
              <Link to="/">
                <img
                  alt="CineFinder Logo"
                  src={cineFinderLogo}
                  className="h-16 w-auto"
                />
              </Link>
            </div>
          </div>

          {/* Navigation Items - Desktop */}
          <div className="hidden sm:block">
            <div className="flex space-x-4">
              {navigation.map((item) => {
                const isCurrent = location.pathname === item.href;
                return (
                  <Link to={item.href} key={item.name}>
                    <p
                      aria-current={isCurrent ? "page" : undefined}
                      className={classNames(
                        isCurrent
                          ? "bg-primary text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                    >
                      {item.name}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Mobile menu toggle */}
          <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3 backdrop-blur-lg bg-white/5 border border-gray-200/20 shadow-lg rounded-lg m-3">
          {navigation.map((item) => {
            const isCurrent = location.pathname === item.href;
            return (
              <Link to={item.href} key={item.name}>
                <DisclosureButton
                  as="div"
                  aria-current={isCurrent ? "page" : undefined}
                  className={classNames(
                    isCurrent
                      ? "bg-primary text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                >
                  {item.name}
                </DisclosureButton>
              </Link>
            );
          })}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
