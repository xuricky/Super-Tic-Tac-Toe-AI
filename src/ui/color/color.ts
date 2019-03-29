
export namespace ColorOption {
    export enum ColorEnum {
        red = 'red',
        green = 'green',
        blue = 'blue',
        pink = 'pink',
        white = 'white',
        black = 'black',
        orange = 'orange',
        wheat = 'wheat',
        greenyellow = 'greenyellow',
        grey = 'grey',
    }

    export const XFillColor = ColorEnum.red;
    export const OFillColor = ColorEnum.orange;
    export const backColor = ColorEnum.blue;
    export const lastMoveColor = ColorEnum.pink;
    export const AIColor = ColorEnum.orange;
    export const HumanColor = ColorEnum.red;
    export const defaultColor = ColorEnum.black;
    export const backgroundColor = ColorEnum.grey;
}
