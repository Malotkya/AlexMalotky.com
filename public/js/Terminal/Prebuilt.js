export const help = (terminal, args) => {
    let output = $("<div>").css("margin-left", "4ch");

    for(const key in terminal.functions) {
        output.append(`${key} - ${terminal.functionDescription[key]}<br/>`);
    }

    terminal.print(output);
}

export const reset = (terminal, args) => {
    terminal.println("Reseting !indow!")
    window.location.reload();
}

export const exit = (terminal, args) => {
    terminal.println("Good Bie!")
    window.close();
}

export const about = (terminal, args) => {
    terminal.println("About info comming soon!");
}

export const print = (terminal, args) => {
    let string = args.splice(1, args.length-1).join(" ");
    terminal.print($("<div>").html(string));
}
