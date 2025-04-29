const socket = io("/");

let receiver = "baat-cheet";

const onlineUsersParent = document.querySelector("#online-users");
const chattingWith = document.querySelector("#chatting-with");
function usersBlockGenerator(onlineUsers) {
  onlineUsersParent.innerHTML = "";
  for (const user of onlineUsers) {
    const nameNode = genUsername(user.username);
    const outerNode = genUserBlock(user.userId);
    outerNode.appendChild(nameNode);
    outerNode.addEventListener("click", () => {
      receiver = user.userId;
      chattingWith.innerText = `You are chatting with ${user.username.toLowerCase()}`;
    });
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

const messageBox = document.querySelector("#all-messages");
const messageForm = document.querySelector("#message-form");
const messageInput = messageForm.querySelector("textarea");

const genMessage = (message, pos) => {
  const newMessage = document.createElement("div");
  newMessage.classList.add(
    "bg-white",
    "text-sm",
    "text-black",
    "p-1",
    "rounded-sm",
    "max-w-[50%]",
    "w-fit",
    "max-h-18",
    "h-fit",
    `self-${pos}`
  );
  newMessage.innerText = message.trim();
  messageBox.appendChild(newMessage);
};

messageForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  genMessage(messageInput.value.trim(), "end");
  socket.emit("private_message", {
    toUserId: receiver,
    message: messageInput.value.trim()
  });
  messageInput.value = "";
});

socket.on("get_online_users", (usersOnline) => {
  usersOnline = usersOnline.filter((user) => user.id !== socket.id);
  usersBlockGenerator(usersOnline);
});

socket.on("already_online", () => {
  const alertBoxes = document.querySelectorAll(".alerts");
  alertBoxes.forEach((alertBox) => {
    alertBox.classList.remove("hidden");
    alertBox.classList.add("fixed");
  });
});

socket.on("private_message", (data) => {
  receiver === data.fromUserId ? genMessage(data.message, "start") : "";
});
