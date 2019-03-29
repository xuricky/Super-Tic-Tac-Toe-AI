import * as React from 'react';
import { Interface } from 'readline';
import { State } from '../common/localboard';
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
    winner: State
}

export class GameInfo extends React.Component<GameInfoProps> {
    constructor(props: GameInfoProps) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className={GameInfoCss.gameinfo}>
                    <button onClick={this.props.gameStart ? this.props.handleGameStart : this.props.handleGameOver}>
                        {this.props.gameStart ? '开始' : '结束'}
                    </button>
                    <button onClick={this.props.handleBack}
                            disabled={this.props.winner !== null}>
                        悔棋
                    </button>
                    <button onClick={this.props.changeModel}
                            disabled={!this.props.gameStart}>
                        {this.props.ModelIsHumanVsAi ? '人机' : '人人'}
                    </button>
                </div>
                <div className={GameInfoCss.gameinfo}>
                    {this.props.winner === State.ai_win? 'GAME OVER, WINNER IS AI!' 
                    : this.props.winner === State.human_win ? 'Game Over, WINNER IS HUMAN!'
                    : this.props.winner === State.draw ? '平局'
                    : null}
                </div>
            </div>
        )
    }
}