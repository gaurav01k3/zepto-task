import React, { useEffect, useRef, useState } from "react";
import ChipComponent from "./components/ChipComponent";
import ListOverlayComponent from "./components/ListOverlayComponent";

const ChipInput = () => {
    const [addedUsers, setAddedUsers] = useState([
        { name: "Ava White", email: "ava.white@example.com" },
    ]);
    const [searchQuery, setSearchQuery] = useState("");
    const [showUserList, setShowUserList] = useState(false);
    const [highlightLastEntry, setHighlightLastEntry] = useState(false);

    const overlayRef = useRef(null);

    const addUserToList = (_userData) => {
        setAddedUsers((prev) => [...prev, _userData]);
        setSearchQuery("");
        setShowUserList(false);
    };

    const removeUserFromList = (_userData) => {
        const filterUsers = addedUsers.filter(
            (_user) => _user.email !== _userData.email
        );
        setAddedUsers(filterUsers);
    };

    const handleOnKeyDown = (event) => {
        if (highlightLastEntry) {
            removeUserFromList(addedUsers[addedUsers.length - 1]);
            setHighlightLastEntry(false);
        } else if (
            event.key === "Backspace" &&
            searchQuery === "" &&
            addedUsers.length !== 0
        ) {
            setHighlightLastEntry(true);
        }
    };

    const handleOnChange = (event) => {
        setSearchQuery(event.target.value);
        setHighlightLastEntry(false);
    };

    const handleClick = (event) => {
        if (overlayRef.current && !overlayRef.current.contains(event.target)) {
            setShowUserList(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    return (
        <div className="my-10 pb-28 md:pb-0 h-60 md:w-3/5 w-11/12 mx-auto border-b-2 border-gray-400">
            <div className="border-b-2 py-1 flex border-blue-400 mx-auto flex-wrap">
                {addedUsers.map((_userData, index) => {
                    return (
                        <div key={_userData.email} className="my-2 mr-3">
                            <ChipComponent
                                highlight={
                                    index === addedUsers.length - 1 && highlightLastEntry
                                }
                                removeUserFromList={removeUserFromList}
                                userData={_userData}
                            />
                        </div>
                    );
                })}
                <div className="relative min-w-28 flex-1" ref={overlayRef}>
                    <input
                        placeholder="Add user"
                        onChange={handleOnChange}
                        value={searchQuery}
                        className="p-2 text-sm border-none hover:bg-slate-100 h-full outline-none w-full"
                        onFocus={() => setShowUserList(true)}
                        onKeyDown={handleOnKeyDown}
                    />

                    {showUserList && (
                        <div className="absolute w-max bg-white z-2 md:left-0 right-0">
                            <ListOverlayComponent
                                addUserToList={addUserToList}
                                addedUsers={addedUsers}
                                searchQuery={searchQuery}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChipInput;
