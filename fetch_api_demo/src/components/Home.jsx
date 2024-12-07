import { useMemo, useState } from "react";
import { CurrentPageContent } from "./components/CurrentPageContent.jsx";
import { PageControls } from "./components/PageControls.jsx";
import { Pagination } from "./components/PaginationNew.jsx";


const itemsPerPage = 5;
const minPage = 1;

export const Home = ( {data, isPending, isError, error} ) => {
  const [currentPage, setCurrentPage] = useState(1);

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
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        minPage={minPage}
        maxPage={maxPage}
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

