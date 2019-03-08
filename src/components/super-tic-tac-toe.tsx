import * as React from 'react';
import { TicTacToe } from './tic-tac-toe';
const SuperTicTacToeCss = require('../ui/css/super-tic-tac-toe.css');

export interface SuperTicTacToeProps {
    
}

export class SuperTicTacToe extends React.Component {

    render() {
        return (
            <div className={SuperTicTacToeCss['global-board']}>
                <div className={SuperTicTacToeCss['local-board']}>
                    {this._renderTicTacToe(0)}
                    {this._renderTicTacToe(1)}
                    {this._renderTicTacToe(2)}
                </div>
                <div className={SuperTicTacToeCss['local-board']}>
                    {this._renderTicTacToe(3)}
                    {this._renderTicTacToe(4)}
                    {this._renderTicTacToe(5)}
                </div>
                <div className={SuperTicTacToeCss['local-board']}>
                    {this._renderTicTacToe(6)}
                    {this._renderTicTacToe(7)}
                    {this._renderTicTacToe(8)}
                </div>
            </div>
        )
    }

    _renderTicTacToe(i: number) {
        return <TicTacToe index={i}></TicTacToe>
    }

    _handleClick() {
        
    }
}

