type Props = {
  dark: boolean;
  setDark: (value: boolean) => void;
};
export default function Header({ dark, setDark }: Props) {
  const baseUrl = import.meta.env.BASE_URL;
  return (
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
  );
}
