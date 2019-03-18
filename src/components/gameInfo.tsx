import * as React from 'react';
import { Interface } from 'readline';
const GameInfoCss = require('../ui/css/gameinfo.css');

export interface GameInfoProps {
    handleGameStart(): void;
    handleGameOver(): void;
    handleBack(): void;
    gameStart: boolean;
}

export class GameInfo extends React.Component<GameInfoProps> {
    constructor(props: GameInfoProps) {
        super(props);
    }

    render() {
        return (
            <div className={GameInfoCss.gameinfo}>
                <button onClick={this.props.gameStart ? this.props.handleGameStart : this.props.handleGameOver}>
                    {this.props.gameStart ? '开始' : '结束'}
                </button>
                <button onClick={this.props.handleBack}>
                    悔棋
                </button>
            </div>
        )
    }
}