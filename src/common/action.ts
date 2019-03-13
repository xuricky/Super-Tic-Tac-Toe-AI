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
    private static INSTANCE = new Action();
    public static getInstance() {
        return this.INSTANCE;
    }
    private actionData: ActionData;
    private XFillColor: string;
    private OFillColor: string;
    private historyActionDatas: ActionData[];
    private uiData: UIData;
    constructor() {
        this._initData();
        this.XFillColor = ColorOption.XFillColor;
        this.OFillColor = ColorOption.OFillColor;
    }

    public setXFillColor(color: string) {
        this.XFillColor = color;
    }

    public setOFillColor(color: string) {
        this.OFillColor = color;
    }

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

    public getActionData() {
        return this.actionData;
    }

    public getUIData() {
        return this.uiData;
    }

    public getNextValue(): string {
        return this.actionData.xIsNext ? 'X' : 'O';
    }

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

    public popActionData() {
        this.resetActionData(this.historyActionDatas.length - 1);
    }

    public resetActionData(step: number) {
        let len = this.historyActionDatas.length;
        if (len === 0) {
            this._initData();
        }
        else if (step < len) {
            this.actionData = this.historyActionDatas.splice(step - 1, len)[0];
        }
    }

    private _cloneActionData(data: ActionData) {
        return Object.assign({}, data);
    }

    private clearActionData() {
        this._initData();
        this.historyActionDatas = [];
    }
}