import { useState } from "react";
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

function withHostname(url: string): string {
  if (typeof window !== "undefined") {
    return url.replace("$hostname", window.location.hostname);
  }
  return url;
}

interface AppGridProps {
  apps: AppGridApp[];
}

const AppGridPopover = ({ apps }: AppGridProps): JSX.Element => {
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
              key={index}
              href={withHostname(app.url)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpened(false)}
            >
              <AppGridContainer>
                <AppGridItemImage src={app.img} alt={app.label} />
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
  const apps = useSelector(state => getSetting(state, "app-grid-apps"));

  if (!apps || apps.length === 0) {
    return null;
  }

  return <AppGridPopover apps={apps} />;
};

// eslint-disable-next-line import/no-default-export -- deprecated usage
export default AppGrid;
