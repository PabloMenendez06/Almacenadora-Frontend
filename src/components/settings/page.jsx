import LayoutWithSidebar from "@/components/layout-with-sidebar"

export default function SettingsPage() {
  return (
    <LayoutWithSidebar>
      <div className="flex flex-1 flex-col p-4 md:p-8">
        <h1 className="text-3xl font-bold">My Account</h1>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          <div className="col-span-2 space-y-6">
            <div className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-800">
              <h2 className="text-xl font-semibold">Profile Information</h2>
              <div className="mt-4 space-y-4">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="w-full rounded-md border border-neutral-300 p-2 dark:border-neutral-600 dark:bg-neutral-700"
                    defaultValue="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full rounded-md border border-neutral-300 p-2 dark:border-neutral-600 dark:bg-neutral-700"
                    defaultValue="john@example.com"
                  />
                </div>
                <button className="rounded-md bg-black px-4 py-2 text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200">
                  Save Changes
                </button>
              </div>
            </div>
            <div className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-800">
              <h2 className="text-xl font-semibold">Change Password</h2>
              <div className="mt-4 space-y-4">
                <div>
                  <label htmlFor="current-password" className="mb-2 block text-sm font-medium">
                    Current Password
                  </label>
                  <input
                    id="current-password"
                    type="password"
                    className="w-full rounded-md border border-neutral-300 p-2 dark:border-neutral-600 dark:bg-neutral-700"
                  />
                </div>
                <div>
                  <label htmlFor="new-password" className="mb-2 block text-sm font-medium">
                    New Password
                  </label>
                  <input
                    id="new-password"
                    type="password"
                    className="w-full rounded-md border border-neutral-300 p-2 dark:border-neutral-600 dark:bg-neutral-700"
                  />
                </div>
                <div>
                  <label htmlFor="confirm-password" className="mb-2 block text-sm font-medium">
                    Confirm New Password
                  </label>
                  <input
                    id="confirm-password"
                    type="password"
                    className="w-full rounded-md border border-neutral-300 p-2 dark:border-neutral-600 dark:bg-neutral-700"
                  />
                </div>
                <button className="rounded-md bg-black px-4 py-2 text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200">
                  Update Password
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-800">
              <h2 className="text-xl font-semibold">Account Settings</h2>
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span>Email Notifications</span>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input type="checkbox" className="peer sr-only" defaultChecked />
                    <div className="peer h-6 w-11 rounded-full bg-neutral-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-black peer-checked:after:translate-x-full peer-checked:after:border-white dark:bg-neutral-700 dark:peer-checked:bg-white"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <span>Dark Mode</span>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input type="checkbox" className="peer sr-only" />
                    <div className="peer h-6 w-11 rounded-full bg-neutral-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-black peer-checked:after:translate-x-full peer-checked:after:border-white dark:bg-neutral-700 dark:peer-checked:bg-white"></div>
                  </label>
                </div>
                <div className="pt-4">
                  <button className="w-full rounded-md border border-red-500 px-4 py-2 text-red-500 hover:bg-red-500 hover:text-white">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutWithSidebar>
  )
}
