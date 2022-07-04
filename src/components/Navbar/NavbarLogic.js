import { useState } from 'react';
import { HiUser, HiSearch, HiPlus, HiHome } from 'react-icons/hi';
import { useLocation } from 'react-router-dom';

const NavbarLogic = () => {
  let { pathname } = useLocation();

  console.log(pathname);

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
      to: '/user',
      icon: <HiUser />,
      current: pathname.includes('/user'),
    },
  ];

  const [drawerOpened, setDrawerOpened] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpened(open);
  };

  return { navLinksObj, drawerOpened, toggleDrawer };
};

export default NavbarLogic;
