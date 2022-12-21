import React from "react";
import { ITableData } from "../../../core/interfaces";

type Props = {
  data: ITableData[];
};

const Datatable: React.FC<Props> = ({ data }) => {
  return (
    <>
      <div className="custom-table">
        <table>
          <thead>
            <tr>
              <th>
                <div>Name</div>
              </th>
              <th>
                <div>Email</div>
              </th>
              <th>
                <div>Phone</div>
              </th>
            </tr>
          </thead>
          <tbody className="list">
            {data.length ? (
              data.map((value, idx) => {
                return (
                  <tr key={idx}>
                    <td className="name">{value.name}</td>
                    <td className="email">{value.email}</td>
                    <td className="phone">{value.phone}</td>
                  </tr>
                );
              })
            ) : (
              <tr className="uk-alert-warning">
                <td colSpan={6}>No Records Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Datatable;
