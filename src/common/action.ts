import { ColorOption } from '../ui/color/color';

interface ActionData{
    xIsNext: boolean,
    allData: number[][],
    XData: number[][],
    OData: number[][],
}

interface UIData {
    squareTexts: string[][];
    texts: string[];
    masks: boolean[];
    premasks: boolean[];
}

interface historyData {
    actionData: ActionData,
    uiData: UIData,
}

export class Action {
    /**
     * @description 单例原型
     */
    private static INSTANCE = new Action();
    /**
     * @description 获取单例原型
     */
    public static getInstance() {
        return this.INSTANCE;
    }
     /**
     * @description 棋子数据
     */
    private actionData: ActionData;
     /**
     * @description X填充局部棋盘颜色
     */
    private XFillColor: string;
     /**
     * @description O填充局部棋盘颜色
     */
    private OFillColor: string;
    /**
     * @description 历史数据
     */
    private historyDatas: historyData[];
     /**
     * @description UI数据
     */
    private uiData: UIData;
    /**
     * @description 成功数组
     */
    private sucArr = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    constructor() {
        this._initData();
        this.XFillColor = ColorOption.XFillColor;
        this.OFillColor = ColorOption.OFillColor;
    }

    /**
     * @description 设置X填充颜色
     */
    public setXFillColor(color: string) {
        this.XFillColor = color;
    }

    /**
     * @description 设置O填充颜色
     */
    public setOFillColor(color: string) {
        this.OFillColor = color;
    }

    /**
     * @description 初始化数据
     */
    private _initData() {
        this.actionData = {
            xIsNext: true,
            allData: [],
            XData: [],
            OData: [],
        };
        this.uiData = {
            squareTexts: this._init2DArray(9, 9),
            texts: Array(9).fill(null),
            masks: Array(9).fill(true),
            premasks: Array(9).fill(false),
        };
        this.historyDatas = [];
    }

    /**
     * @description 初始化开始游戏数据
     */
    public initStartData() {
        this.actionData = {
            xIsNext: true,
            allData: [],
            XData: [],
            OData: [],
        };
        this.uiData = {
            squareTexts: this._init2DArray(9, 9),
            texts: Array(9).fill(null),
            masks: Array(9).fill(false),
            premasks: Array(9).fill(false),
        };
        this.historyDatas = [];
    }

    /**
     * @description 清除数据
     */
    public clearActionData() {
        this._initData();
        this.historyDatas = [];
    }

    /**
     * @description 获取actionData
     */
    public getActionData() {
        return this.actionData;
    }

    /**
     * @description 获取UI数据
     */
    public getUIData() {
        return this.uiData;
    }

    /**
     * @description 获取下一步棋
     * @returns X|O
     */
    public getNextValue(): string {
        return this.actionData.xIsNext ? 'X' : 'O';
    }

    /**
     * @description PUSH DATA, Handle click events
     */
    public pushActionData(data: number[]) {
        let actionData = this.getActionData();
        let uiData = this.getUIData();
        this.historyDatas.push({
            actionData: this._deepCloneActionData(actionData),
            uiData: this._deepCloneActionData(uiData)
        });
        let value = this.getNextValue();
        this.changeValueFromID(uiData.squareTexts, data, value);
        if (actionData.xIsNext) {
            actionData.XData.push(data);
        } else {
            actionData.OData.push(data);
        }
        actionData.xIsNext = !actionData.xIsNext;
        actionData.allData.push(data);
        this._transferActionDataToUIData(actionData);
        this._handleNextStepData(data);
    }

    /**
     * @description POP DATA
     */
    public popActionData() {
        this.resetActionData(this.historyDatas.length - 1);
    }
    
    /**
     * @description 悔棋，返回第step步
     * @param step 步数
     */
    public resetActionData(step: number) {
        let len = this.historyDatas.length;
        if (len <= 0) {
            this._initData();
        }
        else if (step < len) {
            let leftDatas = this.historyDatas.splice(step, len);
            this.actionData = leftDatas[0].actionData;
            this.uiData = leftDatas[0].uiData;
        }
    }

    /**
     * @description 深克隆数据
     */
    private _deepCloneActionData<T>(data: T): T {
        return JSON.parse(JSON.stringify(data));
    }

    /**
     * @description 将ActionData转化为UIData
     */
    private _transferActionDataToUIData(actionData: ActionData) {
        let xData = actionData.XData.sort(this._compare);
        let OData = actionData.OData.sort(this._compare);
        let xIndexs = this._getSucIndexArray(xData);
        let OIndexs = this._getSucIndexArray(OData);
        let uiData = this.getUIData();
        if (this._calculateWinner(xIndexs)) {
            uiData.masks = new Array(9).fill(true);
        } else if (this._calculateWinner(OIndexs)){
            uiData.masks = new Array(9).fill(true);
        } else {
            for (let i = 0; i < uiData.masks.length; i++) {
                if (xIndexs.includes(i) || OIndexs.includes(i)) {
                    uiData.masks[i] = true;
                    if (xIndexs.includes(i)) {
                        uiData.texts[i] = 'X';
                    } else if (OIndexs.includes(i)) {
                        uiData.texts[i] = 'O';
                    }
                } else {
                    uiData.masks[i] = false;
                }
            }
        }
    }

    /**
     * @description sort function
     */
    private _compare(arr1: number[], arr2: number[]) {
        return arr1[0] - arr2[0] || arr1[1] - arr2[1];
    }

    /**
     * 通过ID改变二维数组的某个元素值
     * @param arr 二维数组
     * @param value 改变值
     */
    public changeValueFromID(arr: any[][], id: number[], value: any) {
        arr[id[0]][id[1]] = value;
    }

    /**
     * @description 通过ID获取二维数组的某个元素值
     * @param arr 二维数组
     */
    public getValueFromID(arr: any[][], id: number[]) {
        return arr[id[0]][id[1]];
    }

    /**
     * @description 初始化二维数组
     * @param row 行
     * @param column 列 
     */
    private _init2DArray(row: number, column: number) {
        let arr2D = new Array(row);
        for (let r = 0; r < row; r++) {
            arr2D[r] = new Array(column).fill(null);
        }
        return arr2D;
    }

    /**
     * @description 查找是否有局部棋盘成功
     * @returns 局部棋盘成功的index
     */
    private _getSucIndexArray(data: number[][]): number[] {
        let suc: number[] = [];
        let arr3d: number[][][] = [];
        data.forEach((id) => {
            let arr2d = arr3d.find(_arr2d => _arr2d[0][0] === id[0]);
            if (arr2d) {
                arr2d.push(id);
            } else {
                arr3d.push([id]);
            }
        })
        arr3d.forEach((arr2d) => {
            for (let _suc of this.sucArr) {
                if (arr2d.find(arr => arr[1] === _suc[0]) &&
                    arr2d.find(arr => arr[1] === _suc[1]) &&
                    arr2d.find(arr => arr[1] === _suc[2])) {
                        suc.push(arr2d[0][0]);
                        break;
                    }
            }
        })
        return suc;
    }

    /**
     * @description 计算胜者
     */
    private _calculateWinner(sucIndexs: number[]): boolean {
        let win = false;
        for (let _suc of this.sucArr) {
            if (sucIndexs.find(n => n === _suc[0]) &&
                sucIndexs.find(n => n === _suc[1]) &&
                sucIndexs.find(n => n === _suc[2])) {
                    win = true;
                    break;
                }
        }
        return win;
    }

    /**
     * @description 获得胜者
     */
    public getWinner(): string {
        let winner = null;
        let actionData = this.getActionData();
        let xData = actionData.XData.sort(this._compare);
        let OData = actionData.OData.sort(this._compare);
        let xIndexs = this._getSucIndexArray(xData);
        let OIndexs = this._getSucIndexArray(OData);
        if (this._calculateWinner(xIndexs)) {
            winner = 'X';
        } else if (this._calculateWinner(OIndexs)) {
            winner = 'O';
        }
        return winner;
    }

    /**
     *@description 下一步的数据处理 
     */
    private _handleNextStepData(id: number[]) {
        let uiData = this.getUIData();
        if (!this.getWinner()) {
            let masks = uiData.masks;
            if (!masks[id[1]]) {
                uiData.masks = masks.map((mask, i) => i !== id[1] && (mask = true));
            }
        }
    }
}