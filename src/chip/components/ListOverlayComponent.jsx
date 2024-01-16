import React, { useCallback, useEffect, useState } from "react";
import { USERS_DATA } from "../UserList";
import UserPlaceholder from "../images/user.png";

const ListOverlayComponent = ({
    addUserToList,
    addedUsers,
    searchQuery = "",
}) => {
    const [usersList, setUsersList] = useState([]);

    const isUserAdded = useCallback(
        (email) => {
            return addedUsers.find((_addedUser) => _addedUser.email === email);
        },
        [addedUsers]
    );

    const searchUser = (_userData, searchQuery) => {
        if (searchQuery.length === 0) return true;

        const userName = _userData.name.toLowerCase();
        const userEmail = _userData.email.toLowerCase();

        if (
            userName.includes(searchQuery.toLowerCase()) ||
            userEmail.includes(searchQuery)
        ) {
            return true;
        }

        return false;
    };

    useEffect(() => {
        const listToShow = USERS_DATA.filter(
            (_userData) =>
                !isUserAdded(_userData.email) && searchUser(_userData, searchQuery)
        );

        setUsersList(listToShow);
    }, [searchQuery, addUserToList, isUserAdded]);

    return (
        <div className="border-2 w-max border-gray-400">
            {usersList.length > 0
                ? usersList.map((_user) => {
                    return (
                        <div
                            key={_user.email}
                            className="text-xs md:text-base flex md:space-x-3 space-x-1 md:px-3 py-2 cursor-pointer hover:bg-slate-200"
                            onClick={() => addUserToList(_user)}
                        >
                            <div className="w-5 h-5 rounded-full">
                                <img src={UserPlaceholder} alt="" />
                            </div>
                            <div className="font-semibold">{_user.name}</div>
                            <div>{_user.email}</div>
                        </div>
                    );
                })
                : searchQuery !== "" && (
                    <div className="flex space-x-3 px-3 py-2 cursor-pointer">
                        <div className="font-semibold">
                            No users found with "{searchQuery}"
                        </div>
                    </div>
                )}
        </div>
    );
};

export default ListOverlayComponent;
