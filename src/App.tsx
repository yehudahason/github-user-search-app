import { useState, useEffect, useRef } from "react";
import Footer from "./Components/Footer";
import Loading from "./Components/Loading";
import Header from "./Components/Header";
import ErrorMsg from "./Components/ErrorMsg";
import Article from "./Components/Article";
import SearchForm from "./Components/SearchForm";
import { fetchUser } from "./fetchMethod/fetchUser";
import type { GithubUser } from "./types";

export default function App() {
  const [username, setUsername] = useState<string>("Octocat");
  const [data, setData] = useState<GithubUser | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [loading, setLoading] = useState<boolean>(false);

  const abortControllerRef = useRef<AbortController | null>(null);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const value = username.replace(/\s/g, "").trim();

    if (!value) return;

    // Abort previous request
    abortControllerRef.current?.abort();

    // Create controller for this request
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const user = await fetchUser(value, controller.signal);
      setData(user);
    } catch (e) {
      // Ignore aborted requests
      if (e instanceof DOMException && e.name === "AbortError") {
        return;
      }

      setData(null);

      if (e instanceof Error) {
        setError(e);
      }
    } finally {
      // Only update loading if this is still the active request
      if (abortControllerRef.current === controller) {
        setLoading(false);
        setUsername("");
        abortControllerRef.current = null;
      }
    }
  };

  useEffect(() => {
    async function loadUser() {
      setLoading(true);

      try {
        const user = await fetchUser("octocat", null);
        setData(user);
      } catch (e) {
        if (e instanceof Error) {
          setError(e);
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
    return <Loading />;
  }

  return (
    <>
      <main className="min-h-screen bg-[#f6f8ff] px-5 py-7.5 font-mono text-[#2b3442] dark:bg-neutral-800 sm:px-6 sm:py-10 lg:py-20">
        <div className="mx-auto w-full max-w-4xl">
          {/* Header */}
          <Header dark={dark} setDark={setDark} />

          {/* Search Form */}
          <SearchForm
            username={username}
            setUsername={setUsername}
            handleSearch={handleSearch}
          />
          {/* Results Live Region */}
          <div aria-live="polite" aria-atomic="true">
            {error ? (
              <ErrorMsg error={error} />
            ) : data ? (
              <Article data={data} dark={dark} />
            ) : null}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
