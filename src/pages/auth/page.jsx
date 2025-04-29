import LayoutWithSidebar from "@/components/layout-with-sidebar"

export default function AuthPage() {
  return (
    <LayoutWithSidebar>
      <div className="flex flex-1 flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md rounded-lg border border-neutral-200 bg-white p-8 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
          <h1 className="text-2xl font-bold">Login</h1>
          <form className="mt-6 flex flex-col gap-4">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full rounded-md border border-neutral-300 p-2 dark:border-neutral-600 dark:bg-neutral-700"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full rounded-md border border-neutral-300 p-2 dark:border-neutral-600 dark:bg-neutral-700"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="mt-2 rounded-md bg-black px-4 py-2 text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-neutral-600 dark:text-neutral-300">
            Don't have an account?{" "}
            <a href="#" className="font-medium text-black dark:text-white">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </LayoutWithSidebar>
  )
}
