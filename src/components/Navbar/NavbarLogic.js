import { HiUser, HiSearch, HiPlus, HiHome } from 'react-icons/hi';
import { useNavigate, useLocation } from 'react-router-dom';

const NavbarLogic = () => {
  let { pathname } = useLocation();
  const navigate = useNavigate();

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

  const onClickLink = (to) => () => {
    const userChange = pathname.includes('user') && to.includes('user');
    const reload = pathname === to;
    navigate(to, { replace: reload && !userChange });
    (reload || userChange) && window.location.reload();
  };

  return { navLinksObj, onClickLink };
};

export default NavbarLogic;
