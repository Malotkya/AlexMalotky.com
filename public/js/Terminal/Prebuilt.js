export const help = (terminal, args) => {
    let output = $("<div>").css("margin-left", "4ch");

    for(const key in terminal.functions) {
        output.append(`${key} - ${terminal.functionDescription[key]}<br/>`);
    }

    terminal.print(output);
}

export const reset = (terminal, args) => {
    terminal.reset();
}

export const exit = (terminal, args) => {
    terminal.println("Good Bie!")
    window.location.replace("/");
}

export const print = (terminal, args) => {
    let string = args.splice(1, args.length-1).join(" ");
    terminal.print($("<div>").html(string));
}

export const about = (terminal, args) => {
    terminal.println("This is an attempt to see what I can create in this environement.");
    terminal.println("I plan to continue to expand the functionality of thie terminal");
    terminal.println("Goals Include:");
    terminal.println("1: Login like functionality")
    terminal.println("2: Saving settings to cookies");
    terminal.println("3: Create a file like system in cookies to allow custom apps");
    terminal.println("4: Create a basic game like snake");
}
