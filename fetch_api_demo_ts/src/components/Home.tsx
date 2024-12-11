import { useMemo, useState } from "react";
import { CurrentPageContent } from "./components/CurrentPageContent.tsx";
import { PageControls } from "./components/PageControls.tsx";
import { Pagination } from "./components/PaginationNew.tsx";
import { useQuery } from "@tanstack/react-query";


const itemsPerPage = 5;
const minPage = 1;

export const Home = () => {
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
    <div className="mx-auto max-w-3xl space-y-8 min-h-screen bg-background p-6 md:p-12">
        <PageControls
        minPage={minPage}
        maxPage={maxPage}
        setCurrentPage={setCurrentPage}
        />
        <CurrentPageContent items={currentItemsMemo} currentPage={currentPage} />
        <Pagination
        minPage={minPage}
        maxPage={maxPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        />
    </div>
  );
};

