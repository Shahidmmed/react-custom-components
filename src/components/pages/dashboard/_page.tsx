import { useState } from "react";
import Datatable from "../../layout/datatable/_component";
import Paginate from "../../layout/pagination/_component";

export const Dashboard = () => {
  const [data, setData] = useState([]);
  const populateDataTable = () => {
    return (
      <Paginate
        RenderComponent={Datatable}
        pageLimit={10}
        dataLimit={10}
        data={data}
      />
    );
  };
  return (
    <>
      <div className="container mx-auto">
        <h1 className="text-lg">Dashboard</h1>
        <p className="text-gray-400 font-thin">
          This will contain all components and how to implement them. Kindly
          call the component from this Dashboard component
        </p>

        <div className="page flex-1 p-6">
          <div className="datatable table-section">{populateDataTable()}</div>
        </div>
      </div>
    </>
  );
};
