import * as React from 'react';
const squareCss = require('../ui/css/square.css');
export interface SquareProps{
    handleClick(): void,
    handleMouseEnter(): void,
    text: string,
}

export class Square extends React.Component<SquareProps> {
    constructor(props: SquareProps) {
        super(props);
    }

    render() {
        return (
            <button onClick={this.props.handleClick.bind(this)}
                    onMouseEnter={this.props.handleMouseEnter.bind(this)}
                    className={squareCss.button}>
                    {this.props.text}
            </button>
        )
    }
}