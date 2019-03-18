import * as React from 'react';
import { TicTacToe } from './tic-tac-toe';
const SuperTicTacToeCss = require('../ui/css/super-tic-tac-toe.css');
import { Action } from '../common/action';
import { GameInfo } from './gameInfo';

interface SuperTicTacToeProps {
    [propname: string]: any;
}
interface SuperTicTacToeState{
    action: Action;
    gameStart: boolean;
}

export class SuperTicTacToe extends React.Component<SuperTicTacToeProps, SuperTicTacToeState> {
    private action: Action;
    constructor(props: SuperTicTacToeProps) {
        super(props);
        this.action = Action.getInstance();
        this.state= {
            action: this.action,
            gameStart: true
        }
    }

    render() {
        const action = this.state.action;
        return (
            <div>
                <div className={SuperTicTacToeCss.title}>{`Next Turn to ${action.getNextValue()}`}</div>
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
                <GameInfo handleGameStart={() => this._handleGameStart()}
                          handleGameOver={() => this._handleGameOver()}
                          handleBack={() => this._handleBack()}
                          gameStart={this.state.gameStart}></GameInfo>    
            </div>
        )
    }

    _renderTicTacToe(i: number) {
        const action = this.state.action;
        const UIData = action.getUIData();
        return (
            <div className={UIData.masks[i] && !UIData.premasks[i] ? SuperTicTacToeCss.mask : SuperTicTacToeCss.nomask}>
                <div className={SuperTicTacToeCss.text}>
                    {UIData.texts[i]}
                </div>
                <TicTacToe handleSquareClick={(index: number)=> this._handleClick([i, index])}
                            handleSquareMouseEnter={(index: number) => this._handleMouseEnter([i, index])}
                            texts={UIData.squareTexts[i]}>
                </TicTacToe>
            </div>
        )
    }

    _handleClick(id: number[]) {
        // console.log(id);
        let action = this.state.action;
        let uiData = action.getUIData();
        let texts = uiData.squareTexts;
        if (!action.getValueFromID(texts, id)) {
            action.pushActionData(id);
            this.setState({
                action: this.state.action,
            });
        }
    }

    _handleMouseEnter(id: number[]) {
        // console.log(id);
    }

    _handleGameStart(){
        this.action.initStartData();
        this.setState({
            action: this.action,
            gameStart: !this.state.gameStart,
        });
    }

    _handleGameOver() {
        this.action.clearActionData();
        this.setState({
            action: this.action,
            gameStart: !this.state.gameStart,
        });
    }

    _handleBack() {
        let action = this.state.action;
        action.popActionData();
        this.setState({
            action: this.state.action,
        });
    }

    _getValueFromId(arr: any[][], id: number[]) {
        return arr[id[0]][id[1]];
    }
}

