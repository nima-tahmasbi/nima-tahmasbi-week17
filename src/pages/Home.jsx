import { useContext, useEffect } from "react";

import ContactsPage from "./ContactsPage";
import SearchBar from "./SearchBar";
import { DataContext } from "../context/DataProvider";
function Home() {
  const { fetchData } = useContext(DataContext);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <SearchBar />
      <ContactsPage />
    </div>
  );
}

export default Home;
