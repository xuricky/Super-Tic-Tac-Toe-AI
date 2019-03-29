import * as React from 'react';
import { Interface } from 'readline';
const GameInfoCss = require('../ui/css/gameinfo.css');

export enum Model {
    HUMAN_AI,
    HUMAN_HUMAN
}
export interface GameInfoProps {
    handleGameStart(): void;
    handleGameOver(): void;
    handleBack(): void;
    changeModel(): void;
    gameStart: boolean;
    ModelIsHumanVsAi: boolean;
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
                <button onClick={this.props.changeModel}
                        disabled={!this.props.gameStart}>
                    {this.props.ModelIsHumanVsAi ? '人机' : '人人'}
                </button>
            </div>
        )
    }
}