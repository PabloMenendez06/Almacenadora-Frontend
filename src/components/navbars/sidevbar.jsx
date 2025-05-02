import './sidebar.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo_size.jpg";
import profile from "../../assets/img/profile.png";
import { useUserDetails } from "../../shared/hooks";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import {
  IconArrowLeft,
  IconCalendarUser,
  IconUserBolt,
  IconAlignBoxCenterMiddle,
  IconApple
} from "@tabler/icons-react";
import { TiClipboard } from "react-icons/ti";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export function SidebarDemo() {
  const { isLogged, logout } = useUserDetails();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true); 

  const handleNavigate = (path) => {
    navigate(path);
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
    setOpen(false);
  };

  const links = [
    { label: "Category", onClick: () => handleNavigate("/category"), icon: <IconAlignBoxCenterMiddle className="icon" /> },
    { label: "Provider", onClick: () => handleNavigate("/provider"), icon: <IconUserBolt className="icon" /> },
    { label: "History", onClick: () => handleNavigate("/history"), icon: <TiClipboard className="icon" /> },
    { label: "Products", onClick: () => handleNavigate("/product"), icon: <IconApple className="icon" /> },
    { label: "Clients", onClick: () => handleNavigate("/client"), icon: <IconCalendarUser className="icon" /> },
    {
      label: isLogged ? "Logout" : "Login",
      onClick: isLogged ? handleLogout : () => handleNavigate("/auth"),
      icon: <IconArrowLeft className="icon" />
    }
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar */}
      <div className={cn("transition-all duration-300", open ? "w-64" : "w-20")}>
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="sidebar-body justify-between gap-10">
            <div className="flex flex-col flex-1 overflow-hidden">
              <div className="sidebar-logo">{open ? <Logo /> : <LogoIcon />}</div>
              <div className="sidebar-links mt-8 flex flex-col gap-2">
                {links.map((link, idx) => (
                  <SidebarLink
                    key={idx}
                    link={{ ...link, href: "#" }}
                    onClick={link.onClick}
                    className="sidebar-link"
                  />
                ))}
              </div>
            </div>
            <div className="sidebar-footer">
              <SidebarLink
                link={{
                  label: "User",
                  href: "/settings",
                  icon: (
                    <img
                      src={profile}
                      className="sidebar-avatar"
                      alt="Avatar"
                    />
                  ),
                }}
                className="sidebar-link"
              />
            </div>
          </SidebarBody>
        </Sidebar>
      </div>

      {/* Dashboard */}
      <div className="flex flex-1 transition-all duration-300 overflow-hidden">
        <Dashboard />
      </div>
    </div>
  );
}

const Logo = () => (
  <a href="/" className="flex items-center space-x-2 py-1 text-sm font-normal text-black">
    <div className="h-5 w-6 rounded bg-black dark:bg-white" />
    <img src={logo} className="sidebar-avatar" alt="logo" />
  </a>
);

const LogoIcon = () => (
  <a href="/" className="flex items-center py-1 text-sm font-normal text-black">
    <div className="h-5 w-6 rounded bg-black dark:bg-white" />
  </a>
);

const Dashboard = () => (
  <div className="flex flex-1 flex-col gap-2 p-2 md:p-10 rounded-tl-2xl border bg-white dark:bg-neutral-900 dark:border-neutral-700">
    <div className="flex gap-2">
      {[...Array(4)].map((_, idx) => (
        <div key={idx} className="h-20 w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800"></div>
      ))}
    </div>
    <div className="flex flex-1 gap-2">
      {[...Array(2)].map((_, idx) => (
        <div key={idx} className="h-full w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800"></div>
      ))}
    </div>
  </div>
);
