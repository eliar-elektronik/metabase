import type { ReactNode } from "react";

import LogoIcon from "metabase/components/LogoIcon";
import { useSelector } from "metabase/lib/redux";
import AppGrid from "metabase/nav/components/AppGrid";

import { getHasIllustration } from "../../selectors";

import {
  AuthTopBar,
  LayoutBody,
  LayoutCard,
  LayoutIllustration,
  LayoutRoot,
} from "./AuthLayout.styled";

interface AuthLayoutProps {
  children?: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps): JSX.Element => {
  const hasIllustration = useSelector(getHasIllustration);

  return (
    <LayoutRoot>
      {hasIllustration && <LayoutIllustration />}
      <AuthTopBar>
        <AppGrid />
      </AuthTopBar>
      <LayoutBody>
        <LogoIcon height={65} />
        <LayoutCard>{children}</LayoutCard>
      </LayoutBody>
    </LayoutRoot>
  );
};
