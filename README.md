# prompt.js

A simple and flexible node.js prompt loader for OpenAI applications that supports both plain text and TOML formats.



## Features

-   Load prompts from `.txt` and `.toml` files
-   Support for EJS templating for dynamic content
-   Easy configuration of prompt directory



## Installation

```bash
npm install --save @themaximalist/prompt.js
```



## Usage

```javascript
const prompt = require("@themaximalist/prompt.js");

// Configure prompt directory (optional)
prompt.configure({
    promptDir: join(__dirname, "path/to/prompts"),
});

// Load a plain text prompt
// > cat example1.txt
// Hello <%= name %>
const response = prompt.load("example1", { name: "The Maximalist" });
console.log(response); // Hello The Maximalist

// Load a TOML prompt
// > cat example2.toml
// <% for (const chat of chats) { %>
// [[messages]]
// role = "<%= chat.role %>"
// content = """
// <%- chat.content %>
// """
// <% } %>
const messages = prompt.load("example2", {
    chats: [
        { role: "user", content: "Hello, I am a user" },
        { role: "assistant", content: "Hi, how can I help you?" },
    ]
});
console.log(messages); // [{...}, {...}]
```



## API

### configure(options)

Configure the prompt loader with custom options.

- `promptDir`: A string representing the path to the directory containing the prompt files.



### load(promptName, variables)

Load a prompt from a file and return the parsed content.

- `promptName`: A string representing the name of the prompt file (without the file extension).
- `variables`: An object containing variables to be used when parsing the prompt with EJS.



## Error Handling

`PromptError` is an error class specific to this package, used when a prompt file cannot be found.

```javascript
try {
    const message = prompt.load("nonexistent_prompt");
} catch (error) {
    if (error instanceof prompt.PromptError) {
        console.error("Prompt not found:", error.message);
    } else {
        throw error;
    }
}
```



## Author

https://themaximalist.com

https://twitter.com/themaximal1st



## License

This project is released under the [MIT License](https://chat.openai.com/LICENSE).
