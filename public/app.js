const logoutUser = (data) => {
    pusher.unsubscribe(`presence-${data.groupName}`);
    document.querySelector(".firstSceen").style.display = "flex";
    document.querySelector(".wrapper").style.display = "none";
};

const data = {
    username: "",
    groupName: ""
};

const joinGroup = () => {
    document.querySelector(".firstSceen").style.display = "none";
    document.querySelector(".wrapper").style.display = "block";
    const groupNameInput = document.querySelector(".group_name").value;
    const userNameInput = document.querySelector(".userName").value;
    data.username = userNameInput;
    data.groupName = groupNameInput;
    groupNameInput.innerText = `${groupNameInput}: online users()`;
    sendPusherRequest(creatMessage, data);
};

const creatMessage = (text, username) => {
    var messageClass =
        username === document.querySelector(".userName").value ? "right" : "left";
    // create a new div element
    const newDiv = document.createElement("div");
    const divContent = document.createElement("p");

    // and give it some content
    divContent.innerText = `${username}: ${text}`;
    newDiv.appendChild(divContent);
    newDiv.className = messageClass;
    // add the newly created element and its content into the DOM
    const currentDiv = document.querySelector(".chatbox");
    currentDiv.appendChild(newDiv);
    currentDiv.scrollTo(0, currentDiv.scrollHeight);
};


const sendMessage = () => {
    const textInput = document.querySelector(".usermsg");
    if (!textInput.value) return;
    const message = {
        username: data.username,
        message: textInput.value,
        groupName: data.groupName,
    };
    sendPusherMessage("send-message", message);
    textInput.value = "";
};

// Get the input field
const input = document.querySelector(".usermsg");
input.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.querySelector(".submitmsg").click();
    }
});
const isEmpty = function(str) {
    return (!str || str.length === 0);
}
const isBlank = function(str) {
    return (!str || /^\s*$/.test(str));
};

function validateForm() {
    var x = document.querySelector(".group_name").value;
    var y = document.querySelector(".userName").value;
    if (isEmpty(x) && isBlank(x)) {
        alert("Chat Room must be filled out");
        return false;
    }
    if (isEmpty(y) && isBlank(y)) {
        alert("Name must be filled out");
        return false;
    }
    return joinGroup();
};