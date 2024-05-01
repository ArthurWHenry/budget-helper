import { memo } from "react";
import { RecoilRoot } from "recoil";

const Layout = ({ children }: { children: JSX.Element }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default memo(Layout);
