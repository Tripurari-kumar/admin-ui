import React from 'react';
import './userTable.css';
import UserTile from './components/userTile/userTile';

function UserTable({
  users,
  page,
  setUsers,
  selectedUsers,
  setSelectedUsers,
  setSelectAll,
  searchKeyword,
}) {
  const currentPageAllUsersSelected = selectedUsers
    ?.slice(page * 10 - 10, page * 10)
    ?.every((item) => item?.isChecked === true);

  const onSelectAll = (e) => {
    if (selectedUsers?.length >= 10) {
      setSelectedUsers((prev) =>
        prev?.map((user, index) => {
          if (index > page * 10 - 10 - 1 && index < page * 10) {
            return { ...user, isChecked: e.target.checked };
          } else {
            return user;
          }
        })
      );
    } else {
      setSelectedUsers((prev) =>
        prev?.map((user) => ({ ...user, isChecked: e.target.checked }))
      );
    }

    setSelectAll((prev) =>
      prev?.map((item) => {
        if (item?.page === page) {
          return {
            ...item,
            value: e.target.checked,
          };
        } else {
          return item;
        }
      })
    );
  };

  return (
    <div className='table_wrapper'>
      <table width='100%'>
        <thead>
          <tr>
            <th>
              <input
                type='checkbox'
                id='selectAll'
                name='selectAll'
                value='selectAll'
                checked={currentPageAllUsersSelected}
                onChange={(e) => onSelectAll(e)}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.slice(page * 10 - 10, page * 10).map((user) => (
            <UserTile
              user={user}
              key={user?.id}
              setUsers={setUsers}
              users={users}
              setSelectedUsers={setSelectedUsers}
              selectedUsers={selectedUsers}
              searchKeyword={searchKeyword}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
