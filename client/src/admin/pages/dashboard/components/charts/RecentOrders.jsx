import React, { useCallback} from "react";

const columns = [
  { name: "NAME", uid: "user" },
  { name: "ORDER", uid: "id" },
  {
    name: "REVENUE",
    uid: "price",
  },
];

export default function RecentOrders({ data }) {

  const renderCell = useCallback(
    (
      user,
      columnKey,
    ) => {
        return <>{userData?.username}</>;
      }
    )

  return (
    <div aria-label="Example table with custom cells">
      <div columns={columns}>
        {(column) => (
          <div
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </div>
        )}
      </div>
      <div items={data}>
        {(item) => (
          <div key={item.id}>
            {(columnKey) => (
              {/* <TableCell>{renderCell(item, columnKey)}</TableCell> */}
            )}
          </div>
        )}
      </div>
    </div>
  );
}
