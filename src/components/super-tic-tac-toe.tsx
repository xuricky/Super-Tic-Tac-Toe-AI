import * as React from 'react';
import { TicTacToe } from './tic-tac-toe';
const SuperTicTacToeCss = require('../ui/css/super-tic-tac-toe.css');
import { Action } from '../common/action';

export interface SuperTicTacToeProps {
    [propname: string]: any;
}

export class SuperTicTacToe extends React.Component<SuperTicTacToeProps> {
    private action: Action;
    constructor(props: SuperTicTacToeProps) {
        super(props);
        this.action = Action.getInstance();
    }

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
        return (
            <div className={SuperTicTacToeCss.mask}>
                <div className={SuperTicTacToeCss.text}>
                    {i % 2 === 0 ? 'X' : 'O'}
                </div>
                <TicTacToe index={i}></TicTacToe>
            </div>
        )
    }

    _handleClick() {
        
    }
}

