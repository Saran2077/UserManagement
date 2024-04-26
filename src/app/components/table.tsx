import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { User } from "../utils/config";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "@mui/material/Link";

const useStyles = makeStyles({
  tableContainer: {
    maxWidth: "100%", // Set a maximum width
    overflowX: "auto", // Enable horizontal scrolling
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    overflowX: "auto",
  },
  th: {
    textAlign: "left",
    padding: "16px",
    border: "1px solid #ddd",
    maxWidth: "150px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  td: {
    padding: "10px",
    textAlign: "left",
    border: "1px solid #ddd",
    maxWidth: "150px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  lastd: {
    padding: "10px",
    textAlign: "left",
    border: "1px solid #ddd",
    whiteSpace: "nowrap",
  },
});

interface UserTableProps {
  userList: User[];
  onDelete: (userId: string) => void;
  onEdit: (user: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  userList,
  onDelete,
  onEdit,
}) => {
  const classes = useStyles();
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

  const handleRowClick = (userId: string) => {
    setExpandedRowId((prevId) => (prevId === userId ? null : userId));
  };

  return (
    <div className={classes.tableContainer}>
      <table className={classes.table}>
        <thead>
          <tr>
            <th className={classes.th}>Name</th>
            <th className={classes.th}>Email</th>
            <th className={classes.th}>Linkedin URL</th>
            <th className={classes.th}>Gender</th>
            <th className={classes.th}>Address</th>{" "}
            <th className={classes.th}></th>
          </tr>
        </thead>
        {userList?.length ? (
          <tbody>
            {userList.map((user) => (
              <React.Fragment key={user.id}>
                <tr>
                  <td className={`${classes.td}`}>{user.name}</td>
                  <td className={`${classes.td}`}>{user.email}</td>
                  <td className={`${classes.td}`}>
                    <Link href={user.linkedinUrl}>{user.linkedinUrl}</Link>
                  </td>
                  <td className={classes.td}>{user.gender}</td>
                  <td
                    className={`${classes.td}`}
                    style={{ position: "relative" }}
                  >
                    <span> {user.address.line1}</span>
                    <span
                      style={{
                        position: "absolute",
                        right: 0,
                        top: 16,
                        cursor: "pointer",
                      }}
                      onClick={() => handleRowClick(user?.id ?? "")}
                    >
                      <ExpandMoreIcon />
                    </span>
                  </td>
                  <td
                    className={`${classes.lastd}`}
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <Button
                      className="edit-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(user);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      className="delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(user?.id ? user.id : "");
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
                {expandedRowId === user.id && (
                  <tr>
                    <td colSpan={6} className={classes.td}>
                      <div>
                        <strong>Address:</strong>{" "}
                        {`${user.address.line1}, ${user.address.line2}, ${user.address.city}, ${user.address.state}, ${user.address.pin}`}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan={6} style={{ textAlign: "center", padding: "10%" }}>
                No results found
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default UserTable;
