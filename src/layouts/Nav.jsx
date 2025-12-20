import { useNavigate } from 'react-router-dom';
import NavItem from '../components/NavItem';
import { LayoutGrid, Cog } from 'lucide-react';
import { useOptions } from '/src/utils/optionsContext';
import nav from '../styles/nav.module.css';
import theme from '../styles/theming.module.css';
import clsx from 'clsx';
import { memo, useMemo, useCallback } from 'react';

const itemSize = 16;

const navItems = [
  { name: 'Apps', id: 'btn-a', type: LayoutGrid, route: '/materials' },
  { name: 'Settings', id: 'btn-s', type: Cog, route: '/settings' },
];

const Nav = memo(() => {
  const navigate = useNavigate();
  const { options } = useOptions();

  const scale = Number(options.navScale || 1);
  const dimensions = useMemo(
    () => ({
      navHeight: Math.round(69 * scale),
      logoWidth: Math.round(122 * scale),
      logoHeight: Math.round(41 * scale),
      versionFont: Math.round(9 * scale),
      versionMargin: Math.round(-10 * scale),
    }),
    [scale],
  );

  const handleLogoClick = useCallback(() => navigate('/'), [navigate]);

  const handleHomeClick = useCallback(() => {
    try {
      if (typeof document !== 'undefined' && document.referrer) {
        // send user back to the original referring page
        window.location.href = document.referrer;
        return;
      }
    } catch (e) {
      // ignore and fallback to app route
    }

    navigate('/');
  }, [navigate]);

  const items = useMemo(
    () =>
      navItems.map((item) => ({
        ...item,
        size: itemSize,
        onClick: () => navigate(item.route),
      })),
    [navigate],
  );

  const homeItem = useMemo(
    () => ({ name: 'Home', id: 'btn-home', type: null, route: '/', size: itemSize, onClick: handleHomeClick }),
    [handleHomeClick],
  );

  return (
    <div
      className={clsx(
        nav.nav,
        theme['nav-backgroundColor'],
        theme[`theme-${options.theme || 'default'}`],
        ' w-full shadow-x1/20 flex items-center pl-6 pr-5 gap-5 z-50',
      )}
      style={{ height: `${dimensions.navHeight}px` }}
    >
      {/* leftmost Home button (navigates to referring page or /) */}
      <div className="flex items-center gap-5" style={{ height: 'calc(100% - 0.5rem)' }}>
        <NavItem items={[homeItem]} />
      </div>

      <div className="flex items-center gap-5 ml-auto" style={{ height: 'calc(100% - 0.5rem)' }}>
        <NavItem items={items} />
      </div>
    </div>
  );
});

Nav.displayName = 'Nav';
export default Nav;
