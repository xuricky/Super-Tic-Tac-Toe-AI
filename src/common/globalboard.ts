import { LocalBoard, sucArr, Score, Type, State } from './localboard';

export enum GlobalScore {
    ai_win = Number.MAX_SAFE_INTEGER,
    ai_almostwin = 90,
    draw = 0,
    human_almostwin = -90,
    human_win = Number.MIN_SAFE_INTEGER,
}

interface GlobalData {
    AIIsNext: boolean,
    data: number[][],
    masks: boolean[];
}

export class GlobalBoard {
    static INSTANCE: GlobalBoard = new GlobalBoard();
    static getInstance() {
        return this.INSTANCE;
    }
    private multiple: number = 2;
    private global: LocalBoard[];
    private historyData: any[];
    private globalData: GlobalData;
    private score: GlobalScore;
    private state: State;
    constructor() {
        this.clearData();
    }

    private _init() {
        let global = [];
        for (let i = 0; i < 9; i++) {
            let local = new LocalBoard(i);
            global.push(local);
        }
        return global;
    }

    private _initGlobalData() {
        let data = [];
        for (let local of this.global) {
            data.push(local.getVirtualData().data);
        }
        this.globalData = {
            AIIsNext: false,
            data,
            masks: Array(9).fill(true)
        };
        this.historyData = [];
        this.score = null;
        this.state = null;
    }

    public initStartData() {
        this.globalData.masks = Array(9).fill(false);
    }

    public clearData() {
        this.global = this._init();
        this._initGlobalData();
    }

    public getGlobalData() {
        return this.globalData;
    }

    public setGlobalData(globalData: GlobalData) {
        this.globalData = globalData;
    }

    public getGlobal() {
        return this.global;
    }

    public getScore() {
        return this.score;
    }

    public getState() {
        return this.state;
    }

    private stashHistoryData() {
        let global = [];
        let globalData = JSON.parse(JSON.stringify(this.globalData));
        for (let local of this.global) {
            global.push(local.deepCloneVirtualData()); 
        }
        let score = this.score;
        let state = this.state;
        this.historyData.push({global, globalData, score, state});
    }

    public pushData(id: number[], isAI: boolean) {
        this.stashHistoryData();
        this.global[id[0]].pushData(id[1], isAI);
        this.globalData.AIIsNext = !this.globalData.AIIsNext;
        this._transferGlobalToGlobalData();
        this._handleNextStepData(id);
        let res = this.getStateAndScore();
        this.score = res.score;
        this.state = res.state;
        // console.log(this.getStateAndScore().score);
        // console.log(this.getAvailablePos(id));
    }

    private _handleNextStepData(id: number[]) {
        let local = this.global[id[1]];
        if (local.getVirtualData().isActive) {
            this.globalData.masks = this.globalData.masks.map(((mask, i) => i !== id[1] && (mask = true)));
        }
    }

    private _transferGlobalToGlobalData() {
        let data = [];
        let masks = [];
        for (let local of this.global) {
            data.push(local.getVirtualData().data);
            masks.push(!local.getVirtualData().isActive);
        }
        this.globalData.data = data;
        this.globalData.masks = masks;
    }

    /**
     * @description 悔棋，返回第step步
     * @param step 步数
     */
    public resetGlobal(step: number) {
        let len = this.historyData.length;
        if (len <= 0) {
            this.initStartData();
        } else if (step < len) {
            let leftDatas = this.historyData.splice(step, len);
            for (let i = 0; i < this.global.length; i++) {
                let local = this.global[i];
                local.setVirtualData(leftDatas[0].global[i]);
            }
            this.setGlobalData(leftDatas[0].globalData);
            this.score = leftDatas[0].score;
            this.state = leftDatas[0].state;
        }
    }

    public deleteLastData() {
        this.resetGlobal(this.historyData.length - 1);
    }

    /**
     * @description 悔棋，默认退两步
     */
    public popGlobal() {
        this.resetGlobal(this.historyData.length - 2);
    }

    public getStateAndScore(): {state: State, score: GlobalScore} {
        let state = State.active;
        let score = 0;
        let notDraw = false;
        for (let arr of sucArr) {
            let locals = [this.global[arr[0]], this.global[arr[1]], this.global[arr[2]]];
            if (locals.find(local => local.getVirtualData().state === State.draw) ||
                locals.some(local => local.getVirtualData().state === State.ai_win && 
                locals.some(local => local.getVirtualData().state === State.human_win))) {
                continue;
            } else if (locals.every(local => local.getVirtualData().state === State.ai_win)) {
                notDraw = true;
                state = State.ai_win;
                score = GlobalScore.ai_win;
                break;
            } else if (locals.every(local => local.getVirtualData().state === State.human_win)) {
                notDraw = true;
                state = State.human_win;
                score = GlobalScore.human_win;
                break;
            } else {
                notDraw = true;
                let scoreArr = locals.map(local => local.getVirtualData().score);
                let scores = scoreArr.reduce((pre, cur) => pre + cur, 0);
                if (scoreArr.every(s => s > 0) || scoreArr.every(s => s < 0)) scores *= this.multiple;
                score += scores;
            }
        }
        if (!notDraw) {
            state = State.draw;
            score = GlobalScore.draw;
        }
        return {
            state,
            score
        }
    }

    public getAvailablePos(id: number[]) {
        let availablePos: number[][] = [];
        let local = this.global[id[1]];
        if (local.getVirtualData().isActive) {
            local.getVirtualData().data.forEach((n, index) => {
                n === null && availablePos.push([id[1], index]);
            });
        } else {
            for (let i = 0; i < this.global.length; i++) {
                let local = this.global[i];
                if (local.getVirtualData().isActive) {
                    local.getVirtualData().data.forEach((n, index) => {
                        n === null && availablePos.push([i, index]);
                    });
                }
            }
        }
        return availablePos;
    }
}