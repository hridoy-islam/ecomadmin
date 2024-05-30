import { Link, useLocation } from 'react-router-dom';
import { CiMoneyCheck1 } from 'react-icons/ci';
import { LiaShippingFastSolid } from 'react-icons/lia';
import { BiCarousel } from 'react-icons/bi';
import { RiAiGenerate } from 'react-icons/ri';
export const AppearenceLayout = ({ children }) => {
  const location = useLocation();
  const { pathname } = location;
  const links = [
    { path: '/dashboard/appearence', label: 'General', icon: <RiAiGenerate /> },
    {
      path: '/dashboard/appearence/slider',
      label: 'Slider',
      icon: <BiCarousel />,
    },
    {
      path: '/dashboard/appearence/payment',
      label: 'Payment API',
      icon: <CiMoneyCheck1 />,
    },
    {
      path: '/dashboard/appearence/curiour',
      label: 'Curiour API',
      icon: <LiaShippingFastSolid />,
    },
  ];
  return (
    <div className="flex gap-3">
      <div className="w-1/6">
        <div className="sectionbg flex flex-col p-2">
          {links.map((link, index) => (
            <Link
              key={index}
              className={`px-3 py-4 font-semibold flex align-middle gap-3  ${
                pathname === link.path
                  ? 'bg-secondary text-white'
                  : ' text-black'
              }`}
              to={link.path}
            >
              <span className="text-2xl">{link.icon}</span>{' '}
              <span>{link.label}</span>
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
