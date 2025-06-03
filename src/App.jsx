import { useEffect, useState } from "react";
import useMode from "./Store/ModeStore";
import { FaEye } from "react-icons/fa";
import useView from "./Store/ViewsStore";

const App = () => {
  const { mode, setMode } = useMode();
  const { viewCount, increeseCount } = useView();

  useEffect(() => {
    increeseCount();
  }, []);

  const [users, setUsers] = useState([
    { id: 1, username: "Thecodefather" },
    { id: 2, username: "Gulnara" },
    { id: 3, username: "Fatima" },
    { id: 4, username: "Yaqut" },
    { id: 5, username: "Ferid" },
    { id: 6, username: "Umid" },
    { id: 7, username: "Turkana" },
    { id: 8, username: "Zemfira" },
  ]);
  const [newUser, setNewUser] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleOnChange = (e) => {
    setNewUser(e.target.value);
  };
  const handleAddUser = () => {
    if (newUser.trim() === "") return;
    const newUserObject = {
      id: users.length + 1,
      username: newUser,
    };
    setUsers([...users, newUserObject]);
    setNewUser("");
  };

  const handleSearchChange = (e) => {
    setSearchUser(e.target.value.toLowerCase());
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchUser)
  );

  return (
    <div className={mode === "light" ? "bg-[#212121]" : "bg-white"}>
      <div className="container mx-auto px-4 h-[100vh]">
        <h1 className="text-center text-[35px] font-bold text-[#DB7093]">
          Users
        </h1>

        <div className="flex items-center gap-3 mt-[30px]">
          <button
            onClick={setMode}
            className="bg-gray-100 p-2 border-1 w-[70px] border-gray-300 rounded-md cursor-pointer"
          >
            {mode}
          </button>
          <div className="flex gap-2 items-center justify-center bg-gray-100 p-2 border-1 w-[70px] border-gray-300 rounded-md ">
            <FaEye className="text-[25px] text-[#DB7093]" />
            {viewCount}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 justify-between my-[30px]">
          <div className="flex gap-3">
            <input
              onChange={(e) => handleOnChange(e)}
              type="text"
              value={newUser}
              placeholder="Add new users"
              className="border-none outline-none bg-[#e4dfdfb9] p-3 rounded-md w-[300px]"
            />
            <button
              onClick={handleAddUser}
              className="w-[100px] p-3 bg-[#DB7093] duration-300 hover:bg-pink-600 rounded-md text-white cursor-pointer"
            >
              Add
            </button>
          </div>
          <div className="flex justify-items-start md:justify-end">
            <input
              type="search"
              placeholder="Search"
              value={searchUser}
              onChange={handleSearchChange}
              className="border-none outline-none bg-[#e4dfdfb9] p-3 rounded-md w-[300px]"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-[30px] duration-500">
          {filteredUsers.map((user) => {
            return (
              <div
                onClick={() => handleUserClick(user)}
                key={user.id}
                className="border-1 border-gray-200 rounded-md duration-300 hover:bg-[#f5f5f5] cursor-pointer"
              >
                <h1
                  className={
                    mode === "light"
                      ? "text-white p-4 hover:text-[#212121]"
                      : "text-black p-4"
                  }
                >
                  {user.username}
                </h1>
              </div>
            );
          })}
        </div>
        {showModal && selectedUser && (
          <div className="fixed inset-0 flex items-center justify-center bg-[#a79fa2] bg-opacity-70 z-50">
            <div className="bg-white rounded-lg p-6 w-[300px] text-center shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 text-[#DB7093]">
                User Info
              </h2>
              <p className="text-lg">
                Username: <strong>{selectedUser.username}</strong>
              </p>
              <button
                onClick={handleCloseModal}
                className="mt-6 px-4 py-2 bg-[#DB7093] text-white rounded-md duration-300 hover:bg-pink-600"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
