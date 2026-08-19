import { useState } from "react";
import Footer from "./Footer";
import { useEffect } from "react";

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
    if (!str) return;
    const date = new Date(str);

    const formatted = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    }).format(date);

    // console.log(formatted);
    return formatted;
  }
  async function fetchUser(username: string) {
    const res = await fetch(`https://api.github.com/users/${username}`);

    if (!res.ok) {
      throw new Error("User not found");
    }

    const data = await res.json();
    console.log(data);
    return data;
  }

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = username.replace(/\s/g, "");

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

  if (loading) return <h1>Loaiding</h1>;

  return (
    <>
      <header></header>

      <main className="min-h-screen dark:bg-neutral-800 bg-[#f6f8ff] px-5 py-7.5 font-mono text-[#2b3442] sm:px-6 sm:py-10 lg:py-20">
        <div className="mx-auto w-full max-w-4xl">
          {/* Header */}
          <header className="mb-7.5 flex items-center justify-between sm:mb-8.75">
            <h1 className="text-2xl font-bold tracking-[-1px] text-[#202a3b] sm:text-[28px]">
              devfinder
            </h1>

            <button
              onClick={() => setDark(!dark)}
              className="flex cursor-pointer items-center gap-2 bg-transparent text-xs font-bold tracking-[3px] text-[#4d6794] sm:gap-3.5 sm:text-sm"
            >
              {dark ? "LIGHT" : "DARK"}
              <span className="font-sans text-3xl leading-5 sm:text-4xl">
                {dark ? (
                  <img src={`${baseUrl}/assets/icon-sun.svg`} alt="" />
                ) : (
                  <img src={`${baseUrl}/assets/icon-moon.svg`} alt="" />
                )}
              </span>
            </button>
          </header>
          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="mb-6.25 flex h-17.5 items-center justify-between rounded-[15px] bg-white p-1.75 shadow-[0_15px_30px_rgba(70,96,160,0.1)] sm:mb-12.5 sm:h-22 sm:rounded-[20px] sm:p-2.5"
          >
            <div className="flex min-w-0 flex-1 items-center">
              <span className="mx-2.5 shrink-0 -rotate-20 font-sans text-3xl leading-none text-[#087cff] sm:mx-6 sm:text-4xl">
                ⌕
              </span>

              <input
                type="text"
                placeholder="Search GitHub username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full min-w-0 border-0 bg-transparent text-[13px] text-[#4c6085] outline-none placeholder:text-[#58719c] sm:text-lg"
              />
            </div>

            <button
              type="submit"
              className="h-14 shrink-0 rounded-xl bg-[#087cff] px-4 text-sm font-bold text-white transition hover:bg-[#0068df] sm:h-15 sm:rounded-[15px] sm:px-7.5 sm:text-lg"
            >
              Search
            </button>
          </form>
          {error ? (
            <div className="rounded-[20px] bg-white px-6 py-12 text-center shadow-[0_15px_30px_rgba(70,96,160,0.15)] sm:px-8 sm:py-16">
              <h2 className="text-preset-2 text-neutral-700">
                No results found!
              </h2>

              <p className="text-preset-4 mx-auto mt-5 max-w-[700px] text-neutral-300">
                We couldn&apos;t find any GitHub users matching your search.
                Please double-check the username and try again.
              </p>
            </div>
          ) : (
            <section className="rounded-[15px] bg-white px-6.25 py-7.5 shadow-[0_15px_30px_rgba(70,96,160,0.1)] sm:rounded-[20px] sm:px-8.75 sm:py-11.25 lg:px-12.5 lg:pb-12.5">
              <div className="block gap-10 sm:flex sm:gap-6.25 lg:gap-10">
                {/* Avatar */}
                <img
                  src={data?.avatar_url}
                  alt="The Octocat"
                  className="mb-5 h-20 w-20 shrink-0 rounded-full object-cover sm:mb-0 sm:h-30 sm:w-30"
                />

                <div className="min-w-0 flex-1">
                  {/* Name */}
                  <div className="flex flex-col items-start justify-between gap-1.25 sm:flex-row sm:gap-5">
                    <div>
                      <h2 className="m-0 text-[22px] font-bold leading-tight text-[#2b3442] sm:text-[30px]">
                        {data?.name}
                      </h2>

                      <a
                        href={`https://github.com/${data?.login}`}
                        className="text-sm text-[#087cff] no-underline sm:text-base"
                      >
                        @{data?.login}
                      </a>
                    </div>

                    <span className="whitespace-nowrap text-xs text-[#60779e] sm:pt-1.5 sm:text-[15px]">
                      Joined{" "}
                      {data?.created_at ? formatDate(data.created_at) : ""}
                    </span>
                  </div>

                  {/* Bio */}
                  <p className="my-6.25 text-[13px] text-[#8ca2c4] sm:my-9 sm:mb-7.5 sm:text-base">
                    {data?.bio ? data.bio : "This profile has no bio"}
                  </p>

                  {/* Stats */}
                  <div className="mb-6.25 grid grid-cols-3 rounded-[13px] bg-[#f6f8ff] px-3.75 py-5 sm:mb-7.5 sm:px-10 sm:py-5.5">
                    <div className="flex flex-col gap-2">
                      <span className="text-center text-[11px] text-[#6680aa] sm:text-left sm:text-sm">
                        Repos
                      </span>

                      <strong className="text-center text-xl leading-none text-[#293344] sm:text-left sm:text-[25px]">
                        {data?.public_repos}
                      </strong>
                    </div>

                    <div className="flex flex-col gap-2">
                      <span className="text-center text-[11px] text-[#6680aa] sm:text-left sm:text-sm">
                        Followers
                      </span>

                      <strong className="text-center text-xl leading-none text-[#293344] sm:text-left sm:text-[25px]">
                        {data?.followers}
                      </strong>
                    </div>

                    <div className="flex flex-col gap-2">
                      <span className="text-center text-[11px] text-[#6680aa] sm:text-left sm:text-sm">
                        Following
                      </span>

                      <strong className="text-center text-xl leading-none text-[#293344] sm:text-left sm:text-[25px]">
                        {data?.following}
                      </strong>
                    </div>
                  </div>

                  {/* Information */}
                  <div className="grid grid-cols-1 gap-y-4.5 sm:grid-cols-2 sm:gap-x-8.75 sm:gap-y-5">
                    <div className="flex min-w-0 items-center gap-3.75 text-[13px] text-[#60779e] sm:text-[15px]">
                      <img src={`${baseUrl}/assets/icon-location.svg`} alt="" />
                      <span>
                        {data?.location ? data.location : "Not Available"}
                      </span>
                    </div>

                    <div className="flex min-w-0 items-center gap-3.75 text-[13px] text-[#60779e] sm:text-[15px]">
                      <img src={`${baseUrl}/assets/icon-twitter.svg`} alt="" />
                      <span>
                        {" "}
                        {data?.twitter_username
                          ? data.twitter_username
                          : "Not Available"}
                      </span>
                    </div>

                    <div className="flex min-w-0 items-center gap-3.75 text-[13px] text-[#60779e] sm:text-[15px]">
                      <img src={`${baseUrl}/assets/icon-website.svg`} alt="" />
                      <a
                        href="https://github.blog"
                        className="truncate text-[#60779e] no-underline hover:underline"
                      >
                        {data?.blog ? data.blog : "Not Available"}
                      </a>
                    </div>

                    <div className="flex min-w-0 items-center gap-3.75 text-[13px] text-[#60779e] sm:text-[15px]">
                      <img src={`${baseUrl}assets/icon-company.svg`} alt="" />
                      <a
                        href="https://github.com"
                        className="truncate text-[#60779e] no-underline hover:underline"
                      >
                        {data?.company ? data.company : "Not Available"}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}
