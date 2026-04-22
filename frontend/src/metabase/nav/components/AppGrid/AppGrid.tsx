import { useEffect, useState } from "react";
import { t } from "ttag";

import { useSelector } from "metabase/lib/redux";
import { getSetting } from "metabase/selectors/settings";
import { Icon, Popover, Tooltip } from "metabase/ui";
import type { AppGridApp } from "metabase-types/api";

import {
  AppGridButton,
  AppGridContainer,
  AppGridDropdown,
  AppGridItemButton,
  AppGridItemImage,
  AppGridItemLabel,
} from "./AppGrid.styled";

interface AppGridPopoverProps {
  apps: AppGridApp[];
}

const AppGridPopover = ({ apps }: AppGridPopoverProps): JSX.Element => {
  const [opened, setOpened] = useState(false);

  return (
    <Popover
      opened={opened}
      onChange={setOpened}
      position="bottom-end"
      transitionProps={{ duration: 0 }}
    >
      <Popover.Target>
        <Tooltip label={t`Apps`} disabled={opened}>
          <AppGridButton
            aria-label={t`Apps`}
            onClick={() => setOpened(o => !o)}
          >
            <Icon name="grid" size={16} />
          </AppGridButton>
        </Tooltip>
      </Popover.Target>
      <Popover.Dropdown p="sm">
        <AppGridDropdown>
          {apps.map((app, index) => (
            <AppGridItemButton
              key={`${app.url}-${index}`}
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpened(false)}
            >
              <AppGridContainer>
                <AppGridItemImage
                  src={app.img}
                  alt={app.label}
                  onError={e =>
                    ((e.target as HTMLImageElement).style.visibility = "hidden")
                  }
                />
                <AppGridItemLabel>{app.label}</AppGridItemLabel>
              </AppGridContainer>
            </AppGridItemButton>
          ))}
        </AppGridDropdown>
      </Popover.Dropdown>
    </Popover>
  );
};

const AppGrid = (): JSX.Element | null => {
  const registryUrl = useSelector(state =>
    getSetting(state, "app-registry-url"),
  );
  const appId = useSelector(state => getSetting(state, "app-id"));
  const locale = useSelector(
    state =>
      getSetting(state, "user-locale") || getSetting(state, "site-locale"),
  );

  const [apps, setApps] = useState<AppGridApp[]>([]);

  useEffect(() => {
    if (!registryUrl) {
      setApps([]);
      return;
    }

    const params = new URLSearchParams();
    if (appId) {
      params.set("exclude", appId);
    }
    if (locale) {
      params.set("locale", locale);
    }

    const url = `${registryUrl}?${params.toString()}`;

    let cancelled = false;
    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Registry responded with status ${res.status}`);
        }
        return res.json();
      })
      .then((data: AppGridApp[]) => {
        if (!cancelled) {
          setApps(Array.isArray(data) ? data : []);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setApps([]);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [registryUrl, appId, locale]);

  if (apps.length === 0) {
    return null;
  }

  return <AppGridPopover apps={apps} />;
};

// eslint-disable-next-line import/no-default-export -- deprecated usage
export default AppGrid;
