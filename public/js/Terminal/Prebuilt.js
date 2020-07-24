export const help = (terminal, args) => {
    for(const key in terminal.functions.description) {
        terminal.println(`${key} - ${terminal.functions.description[key]}`);
    }
}

export const reset = (terminal, args) => {
    terminal.reset();
}

export const exit = (terminal, args) => {
    terminal.println("Good Bie!")
    terminal.close();
}

export const about = (terminal, args) => {
    terminal.println("This is an attempt to see what I can create in this environement.");
    terminal.println("I plan to continue to expand the functionality of thie terminal");
    terminal.println("Goals Include:");
    terminal.println("[*]: Change how the terminal is displayed")
    terminal.println("[ ]: Login like functionality")
    terminal.println("[ ]: Saving settings to cookies");
    terminal.println("[ ]: Create a file like system in cookies to allow custom apps");
    terminal.println("[ ]: Create a basic game like snake");
}
