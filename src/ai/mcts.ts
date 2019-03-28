import { GlobalBoard } from '../common/globalboard';
import { State } from '../common/localboard';

export class MctsNode {
    // 父节点
    public parent: MctsNode;
    // 是不是AI下
    public isAITurn: boolean;
    // 移动点坐标
    public move: number[];
    // 胜利次数
    public hits: number = 0;
    // 失败次数
    public misses: number = 0;
    // 尝试次数
    public totaltrials: number = 0;
    // 未探索节点
    public unexplored: number = 0;
    // 子节点
    public children: MctsNode[] = null;
    
    constructor(parent: MctsNode, isAITurn: boolean, move: number[]) {
        this.parent = parent;
        this.isAITurn = isAITurn;
        this.move = move;
    }

    // 获取最佳节点的移动点坐标
    public getBestMove(time: number = 0.5) {
        const now = new Date().getTime();
        while(new Date().getTime() - now < 1e3 * time) {
            for (let i = 0; i < 1000; i++) {
                this.createChildren();
            }
            console.log((new Date().getTime() - now) / 1000);
        }
        let node = this._findMostTriedChild();
        // console.log(this);
        return node.move;
    }

    // 获取全局棋盘
    public getGB() {
        return GlobalBoard.getInstance();
    }

    // 创建子节点
    public createChildren() {
        let gb = this.getGB();
        let availablePos = gb.getAvailablePos(this.move);
        if (!this.children) {
            this.children = [];
            for (let pos of availablePos) {
                let newMctsNode = new MctsNode(this, !this.isAITurn, pos);
                this.children.push(newMctsNode);
            }
            this.unexplored = this.children.length;
        }
        if (this.unexplored > 0) {
            this.unexplored--;
            let unexploredChildren = this._shuffle(this.children.filter((node) => node.totaltrials === 0));
            let node = unexploredChildren[0];
            let state = this._MCTSSimulate(node);
            this._updateInfo(node, state)
        } else {
            this.children = this._shuffle(this.children).sort((c1, c2) => this._getNodePotential(c2) - this._getNodePotential(c1));
            let betterPotentialChild = this.children[0];
            gb.pushData(betterPotentialChild.move, betterPotentialChild.isAITurn);
            betterPotentialChild.createChildren();
            gb.deleteLastData();
        }
    }

    // 打乱数组顺序
    private _shuffle(arr: any[]) {
        for (let i = arr.length, j; i; i--, j = Math.floor(Math.random() * i), arr.length - 1, [arr[i], arr[j]] = [arr[j], arr[i]]);
        return arr;
    }

    // 模拟胜负
    private _MCTSSimulate(node: MctsNode): State {
        let gb = this.getGB();
        let isAI = node.isAITurn;
        let move = node.move;
        gb.pushData(move, isAI);
        let state = gb.getState();
        if (gb.getState() === State.active) {
            let availablePos = gb.getAvailablePos(move);
            let pos = this._shuffle(availablePos)[0];
            let newNode = new MctsNode(node, !isAI, pos);
            state = this._MCTSSimulate(newNode);
        }
        gb.deleteLastData();
        return state;
    }

    // 更新节点以及所有父节点信息
    private _updateInfo(node: MctsNode, state: State): void{
        let isAI = node.isAITurn;
        if (state === State.ai_win) {
            if (isAI) 
                node.hits++;
            else 
                node.misses++;
        } else if (state === State.human_win) {
            if (!isAI)
                node.hits++;
            else 
                node.misses++;
        }
        node.totaltrials++;
        if (node.parent) 
            node.parent._updateInfo(node.parent, state);
    }

    // 获取每个节点的性价比
    private _getNodePotential(node: MctsNode) {
        // let w = node.isAITurn ? node.hits - node.misses : node.misses - node.hits;
        let w = node.hits - node.misses;
        let n = node.totaltrials;
        let t = node.parent.totaltrials;
        const c = Math.sqrt(2);
        return w / n + c * Math.sqrt(Math.log(t) / n);
    }
    

    // 找到尝试次数最多的点，也是最佳点
    private _findMostTriedChild() {
        if (!this.children) 
            return null;
        else 
            return this.children.sort((c1, c2) => c2.totaltrials - c1.totaltrials)[0];
    }
}