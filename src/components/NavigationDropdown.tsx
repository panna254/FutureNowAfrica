import { ChevronDown } from 'lucide-react';
import { Link } from '@/router';
import type { NavigationGroup } from '@/router-state';

type NavigationDropdownProps = {
  group: NavigationGroup;
  currentPath: string;
  open: boolean;
  active: boolean;
  onToggle: () => void;
  onNavigate: () => void;
};

export function NavigationDropdown({
  group,
  currentPath,
  open,
  active,
  onToggle,
  onNavigate,
}: NavigationDropdownProps) {
  const menuId = 'desktop-nav-' + group.id;
  const triggerClasses = [
    'type-nav inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 transition-colors duration-200',
    active
      ? 'bg-forest-800 text-cream shadow-sm'
      : open
        ? 'bg-forest-100 text-forest-950'
        : 'text-forest-800 hover:bg-forest-100/90 hover:text-forest-950',
  ].join(' ');

  return (
    <div className="relative">
      <button
        id={group.id + '-nav-trigger'}
        type="button"
        className={triggerClasses}
        aria-expanded={open}
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={onToggle}
      >
        {group.label}
        <ChevronDown
          className={'h-4 w-4 transition-transform duration-200 ' + (open ? 'rotate-180' : '')}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          id={menuId}
          className="navbar-dropdown absolute left-0 top-[calc(100%+0.7rem)] z-60 min-w-58 rounded-2xl p-2"
          aria-labelledby={group.id + '-nav-trigger'}
        >
          <ul className="space-y-1">
            {group.items.map((item) => {
              const itemActive = currentPath === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={onNavigate}
                    ariaCurrent={itemActive ? 'page' : undefined}
                    className={[
                      'block rounded-xl px-3.5 py-2.5 text-ui transition-colors duration-200',
                      itemActive
                        ? 'bg-forest-800 text-cream'
                        : 'text-forest-800 hover:bg-forest-100 hover:text-forest-950',
                    ].join(' ')}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
