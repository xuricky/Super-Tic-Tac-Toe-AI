import { Action } from '../common/action';

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

export class MCTS {
    static step: number = 1;
    private isAITurn: boolean;
    private hasChildren: boolean;
    private children: MCTS[];
    private parent: MCTS;
    private move: number[][];
    private evaluation: number;
    private position: Position;
    constructor(parent: MCTS, isAITurn: boolean, move: number[][]) {
        this.parent = parent;
        this.isAITurn = isAITurn;
        this.move = move;
        this.hasChildren = false;
        this.children = [];
        this.evaluation = this._evaluate();
        this.position = this._getPosition();
    }

    private _getAction(): Action {
        return Action.getInstance();
    }
    
    private _evaluate(): number {
        let evaluation = 0;
        return evaluation = 0;
    }

    private _getPosition(): Position {
        let position = Position.lave;
        return position;
    }

    private _getStrategy() : Strategy{
        if (MCTS.step <= LimitCondition.optimizationSteps) {
            return Strategy.random;
        }
        return Strategy.minimax;
    }

    private _createChild() {
        this.hasChildren = true;
        let strategy = this._getStrategy();
        let action = this._getAction();
    }
}
