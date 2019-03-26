import { LocalBoard, sucArr, Score, Type } from './localboard';

export enum GlobalScore {
    ai_win = 100,
    ai_almostwin = 90,
    draw = 0,
    human_almostwin = -90,
    human_win = -100,
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
    private global: LocalBoard[];
    private historyData: any[];
    private globalData: GlobalData;
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
            AIIsNext: true,
            data,
            masks: Array(9).fill(false)
        };
        this.historyData = [];
    }

    public initStartData() {
        this.globalData.masks = Array(9).fill(true);
    }

    public clearData() {
        this.global = this._init();
        this._initGlobalData();
    }

    private stashHistoryData() {
        let history = [];
        for (let local of this.global) {
            history.push(local.deepCloneVirtualData()); 
        }
        this.historyData.push(history);
    }

    public pushData(id: number[], isAI: boolean) {
        this.stashHistoryData();
        this.global[id[0]].pushData(id[1], isAI);
        this.globalData.AIIsNext = !this.globalData.AIIsNext;
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
            this.clearData();
        } else if (step < len) {
            let dis = len - step;
            let leftDatas = this.historyData.splice(step, len);
            for (let i = 0; i < this.global.length; i++) {
                let local = this.global[i];
                local.setVirtualData(leftDatas[0][i]);
            }
            this._transferGlobalToGlobalData();
            dis % 2 === 1 && (this.globalData.AIIsNext = !this.globalData.AIIsNext);
        }
    }

    public popGlobal() {
        this.resetGlobal(this.historyData.length - 2);
    }

    public getStateAndScore(){
        
    }
}