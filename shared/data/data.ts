export interface Key {
    classes: string;
    off?: string;
    on?: string;
    label?: string;
}

export const keys: Key[][] = [
    [
        { classes: "symbol", off: "`", on: "~" },
        { classes: "symbol", off: "1", on: "!" },
        { classes: "symbol", off: "2", on: "@" },
        { classes: "symbol", off: "3", on: "#" },
        { classes: "symbol", off: "4", on: "$" },
        { classes: "symbol", off: "5", on: "%" },
        { classes: "symbol", off: "6", on: "^" },
        { classes: "symbol", off: "7", on: "&" },
        { classes: "symbol", off: "8", on: "*" },
        { classes: "symbol", off: "9", on: "(" },
        { classes: "symbol", off: "0", on: ")" },
        { classes: "symbol", off: "-", on: "_" },
        { classes: "symbol", off: "=", on: "+" },
        { classes: "delete", label: "⌫" },
    ],
    [
        { classes: "letter", off: "q" },
        { classes: "letter", off: "w" },
        { classes: "letter", off: "e" },
        { classes: "letter", off: "r" },
        { classes: "letter", off: "t" },
        { classes: "letter", off: "y" },
        { classes: "letter", off: "u" },
        { classes: "letter", off: "i" },
        { classes: "letter", off: "o" },
        { classes: "letter", off: "p" },
        { classes: "symbol", off: "[", on: "{" },
        { classes: "symbol", off: "]", on: "}" },
        { classes: "symbol", off: "\\", on: "|" },
        { classes: "cancel", label: "cancel" },
    ],
    [
        { classes: "capslock", label: "caps lock" },
        { classes: "letter", off: "a" },
        { classes: "letter", off: "s" },
        { classes: "letter", off: "d" },
        { classes: "letter", off: "f" },
        { classes: "letter", off: "g" },
        { classes: "letter", off: "h" },
        { classes: "letter", off: "j" },
        { classes: "letter", off: "k" },
        { classes: "letter", off: "l" },
        { classes: "symbol", off: ";", on: ":" },
        { classes: "symbol", off: "'", on: '"' },
        { classes: "enter", label: "enter" },
    ],
    [
        { classes: "numlock", label: ".?123" },
        { classes: "letter", off: "z" },
        { classes: "letter", off: "x" },
        { classes: "letter", off: "c" },
        { classes: "letter", off: "v" },
        { classes: "letter", off: "b" },
        { classes: "letter", off: "n" },
        { classes: "letter", off: "m" },
        { classes: "symbol", off: ",", on: "<" },
        { classes: "symbol", off: ".", on: ">" },
        { classes: "symbol", off: "/", on: "?" },
        { classes: "print", label: "print" },
    ],
    [
        { classes: "space", label: " " },
    ],
];