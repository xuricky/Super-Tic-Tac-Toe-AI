import * as React from 'react';
import { Square } from './square';
const TicTacToeCss = require('../ui/css/tic-tac-toe.css');
export interface TicTacToeProps {
    handleSquareClick(i: number): void,
    handleSquareMouseEnter(i: number): void,
}

export class TicTacToe extends React.Component<TicTacToeProps> {
    constructor(props: TicTacToeProps) {
        super(props);
    }

    render() {
        const nums = 9;
        let squares = Array(nums).map((n, i) => this._renderSquare(i));
        return (
            <div className={TicTacToeCss.board}>
                <div className={TicTacToeCss['board-row']}>
                <div>
                    {this._renderSquare(0)}
                    {this._renderSquare(1)}
                    {this._renderSquare(2)}
                    </div>
                </div>
                <div className={TicTacToeCss['board-row']}>
                    {this._renderSquare(3)}
                    {this._renderSquare(4)}
                    {this._renderSquare(5)}
                </div>
                <div className={TicTacToeCss['board-row']}>
                    {this._renderSquare(6)}
                    {this._renderSquare(7)}
                    {this._renderSquare(8)}
                </div>
            </div>
        )
    }

    private _renderSquare(index: number) {
        return <Square handleClick={() => this.props.handleSquareClick(index)}
                       handleMouseEnter={() => this.props.handleSquareMouseEnter(index)}></Square>   
    }
}