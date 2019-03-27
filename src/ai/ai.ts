import { Action } from '../common/action';
import {  GlobalBoard, GlobalScore } from '../common/globalboard';
import { State } from '../common/localboard';

enum Position {
    center,
    corner,
    lave,
}

enum Strategy {
    random,
    minimax,
}

namespace LimitCondition {
    export const optimizationSteps = 10;
    export const cycle = 0.5;
    export const depth = 5;
}

enum Evaluation {
    global_all_success = 100,
    global_associate_success = 40,
    global_one_success = 10,
    lcoal_associate_success = 4  
}

export class AI {
    static step = 1;
    private isAITurn: boolean;
    private move: number[];
    private position: Position;
    private bestMove: number[];
    constructor(isAITurn: boolean, move: number[]) {
        this.isAITurn = isAITurn;
        this.move = move;
        this.bestMove = null;
    }

    private _getGlobalBoard(): GlobalBoard {
        return GlobalBoard.getInstance();
    }
    
    private _getPosition(id: number[]): Position {
        let position = id[1] === 4 ? Position.center : [0, 2, 6, 8].some(n => n === id[1]) ? Position.corner : Position.lave;
        return position;
    }

    private _getStrategy() : Strategy{
        if (AI.step <= LimitCondition.optimizationSteps) {
            return Strategy.random;
        }
        return Strategy.minimax;
    }

    public getScore(id: number[], isAITurn: boolean, depth: number = 1): GlobalScore {
        let gb = this._getGlobalBoard();
        let state = gb.getState();
        let score = gb.getScore();
        if (state !== State.active || depth > LimitCondition.depth) {
            return score;
        }
        
        let availablePos = this._shuffle(gb.getAvailablePos(id));
        
        if (isAITurn) {
            let maxScore = GlobalScore.human_win;
            for (let i = 0; i < availablePos.length; i++) {
                let pos = availablePos[i];
                gb.pushData(id, !isAITurn);
                let score1 = this.getScore(pos, !isAITurn, depth + 1);
                gb.deleteLastData();
                if (score1 > maxScore) {
                    maxScore = score1;
                    if (depth === 1) {
                        this.bestMove = pos;
                    }
                    // console.log(`maxscore--${maxScore}  pos--${pos}  depth--${depth}`);
                }
            }
            return maxScore;
        } else {
            let minScore = GlobalScore.ai_win;
            for (let i = 0; i < availablePos.length; i++) {
                let pos = availablePos[i];
                gb.pushData(id, !isAITurn);
                let score2 = this.getScore(pos, !isAITurn, depth + 1);
                gb.deleteLastData();
                if (score2 < minScore) {
                    minScore = score2;
                    if (depth === 1) {
                        this.bestMove = pos;
                    }
                    // console.log(`minscore--${minScore}  pos--${pos}  depth--${depth}`);
                }
            }
            return minScore;
        }
    }

    public findBestMove(id: number[], isAITurn: boolean, depth: number = 1) {
        let gb = this._getGlobalBoard();
        let state = gb.getState();
        let score = gb.getScore();
        if (state !== State.active || depth >= LimitCondition.depth) {
            return score;
        }
        let availablePos = this._shuffle(gb.getAvailablePos(id));
        if (isAITurn) {
            let minScore =  GlobalScore.ai_win;
            for (let i = 0; i < availablePos.length; i++) {
                let pos = availablePos[i];
                gb.pushData(id, !isAITurn);
                let score = this.findBestMove(pos, !isAITurn, depth + 1);
                gb.deleteLastData();
                if (score < minScore) {
                    minScore = score;
                }
            }
            score += minScore;
        } else {
            let maxScore = GlobalScore.human_win;
            for (let i = 0; i < availablePos.length; i++) {
                let pos = availablePos[i];
                gb.pushData(id, !isAITurn);
                let score = this.findBestMove(pos, !isAITurn, depth + 1);
                gb.deleteLastData();
                if (score > maxScore) {
                    maxScore = score;
                    console.log(`maxscore is ${score}, and depth is ${depth}`);
                    if (depth === 1) {
                        this.bestMove = pos;
                    }
                }
            }
            score += maxScore;
        }
        return score;
    }

    private test(id: number[], isAITurn: boolean) {
        let gb = this._getGlobalBoard();
        let availablePos = this._shuffle(gb.getAvailablePos(id));
        if (isAITurn) {
            let minScore = GlobalScore.ai_win;
            // let position;
            for (let i = 0; i < availablePos.length; i++) {
                let pos = availablePos[i];
                gb.pushData(pos, !isAITurn);
                let score = gb.getScore();
                gb.deleteLastData();
                if (score < minScore) {
                    minScore = score;
                    // position = this._getPosition(pos);
                    this.bestMove = pos;
                }
            }
        } else {
            let maxScore = GlobalScore.human_win;
            // let position;
            for (let i = 0; i < availablePos.length; i++) {
                let pos = availablePos[i];
                gb.pushData(pos, !isAITurn);
                let score = gb.getScore();
                gb.deleteLastData();
                if (score > maxScore) {
                    maxScore = score;
                    // position = this._getPosition(pos);
                    this.bestMove = pos;
                }
            }
        }
    }

    private _shuffle(arr: any[]) {
        for (let i = arr.length, j; i; i--, j = Math.floor(Math.random() * i), [arr[i], arr[j]] = [arr[j], arr[i]]);
        return arr;
    }

    public getBestMove() {
        this.test(this.move, this.isAITurn);
        return this.bestMove;
    }
}
