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

enum Evaluation {
    global_all_success = 100,
    global_associate_success = 40,
    global_one_success = 10,
    lcoal_associate_success = 4  
}

export class MCTS {
    static step: number = 1;
    private isAITurn: boolean;
    private hasChildren: boolean;
    private children: MCTS[];
    private parent: MCTS;
    private move: number[];
    private evaluation: number;
    private position: Position;
    constructor(parent: MCTS, isAITurn: boolean, move: number[]) {
        this.parent = parent;
        this.isAITurn = isAITurn;
        this.move = move;
        this.hasChildren = false;
        this.children = [];
        this.evaluation = this._evaluate();
        this.position = this._getPosition();
    }

    private _addChild(MCTSNode: MCTS) {
        this.children.push(MCTSNode);
    }

    private _getAction(): Action {
        return Action.getInstance();
    }
    
    private _evaluate(): number {
        let evaluation = 0;
        let action = this._getAction();
        if (this.isAITurn) {
            let data = action.getActionData().OData;
            
        } else {
            let data = action.getActionData().XData;
        }
        return evaluation = 0;
    }

    private _getPosition(): Position {
        let position = this.move[1] === 4 ? Position.center : [0, 2, 6, 8].some(n => n === this.move[1]) ? Position.corner : Position.lave;
        return position;
    }

    private _getStrategy() : Strategy{
        if (MCTS.step <= LimitCondition.optimizationSteps) {
            return Strategy.random;
        }
        return Strategy.minimax;
    }

    private _createChild() {
        const now = new Date().getTime();
        this.hasChildren = true;
        let strategy = this._getStrategy();
        let action = this._getAction();
        let availablePos = action.getAvailablePos(this.move);
        if (strategy === Strategy.random) {
            
        } else {
            for (let i = 0; i < availablePos.length && new Date().getTime() - now < LimitCondition.cycle * 1000; i++) {
                let MCTSNode = new MCTS(this, !this.isAITurn, this.move);
                this._addChild(MCTSNode);
            }
        }
    }
}
