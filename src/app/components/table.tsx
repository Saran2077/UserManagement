import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { User } from "../utils/config";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const useStyles = makeStyles({
  table: {
    width: "100%",
    borderCollapse: "collapse",
    overflowX: "auto",
  },
  th: {
    textAlign: "left",
    padding: "16px",
    border: "1px solid #ddd",
    maxWidth: "150px", // Set max width for columns
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  td: {
    padding: "10px",
    textAlign: "left",
    border: "1px solid #ddd",
    maxWidth: "150px", // Set max width for columns
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
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
                <td className={`${classes.td}`}>{user.linkedinUrl}</td>
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
                  className={`${classes.td}`}
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
  );
};

export default UserTable;
