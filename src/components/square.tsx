import * as React from 'react';
const squareCss = require('../ui/css/square.css');
export interface SquareProps{
    index: number,
    handleClick(): void,
}

export class Square extends React.Component<SquareProps> {
    constructor(props: SquareProps) {
        super(props);
    }

    render() {
        return (
            <button onClick={this.props.handleClick.bind(this)}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                    className={squareCss.button}>
                    
            </button>
        )
    }

    handleMouseEnter() {
        console.log('mouseEnter');
    }

    handleMouseLeave() {
        console.log('mouseLeave');
    }
}