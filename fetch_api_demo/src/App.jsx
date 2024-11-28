import { useEffect, useMemo, useState } from "react";
import { CurrentPageContent } from "./components/CurrentPageContent.jsx";
import { PageControls } from "./components/PageControls.jsx";
import { Pagination } from "./components/PaginationNew.jsx";

const itemsPerPage = 5;
const minPage = 1;

const App = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const maxPage = useMemo(() => Math.ceil(data.length / itemsPerPage), [data]);

  async function fetchData() {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const result = await response.json();
      if (!response.ok) {
        throw new Error("Помилка завантаження даних з серверу");
      }
      setData(result);
    } catch (error) {
      setError(error.message);
    }
  }

  const currentItemsMemo = useMemo(() => {
    const indexEnd = currentPage * itemsPerPage;
    const indexStart = indexEnd - itemsPerPage;
    return data.slice(indexStart, indexEnd);
  }, [data, currentPage]);

  useEffect(() => {
    setIsLoading(true);
    fetchData();
    setIsLoading(false);
  }, []);

  if (isLoading) return <div>Завантаження... </div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <CurrentPageContent items={currentItemsMemo} currentPage={currentPage} />
      <PageControls
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        minPage={minPage}
        maxPage={maxPage}
      />
      <Pagination
        maxPage={maxPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default App;
