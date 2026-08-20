type Prpos = {
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  username: string;
  setUsername: (valeu: string) => void;
};

export default function SearchForm({
  handleSearch,
  username,
  setUsername,
}: Prpos) {
  return (
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
  );
}
