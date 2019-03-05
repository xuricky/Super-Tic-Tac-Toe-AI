import * as React from 'react';

export interface SquareProps{
    index: number,
    handleClick(): void,
}

export class Square extends React.Component<SquareProps> {
    constructor(props: SquareProps) {
        super(props);
    }

    render() {
        return <div onClick={this.props.handleClick.bind(this)}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave} />
    }

    handleMouseEnter() {

    }

    handleMouseLeave() {
        
    }
}