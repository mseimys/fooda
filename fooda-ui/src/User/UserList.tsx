import React, { useState, useEffect, useContext } from "react";
import { Button, Spinner } from "react-bootstrap";

import { BlockedUser, RootContext } from "../context";
import userService from "./service";

export default function UserList() {
  const [refresh, setRefresh] = useState(0);
  const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>();
  const { user } = useContext(RootContext);

  useEffect(() => {
    userService.getBlockedUsers(user.id).then((blockedUsers) => {
      setBlockedUsers(blockedUsers);
    });
  }, [refresh]);

  if (!blockedUsers) {
    return <Spinner animation="border" />;
  }

  const unblock = (id: number) => {
    userService.deleteBlockedUser(id).then(() => {
      setRefresh(refresh + 1);
    });
  };

  return (
    <div>
      <h3 className="mb-4">Blocked Users</h3>
      {blockedUsers.length === 0 ? (
        <p className="text-muted">No known blocked users</p>
      ) : (
        <ul>
          {blockedUsers.map((blockedUser) => (
            <li key={blockedUser.id}>
              User ID={blockedUser.user}, Restaurant ID={blockedUser.restaurant}
              <Button
                className="m-2"
                size="sm"
                variant="info"
                onClick={() => unblock(blockedUser.id)}
              >
                Unblock
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
