import React from 'react';
import './userActions.css';

function UserActions({
  users,
  setUsers,
  setPage,
  page,
  selectedUsers,
  setSelectAll,
}) {
  const currentPageAllUsersSelected = selectedUsers
    ?.slice(page * 10 - 10, page * 10)
    ?.every((item) => item?.isChecked === true);
  const totalPages = Math.ceil(users?.length / 10);
  const handlePageClick = (pageNo) => {
    setPage(pageNo);
  };

  const onDeleteSelected = () => {
    setUsers((prev) =>
      prev.filter((user) => {
        const selectedUser = selectedUsers.find(
          (item) => item?.id === user?.id
        );
        return !selectedUser?.isChecked;
      })
    );
    setSelectAll((prev) =>
      prev?.map((item) => {
        if (item?.page === page) {
          return {
            ...item,
            value: false,
          };
        } else {
          return item;
        }
      })
    );
    if (page > totalPages / 2) {
      setPage(1);
    }
    if (page === totalPages && currentPageAllUsersSelected) {
      setPage(page - 1);
    }
  };

  return (
    <div className='bottom_wrapper'>
      <div className='pagination'>
        <div
          className={page !== 1 ? 'btn' : 'btn disable'}
          onClick={() => setPage(1)}
        >
          {`<<`}
        </div>
        <div
          className={page > 1 ? 'btn' : 'btn disable'}
          onClick={() => setPage(page - 1)}
        >
          {`<`}
        </div>
        {[...Array(totalPages)].map((_, i) => {
          return (
            <div
              className={page === i + 1 ? 'btn active' : 'btn'}
              key={i}
              onClick={() => handlePageClick(i + 1)}
            >
              {i + 1}
            </div>
          );
        })}
        <div
          className={page < totalPages ? 'btn' : 'btn disable'}
          onClick={() => setPage(page + 1)}
        >{`>`}</div>
        <div
          className={page !== totalPages ? 'btn' : 'btn disable'}
          onClick={() => setPage(totalPages)}
        >{`>>`}</div>
      </div>
      <div className='delete_btn' onClick={onDeleteSelected}>
        Delete Selected
      </div>
    </div>
  );
}

export default UserActions;
