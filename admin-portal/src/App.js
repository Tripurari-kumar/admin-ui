import React, { useEffect, useMemo, useState } from 'react';
import Search from './components/search/search';
import UserActions from './components/userActions/userActions';
import UserTable from './components/usersTable/usersTable';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState([]);
  const [enterPressed, setEnterPressed] = useState(false);

  async function getUsers() {
    const response = await fetch(
      'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
    );
    const usersData = await response.json();
    setUsers(usersData);
  }

  const filteredUsers = useMemo(() => {
    if (searchKeyword === '') {
      return users;
    }
    const lowerKeyword = searchKeyword.toLowerCase();
    return users.filter((item) => {
      for (const key in item) {
        if (
          typeof item[key] === 'string' &&
          item[key].toLowerCase().includes(lowerKeyword)
        ) {
          return true;
        }
      }
      return false;
    });
  }, [users, searchKeyword]);

  useEffect(() => {
    setSelectedUsers((prev) =>
      filteredUsers.map((user) => {
        const selectedUser = prev.find((item) => item?.id === user?.id);
        return {
          ...user,
          isChecked: selectedUser?.isChecked || false,
        };
      })
    );
    setSelectAll(
      [...Array(Math.ceil(filteredUsers?.length / 10))]?.map((_, index) => ({
        page: index + 1,
        value: false,
      }))
    );
  }, [filteredUsers]);

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className='body_wrapper'>
      <Search
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        setPage={setPage}
        setEnterPressed={setEnterPressed}
      />
      {users.length === 0 ? (
        enterPressed && (
          <div>
            {searchKeyword
              ? `No Matches as per your search!`
              : `There are no users Left!`}
          </div>
        )
      ) : (
        <>
          <UserTable
            users={filteredUsers}
            page={page}
            setUsers={setUsers}
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
            selectAll={selectAll}
            setSelectAll={setSelectAll}
            searchKeyword={searchKeyword}
          />
          <UserActions
            users={filteredUsers}
            setUsers={setUsers}
            setPage={setPage}
            page={page}
            selectedUsers={selectedUsers}
            setSelectAll={setSelectAll}
          />
        </>
      )}
    </div>
  );
}

export default App;
