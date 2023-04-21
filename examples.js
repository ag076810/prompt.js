const prompt = require("./index");

const response = prompt.load("test1", { name: "The Maximalist" });
console.log(response);

const messages = prompt.load("test2", {
    chats: [
        { role: "user", content: "Hello, I am a user" },
        { role: "assistant", content: "Hi, how can I help you?" },
    ]
});
console.log(messages);