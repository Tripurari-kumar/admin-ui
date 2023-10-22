import React, { useState } from 'react';
import './userTile.css';
import DeleteIcon from '../../../../assets/deleteIcon.svg';
import EditIcon from '../../../../assets/editIcon.svg';
import Modal from '../../../common/modal/modal';
import { makeBold } from '../../../../utils/searchUtility';

function UserTile({
  user,
  users,
  setUsers,
  selectedUsers,
  setSelectedUsers,
  searchKeyword,
}) {
  const [modal, setModal] = useState(false);
  const [userObject, setUserObject] = useState({
    name: user?.name,
    role: user?.role,
    id: user?.id,
    email: user?.email,
  });
  const Toggle = () => setModal(!modal);
  const deleteUserById = (id) => {
    const filteredUsers = users.filter((user) => user?.id !== id);
    setUsers(filteredUsers);
  };
  const selectUser = (e) => {
    setSelectedUsers((prev) => {
      return prev.map((item) => {
        if (item?.id === user?.id) {
          return { ...item, isChecked: e.target.checked };
        } else {
          return item;
        }
      });
    });
  };

  const getSelectedStatus = () => {
    return selectedUsers.find((item) => item?.id === user?.id)?.isChecked;
  };

  const handleChangeUser = (e, field) => {
    setUserObject((prev) => ({ ...prev, [field]: e.target.value }));
  };
  const onSubmit = () => {
    setUsers((prev) => {
      return prev.map((item) => {
        if (item?.id === userObject?.id) {
          return userObject;
        } else {
          return item;
        }
      });
    });
    Toggle();
  };

  return (
    <>
      <Modal show={modal} close={Toggle} title='Edit User' onSubmit={onSubmit}>
        <div className='editing_field'>
          <label>Name:</label>
          <input
            type='text'
            value={userObject?.name}
            onChange={(e) => handleChangeUser(e, 'name')}
          />
        </div>

        <div className='editing_field'>
          <label>Role:</label>
          <input
            type='text'
            value={userObject?.role}
            onChange={(e) => handleChangeUser(e, 'role')}
          />
        </div>

        <div className='editing_field'>
          <label>Email:</label>
          <input
            type='email'
            value={userObject?.email}
            onChange={(e) => handleChangeUser(e, 'email')}
          />
        </div>
      </Modal>
      <tr>
        <td>
          <input
            type='checkbox'
            id='select'
            name='select'
            value='select'
            onChange={(e) => selectUser(e)}
            checked={getSelectedStatus()}
          />
        </td>
        <td
          dangerouslySetInnerHTML={{
            __html: makeBold(user?.name, searchKeyword),
          }}
        />
        <td
          dangerouslySetInnerHTML={{
            __html: makeBold(user?.email, searchKeyword),
          }}
        />
        <td
          dangerouslySetInnerHTML={{
            __html: makeBold(user?.role, searchKeyword),
          }}
        />
        <td className='actions'>
          <div className='edit-icon' onClick={Toggle}>
            <img src={EditIcon} alt='edit-icon' />
          </div>
          <div
            className='delete-icon'
            onClick={() => {
              deleteUserById(user?.id);
            }}
          >
            <img src={DeleteIcon} alt='delete-icon' />
          </div>
        </td>
      </tr>
    </>
  );
}

export default UserTile;
