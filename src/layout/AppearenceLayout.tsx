import { Link, useLocation } from 'react-router-dom';

export const AppearenceLayout = ({ children }) => {
  const location = useLocation();
  const { pathname } = location;
  const links = [
    { path: '/dashboard/appearence', label: 'General' },
    { path: '/dashboard/appearence/slider', label: 'Slider' },
    { path: '/dashboard/appearence/payment', label: 'Payment API' },
    { path: '/dashboard/appearence/curiour', label: 'Curiour API' },
  ];
  return (
    <div className="flex gap-3">
      <div className="w-1/6">
        <div className="sectionbg flex flex-col p-2">
          {links.map((link, index) => (
            <Link
              key={index}
              className={`px-3 py-4 font-semibold  ${
                pathname === link.path
                  ? 'bg-secondary text-white'
                  : 'bg-bodydark1 text-black'
              }`}
              to={link.path}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="w-5/6">
        <div className="sectionbg py-4 px-6.5">{children}</div>
      </div>
    </div>
  );
};
