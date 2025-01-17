import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';

interface PageHeadingProps {
  title: string;
  subtitle: string;
  onActionClick: () => void;
}

const PageHeading: React.FC<PageHeadingProps> = ({ title, subtitle, onActionClick }) => {
  return (
    <div className="py-10">
      <div className="mx-auto flex items-center justify-between gap-x-8 lg:mx-0">
        <div className="flex items-center gap-x-6">
          <h1>
            <div className="mt-1 text-lg font-semibold text-gray-900">{title}</div>
            <div className="text-sm/6 text-gray-500">{subtitle}</div>
          </h1>
        </div>
        <div className="flex items-center gap-x-4 sm:gap-x-6">
          <button 
            onClick={onActionClick} 
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add user
          </button>
          <Menu as="div" className="relative sm:hidden">
            <MenuButton className="-m-3 block p-3">
              <span className="sr-only">More</span>
              <EllipsisVerticalIcon aria-hidden="true" className="size-5 text-gray-500" />
            </MenuButton>
            <MenuItems
              transition
              className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 ring-1 shadow-lg ring-gray-900/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
              <MenuItem>
                <button
                  type="button"
                  className="block w-full px-3 py-1 text-left text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                >
                  Copy URL
                </button>
              </MenuItem>
              <MenuItem>
                <a
                  href="#"
                  className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                >
                  Edit
                </a>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default PageHeading; 