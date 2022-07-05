import { HiUser, HiSearch, HiPlus, HiHome } from 'react-icons/hi';
import { useLocation } from 'react-router-dom';

const NavbarLogic = () => {
  let { pathname } = useLocation();

  const navLinksObj = [
    {
      text: 'Acceuil',
      to: '/',
      icon: <HiHome />,
      current: pathname[pathname.length - 1] === '/',
    },
    {
      text: 'Recherche',
      to: '/search',
      icon: <HiSearch />,
      current: pathname.includes('/search'),
    },
    {
      text: 'Nouveau',
      to: '/new-bid',
      icon: <HiPlus />,
      current: pathname.includes('/new-bid'),
    },
    {
      text: 'Annonces',
      to: '/user/u',
      icon: <HiUser />,
      current: pathname.includes('/user'),
    },
  ];

  return { navLinksObj };
};

export default NavbarLogic;
