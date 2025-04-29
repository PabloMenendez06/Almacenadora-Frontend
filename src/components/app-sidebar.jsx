"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { IconMenu2, IconX, IconHome, IconSearch, IconSettings, IconLogout, IconLogin } from "@tabler/icons-react"
import { motion, AnimatePresence } from "motion/react"

// Mock user hook - replace with your actual authentication logic
const useUserDetails = () => {
  const [isLogged, setIsLogged] = useState(false)
  const logout = () => setIsLogged(false)
  const login = () => setIsLogged(true)
  return { isLogged, logout, login }
}

export default function AppSidebar() {
  const { isLogged, logout } = useUserDetails()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const handleNavigate = (path) => {
    router.push(path)
    setOpen(false)
  }

  const handleLogout = () => {
    logout()
    setOpen(false)
  }

  // Navigation links based on authentication status
  const getNavLinks = () => {
    const commonLinks = [
      {
        label: "Home",
        href: "/",
        icon: <IconHome className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
      },
      {
        label: "Browse",
        href: "/channels",
        icon: <IconSearch className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
      },
    ]

    const authLinks = isLogged
      ? [
          {
            label: "My Account",
            href: "/settings",
            icon: <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
          },
          {
            label: "Logout",
            href: "#",
            onClick: handleLogout,
            icon: <IconLogout className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
          },
        ]
      : [
          {
            label: "Login",
            href: "/auth",
            icon: <IconLogin className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
          },
        ]

    return [...commonLinks, ...authLinks]
  }

  const navLinks = getNavLinks()

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.div
        className="hidden h-screen sticky top-0 shrink-0 bg-white px-4 py-4 shadow-md dark:bg-neutral-800 md:flex md:flex-col"
        animate={{
          width: open ? "300px" : "60px",
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
            <motion.span
              animate={{
                display: open ? "inline-block" : "none",
                opacity: open ? 1 : 0,
              }}
              className="text-lg font-bold text-neutral-800 dark:text-neutral-200"
            >
              Almacén
            </motion.span>
          </div>

          {/* Navigation Links */}
          <div className="mt-8 flex flex-col gap-2">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="flex items-center gap-2 py-2 group/sidebar"
                onClick={(e) => {
                  e.preventDefault()
                  if (link.onClick) {
                    link.onClick()
                  } else {
                    handleNavigate(link.href)
                  }
                }}
              >
                {link.icon}
                <motion.span
                  animate={{
                    display: open ? "inline-block" : "none",
                    opacity: open ? 1 : 0,
                  }}
                  className="text-sm text-neutral-700 dark:text-neutral-200 group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre"
                >
                  {link.label}
                </motion.span>
              </a>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Mobile Header */}
      <div className="flex h-16 items-center justify-between bg-white px-4 shadow-md dark:bg-neutral-800 md:hidden">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
          <span className="text-lg font-bold text-neutral-800 dark:text-neutral-200">Almacén</span>
        </div>
        <div onClick={() => setOpen(!open)}>
          {open ? (
            <IconX className="text-neutral-800 dark:text-neutral-200" />
          ) : (
            <IconMenu2 className="text-neutral-800 dark:text-neutral-200" />
          )}
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className="fixed inset-0 z-[100] flex flex-col justify-between bg-white p-10 dark:bg-neutral-900 md:hidden"
          >
            <div>
              <div
                className="absolute right-10 top-10 z-50 text-neutral-800 dark:text-neutral-200"
                onClick={() => setOpen(!open)}
              >
                <IconX />
              </div>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-10 w-10 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
                <span className="text-lg font-bold text-neutral-800 dark:text-neutral-200">Almacén</span>
              </div>
              <div className="flex flex-col gap-4">
                {navLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    className="flex items-center gap-4 py-2 text-lg font-medium text-neutral-800 dark:text-neutral-200"
                    onClick={(e) => {
                      e.preventDefault()
                      if (link.onClick) {
                        link.onClick()
                      } else {
                        handleNavigate(link.href)
                      }
                    }}
                  >
                    {link.icon}
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
