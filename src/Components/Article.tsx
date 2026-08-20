import type { GithubUser } from "../types";
import { formatDate } from "../utils/formatDate";
type Props = {
  data: GithubUser;
  dark: boolean;
};

export default function Article({ data, dark }: Props) {
  const baseUrl = import.meta.env.BASE_URL;
  return (
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
  );
}
