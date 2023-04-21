const log = require("debug")("prompt.js:index");

const { readFileSync, existsSync } = require("fs");
const { join } = require("path");
const ejs = require("ejs");
const TOML = require("toml");

let config = {
    promptDir: join(__dirname, "prompts")
};

class PromptError extends Error {
    constructor(message) {
        super(message);
        this.name = "PromptError";
    }
}

function configure(options = null) {
    if (!options) options = {};
    config = options;
}

function parse(path, variables = null) {
    const content = readFileSync(path, "utf8").trim();
    return ejs.render(content, variables);
}

function load(promptName, variables) {
    let path;

    path = join(config.promptDir, `${promptName}.txt`);
    if (existsSync(path)) {
        return parse(path, variables);
    }

    path = join(config.promptDir, `${promptName}.toml`);
    if (existsSync(path)) {
        const data = parse(path, variables);
        return TOML.parse(data).messages;
    }

    throw new PromptError(`Prompt "${join(config.promptDir, promptName)}.{txt,toml}" not found`);
}

module.exports = { load, configure };
