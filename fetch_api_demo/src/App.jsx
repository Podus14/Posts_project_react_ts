import { useMemo, useState } from "react";
import { CurrentPageContent } from "./components/CurrentPageContent.jsx";
import { PageControls } from "./components/PageControls.jsx";
import { Pagination } from "./components/PaginationNew.jsx";
import { useQuery } from "@tanstack/react-query";

const itemsPerPage = 5;
const minPage = 1;

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["posts"],
    initialData: [],
    queryFn: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      if (!response.ok) {
        throw new Error("Помилка завантаження даних з серверу");
      }
      return await response.json();
    },
  });

  const maxPage = useMemo(() => Math.ceil(data.length / itemsPerPage), [data]);

  const currentItemsMemo = useMemo(() => {
    const indexEnd = currentPage * itemsPerPage;
    const indexStart = indexEnd - itemsPerPage;
    return data.slice(indexStart, indexEnd);
  }, [data, currentPage]);

  if (isPending) return <div>Завантаження... </div>;
  if (isError) return <div>{error.message}</div>;

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
