import { useState, useEffect } from "react";
import Footer from "./Footer";

type GithubUser = {
  name: string;
  login: string;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  location: string | null;
  twitter_username: string | null;
  blog: string;
  company: string | null;
  created_at: string;
};

export default function App() {
  const [username, setUsername] = useState<string>("Octocat");
  const [data, setData] = useState<GithubUser | null>(null);
  const [error, setError] = useState<string>("");
  const baseUrl = import.meta.env.BASE_URL;

  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [loading, setLoading] = useState<boolean>(false);

  function formatDate(str: string | null) {
    if (!str) return "";
    const date = new Date(str);

    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    }).format(date);
  }

  async function fetchUser(username: string) {
    const res = await fetch(`https://api.github.com/users/${username}`);

    if (!res.ok) {
      throw new Error("User not found");
    }

    return await res.json();
  }

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let value = username.replace(/\s/g, "");
    value = value.trim();

    if (!value) return;

    setLoading(true);
    setError("");

    try {
      const user = await fetchUser(value);
      setData(user);
    } catch (e) {
      setData(null);

      if (e instanceof Error) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
      setUsername("");
    }
  };

  useEffect(() => {
    async function loadUser() {
      setLoading(true);

      try {
        const user = await fetchUser("octocat");
        setData(user);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      } finally {
        setLoading(false);
        setUsername("");
      }
    }

    loadUser();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  if (loading) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex min-h-screen items-center justify-center font-mono text-xl dark:bg-neutral-800 dark:text-white"
      >
        <span className="sr-only">Loading user data...</span>
        <h1 aria-hidden="true">Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-[#f6f8ff] px-5 py-7.5 font-mono text-[#2b3442] dark:bg-neutral-800 sm:px-6 sm:py-10 lg:py-20">
        <div className="mx-auto w-full max-w-4xl">
          {/* Header */}
          <header className="mb-7.5 flex items-center justify-between sm:mb-8.75">
            <h1 className="text-preset-1 font-bold text-[#202a3b] dark:text-white ">
              devfinder
            </h1>

            <button
              type="button"
              onClick={() => setDark(!dark)}
              aria-label={`Switch to ${dark ? "light" : "dark"} theme`}
              aria-pressed={dark}
              className="flex cursor-pointer items-center gap-2 bg-transparent  font-bold tracking-[3px] text-[#4d6794] dark:text-white sm:gap-3.5 text-preset-8"
            >
              <span aria-hidden="true">{dark ? "LIGHT" : "DARK"}</span>
              <span
                className="font-sans text-3xl leading-5 sm:text-4xl"
                aria-hidden="true"
              >
                <img
                  src={`${baseUrl}/assets/icon-${dark ? "sun" : "moon"}.svg`}
                  alt=""
                />
              </span>
            </button>
          </header>

          {/* Search Form */}
          <form
            onSubmit={handleSearch}
            role="search"
            aria-label="GitHub User Search"
            className="border border-gray-300 dark:border-gray-600 mb-6.25 flex h-17.5 items-center justify-between rounded-[15px] bg-white p-1.75 shadow-sm transition-colors focus-within:border-[#087cff] dark:bg-neutral-900 sm:mb-12.5 sm:h-22 sm:rounded-[20px] sm:p-2.5"
          >
            <div className="flex min-w-0 flex-1 items-center">
              <span
                aria-hidden="true"
                className="mx-2.5 shrink-0 -rotate-20 font-sans text-3xl leading-none text-[#087cff] sm:mx-6 sm:text-4xl"
              >
                ⌕
              </span>

              <label htmlFor="github-search" className="sr-only">
                Search GitHub username
              </label>
              <input
                id="github-search"
                type="search"
                placeholder="Search GitHub username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full min-w-0 border-0 bg-transparent text-[13px] text-neutral-700 outline-none placeholder:text-gray-600 

                dark:placeholder:text-gray-300
                dark:text-white sm:text-lg"
              />
            </div>

            <button
              type="submit"
              className="cursor-pointer h-14 shrink-0 rounded-xl bg-[#087cff] px-4 text-preset-5 text-white transition hover:bg-[#0068df] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087cff] sm:h-15 sm:rounded-[15px] sm:px-7.5 sm:text-lg"
            >
              Search
            </button>
          </form>

          {/* Results Live Region */}
          <div aria-live="polite" aria-atomic="true">
            {error ? (
              <div className="rounded-[20px] bg-white px-6 py-12 text-center shadow-[0_15px_30px_rgba(70,96,160,0.15)] dark:bg-neutral-900 sm:px-8 sm:py-16">
                <h2 className="text-2xl font-bold text-neutral-700 dark:text-white">
                  No results found!
                </h2>
                <p className="mx-auto mt-5 max-w-[700px] text-neutral-500 dark:text-neutral-300">
                  We couldn&apos;t find any GitHub users matching your search.
                  Please double-check the username and try again.
                </p>
              </div>
            ) : data ? (
              <article
                aria-label={`GitHub profile details for ${data.name || data.login}`}
                className="border border-gray-300 dark:border-gray-600   rounded-[15px] bg-white px-6.25 py-7.5 shadow-sm dark:bg-neutral-900 sm:rounded-[20px] sm:px-8.75 sm:py-11.25 lg:px-12.5 lg:pb-12.5"
              >
                <div className="block gap-10 sm:flex sm:gap-6.25 lg:gap-10">
                  {/* Avatar */}
                  <img
                    src={data.avatar_url}
                    alt={`${data.name || data.login}'s profile avatar`}
                    className="mb-5 h-20 w-20 shrink-0 rounded-full object-cover sm:mb-0 sm:h-30 sm:w-30"
                  />

                  <div className="min-w-0 flex-1">
                    {/* Header Details */}
                    <div className="flex flex-col items-start justify-between gap-1.25 sm:flex-row sm:gap-5">
                      <div>
                        <h2 className="m-0 mb-1 text-preset-1 font-bold leading-tight text-[#2b3442] dark:text-white sm:text-[30px]">
                          {data.name || data.login}
                        </h2>

                        <a
                          href={`https://github.com/${data.login}`}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`@${data.login} on GitHub (opens in a new tab)`}
                          className="text-preset-4 text-[#087cff] no-underline hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087cff] sm:text-base"
                        >
                          @{data.login}
                        </a>
                      </div>

                      {data.created_at && (
                        <time
                          dateTime={data.created_at}
                          className="text-preset-6 whitespace-nowrap text-xs text-neutral-700 dark:text-gray-300 sm:pt-1.5 sm:text-[1rem]"
                        >
                          Joined {formatDate(data.created_at)}
                        </time>
                      )}
                    </div>

                    {/* Bio */}
                    <p
                      className={`${data.bio ? "dark:text-neutral-100" : " dark:text-neutral-300"}   my-6.25 text-[13px] text-neutral-700 sm:my-9 sm:mb-7.5 sm:text-preset-4 `}
                    >
                      {data.bio ? data.bio : "This profile has no bio"}
                    </p>

                    {/* Key-Value Statistics */}
                    <dl className="mb-6.25 grid grid-cols-1  gap-4  sm:grid-cols-3 rounded-[13px] bg-gray-100  py-5 dark:bg-neutral-800 sm:mb-7.5 px-10 sm:py-5.5">
                      <div className="flex flex-col gap-2">
                        <dt className=" text-preset-7 text-neutral-700 dark:text-neutral-100 text-left sm:text-sm">
                          Repos
                        </dt>
                        <dd className="m-0  text-xl font-bold leading-none text-[#293344] dark:text-white sm:text-left text-preset-2">
                          {data.public_repos}
                        </dd>
                      </div>

                      <div className="flex flex-col gap-2">
                        <dt className=" text-preset-7 text-neutral-700 dark:text-neutral-100 text-left sm:text-sm">
                          Followers
                        </dt>
                        <dd className="m-0  text-xl font-bold leading-none text-[#293344] dark:text-white text-left sm:text-preset-2">
                          {data.followers}
                        </dd>
                      </div>

                      <div className="flex flex-col gap-2">
                        <dt className=" text-preset-7 text-neutral-700 dark:text-neutral-100 text-left sm:text-sm">
                          Following
                        </dt>
                        <dd className="m-0  text-xl font-bold leading-none text-[#293344] dark:text-white text-left sm:text-preset-2">
                          {data.following}
                        </dd>
                      </div>
                    </dl>

                    {/* Social Information Grid */}
                    <ul className="text-preset-6 grid grid-cols-1 gap-y-4.5 list-none p-0 sm:grid-cols-2 sm:gap-x-8.75 sm:gap-y-5">
                      <li
                        className={`flex min-w-0 items-center gap-3.75 text-[13px] sm:text-[15px]  text-[#60779e] dark:text-neutral-100`}
                      >
                        <img
                          src={`${baseUrl}/assets/icon-location.svg`}
                          alt=""
                          aria-hidden="true"
                          className={`${dark ? " brightness-0 invert" : "brightness-0 saturate-100 invert-[20%] sepia-[40%] saturate-[1200%] hue-rotate-[10deg] brightness-[75%] contrast-[100%]"}`}
                        />
                        <span
                          className={`${data.location ? "text-gray-700 dark:text-gray-100 " : "dark:text-neutral-300"}`}
                        >
                          {data.location || "Not Available"}
                        </span>
                      </li>

                      <li
                        className={`flex min-w-0 items-center gap-3.75 text-[13px] sm:text-[15px]  text-[#60779e] dark:text-neutral-100`}
                      >
                        <img
                          src={`${baseUrl}/assets/icon-twitter.svg`}
                          alt=""
                          aria-hidden="true"
                          className={`${dark ? " brightness-0 invert" : "brightness-0 saturate-100 invert-[20%] sepia-[40%] saturate-[1200%] hue-rotate-[10deg] brightness-[75%] contrast-[100%]"}`}
                        />
                        <span
                          className={`${data.twitter_username ? "text-gray-700 dark:text-gray-100 " : "dark:text-neutral-300"}`}
                        >
                          {data.twitter_username || "Not Available"}
                        </span>
                      </li>

                      <li
                        className={`flex min-w-0 items-center gap-3.75 text-[13px] sm:text-[15px]  text-[#60779e] dark:text-neutral-300`}
                      >
                        <img
                          src={`${baseUrl}/assets/icon-website.svg`}
                          alt=""
                          className={`${dark ? " brightness-0 invert" : "brightness-0 saturate-100 invert-[20%] sepia-[40%] saturate-[1200%] hue-rotate-[10deg] brightness-[75%] contrast-[100%]"}`}
                          aria-hidden="true"
                        />
                        {data.blog ? (
                          <a
                            href={
                              data.blog.startsWith("http")
                                ? data.blog
                                : `https://${data.blog}`
                            }
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`Personal website: ${data.blog} (opens in a new tab)`}
                            className="truncate text-gray-700  no-underline hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087cff] dark:text-neutral-100"
                          >
                            {data.blog}
                          </a>
                        ) : (
                          <span className="text-[#60779e] dark:text-neutral-300">
                            Not Available
                          </span>
                        )}
                      </li>

                      <li
                        className={`flex min-w-0 items-center gap-3.75 text-[13px] sm:text-[15px] text-[#60779e] dark:text-neutral-300`}
                      >
                        <img
                          src={`${baseUrl}/assets/icon-company.svg`}
                          alt=""
                          className={`${dark ? " brightness-0 invert" : "brightness-0 saturate-100 invert-[20%] sepia-[40%] saturate-[1200%] hue-rotate-[10deg] brightness-[75%] contrast-[100%]"}`}
                          aria-hidden="true"
                        />
                        {data.company ? (
                          <a
                            href={`https://github.com/${data.company.replace("@", "")}`}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`Company: ${data.company} on GitHub (opens in a new tab)`}
                            className="truncate text-gray-700 no-underline hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087cff] dark:text-neutral-100"
                          >
                            {data.company}
                          </a>
                        ) : (
                          <span className="text-[#60779e] dark:text-neutral-300 ">
                            Not Available
                          </span>
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
              </article>
            ) : null}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
