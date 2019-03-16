import { ColorOption } from '../ui/color/color';

interface ActionData{
    xIsNext: boolean,
    allData: number[][],
    XData: number[][],
    OData: number[][],
}

interface UIData {
    texts: string[];
    masks: boolean[];
    premasks: boolean[];
}

export class Action {
    // 单例原型
    private static INSTANCE = new Action();
    public static getInstance() {
        return this.INSTANCE;
    }
    // 棋子数据
    private actionData: ActionData;
    // X填充局部棋盘颜色
    private XFillColor: string;
    // O填充局部期盼颜色
    private OFillColor: string;
    // 历史数据
    private historyActionDatas: ActionData[];
    // UI数据
    private uiData: UIData;
    constructor() {
        this._initData();
        this.XFillColor = ColorOption.XFillColor;
        this.OFillColor = ColorOption.OFillColor;
    }
    // 设置X填充颜色
    public setXFillColor(color: string) {
        this.XFillColor = color;
    }
    // 设置O填充颜色
    public setOFillColor(color: string) {
        this.OFillColor = color;
    }
    // 初始化数据
    private _initData() {
        this.actionData = {
            xIsNext: true,
            allData: [],
            XData: [],
            OData: [],
        };
        this.uiData = {
            texts: Array(9).fill(null),
            masks: Array(9).fill(true),
            premasks: Array(9).fill(false),
        }
    }
    // 初始化开始游戏数据
    public initStartData() {
        this.actionData = {
            xIsNext: true,
            allData: [],
            XData: [],
            OData: [],
        };
        this.uiData = {
            texts: Array(9).fill(null),
            masks: Array(9).fill(false),
            premasks: Array(9).fill(false),
        }
    }
    // 清除数据
    public clearActionData() {
        this._initData();
        this.historyActionDatas = [];
    }
    // 获取数据
    public getActionData() {
        return this.actionData;
    }
    // 获取UI数据
    public getUIData() {
        return this.uiData;
    }
    // 获取下一步棋 X|O
    public getNextValue(): string {
        return this.actionData.xIsNext ? 'X' : 'O';
    }
    // PUSH DATA
    public pushActionData(data: number[]) {
        let actionData = this.getActionData();
        this.historyActionDatas.push(this._cloneActionData(actionData));
        if (actionData.xIsNext) {
            actionData.XData.push(data);
        } else {
            actionData.OData.push(data);
        }
        actionData.xIsNext = !actionData.xIsNext;
        actionData.allData.push(data);
    }
    // POP DATA
    public popActionData() {
        this.resetActionData(this.historyActionDatas.length - 1);
    }
    // 悔棋，返回第step步
    public resetActionData(step: number) {
        let len = this.historyActionDatas.length;
        if (len === 0) {
            this._initData();
        }
        else if (step < len) {
            this.actionData = this.historyActionDatas.splice(step - 1, len)[0];
        }
    }
    // 克隆数据
    private _cloneActionData(data: ActionData) {
        return Object.assign({}, data);
    }
    // 将ActionData转化为UIData
    private transferActionDataToUIData(actionData: ActionData) {
        const xData = actionData.XData.sort(this.compute);
        const OData = actionData.OData.sort(this.compute);
    }

    // sort function
    private compute(arr1: number[], arr2: number[]) {
        return arr1[0] - arr2[0] || arr1[1] - arr2[1];
    }
}