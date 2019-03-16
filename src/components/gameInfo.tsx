import * as React from 'react';
import { Interface } from 'readline';
const GameInfoCss = require('../ui/css/gameinfo.css');

export interface GameInfoProps {
    handleGameStart(): void;
    handleGameOver(): void;
    handleBack(): void;
}

export class GameInfo extends React.Component<GameInfoProps> {
    constructor(props: GameInfoProps) {
        super(props);
    }

    render() {
        return (
            <div className={GameInfoCss.gameinfo}>
                <button onClick={this.props.handleGameStart}>
                    开始
                </button>
                <button onClick={this.props.handleGameOver}>
                    结束
                </button>
                <button onClick={this.props.handleBack}>
                    悔棋
                </button>
            </div>
        )
    }
}