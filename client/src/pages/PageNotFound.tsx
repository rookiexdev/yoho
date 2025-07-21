import { Link } from "react-router-dom";

export default function PageNotFound() {

  return (
    <main
      className={`grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8`}
    >
      <div className="text-center">
        <p className="text-9xl font-semibold text-indigo-600">404</p>
        <h1
          className={`mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl text-whiteClr`}
        >
          Page not found
        </h1>
        <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className={`rounded-md px-3.5 py-2.5 text-sm font-semibold  shadow-sm focus-visible:outline focus-visible:outline-indigo-600 bg-[hsl(209,23%,22%)] text-white hover:bg-[hsl(208,22%,26%)]`}
          >
            Go back home
          </Link>
        </div>
      </div>
    </main>
  );
}