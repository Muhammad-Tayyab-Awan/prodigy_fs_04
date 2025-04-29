const socket = io("/");

function usersBlockGenerator(onlineUsers) {
  const onlineUsersParent = document.querySelector("#online-users");
  onlineUsersParent.innerHTML = "";
  for (const user of onlineUsers) {
    const nameNode = genUsername(user.username);
    const outerNode = genUserBlock(user.userId);
    outerNode.appendChild(nameNode);
    onlineUsersParent.appendChild(outerNode);
  }
}
const genUserBlock = (userId) => {
  const userBlock = document.createElement("div");
  userBlock.classList.add(
    "p-2",
    "bg-white",
    "w-full",
    "rounded-md",
    "cursor-pointer"
  );
  userBlock.id = userId;
  return userBlock;
};

const genUsername = (username) => {
  const userName = document.createElement("h2");
  userName.classList.add("text-base", "mx-auto");
  userName.innerText = username;
  return userName;
};

socket.on("get_online_users", (usersOnline) => {
  usersOnline = usersOnline.filter((user) => user.id !== socket.id);
  console.log(usersOnline);
  usersBlockGenerator(usersOnline);
});

socket.on("already_online", () => {
  const alertBoxes = document.querySelectorAll(".alerts");
  alertBoxes.forEach((alertBox) => {
    alertBox.classList.remove("hidden");
    alertBox.classList.add("fixed");
  });
});
