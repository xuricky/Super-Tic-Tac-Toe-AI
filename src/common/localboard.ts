
export const sucArr = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

export enum Score {
    ai_win = 10,
    ai_almostwin = 9,
    draw = 0,
    human_almostwin = -9,
    human_win = -10,
}

export enum Type {
    AI = 1,
    HUMAN = -1
}

export enum State {
    ai_win,
    human_win,
    draw,
    active,
}

interface VirtualData {
    isActive: boolean,
    score: Score,
    data: number[],
    state: State,
}

export class LocalBoard {
    /**
     * @description 坐标值
     */
    private id: number;
    private virtualData: VirtualData;
    constructor(id: number) {
        this.id = id;
        this.virtualData = {
            isActive: true,
            score: null,
            data: Array(9).fill(null),
            state: null,
        }
    }
    
    /**
     * @description 获取坐标值
     */
    public getId() {
        return this.id;
    }

    /**
     * @description 单步下棋
     * @param index 棋子id
     * @param isAI 是否是AI
     */
    public pushData(index: number, isAI: boolean) {
        let virtualData = this.virtualData;
        if (virtualData.data[index]) return; 
        virtualData.data[index] = isAI ? Type.AI : Type.HUMAN;
        let res = this._getStateAndScore(this.virtualData.data);
        virtualData.score = res.score;
        virtualData.state = res.state;
        res.state !== State.active && (virtualData.isActive = false);
    }

    public getVirtualData() {
        return this.virtualData;
    }

    /**
     * @description 深克隆
     */
    public deepCloneVirtualData() {
        return JSON.parse(JSON.stringify(this.virtualData));
    }

    public setVirtualData(data: VirtualData) {
        this.virtualData = data;
    }

    /**
     * @description 获取棋盘的分数和状态
     * @param data 棋盘数据
     */
    private _getStateAndScore(data: number[]): {state: State, score: Score} {
        let state = State.active;
        let score = 0;
        let notDraw = false;
        for (let arr of sucArr) {
            let dataArr = [data[arr[0]], data[arr[1]], data[arr[2]]];
            if (dataArr.every(n => n === Type.AI)) {
                state = State.ai_win;
                score = Score.ai_win;
                break;
            } else if (dataArr.every(n => n === Type.HUMAN)) {
                state = State.human_win;
                score = Score.human_win;
                break;
            } else if (!dataArr.some(n => n === Type.AI) || !dataArr.some(n => n === Type.HUMAN)) {
                notDraw = true;
                let effectData = dataArr.filter(n => n !== null);
                if (effectData.length === 2) {
                    score += effectData.includes(Type.AI) ? 2 : -2;
                }
            }
        }
        if (state === State.active && !notDraw) {
            state = State.draw;
            score = Score.draw;
        } else if (state === State.active && notDraw) {
            score += data.reduce((pre, cur) => (pre || 0) + (cur || 0), 0);
            score = score > Score.ai_almostwin ? Score.ai_almostwin : score < Score.human_almostwin ? Score.human_almostwin : score;
        }
        return {
            state,
            score
        };
    }
}