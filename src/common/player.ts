import { HistoryData, Action } from './action';

export class Player {
    private data: HistoryData[];
    private currentIndex: number;
    public start: boolean ;
    private action = Action.getInstance();
    constructor(data: HistoryData[]) {
        this.data = data;
        this.start = false;
        this.currentIndex = 0;
    }

    public play() {
        this.start = true;
        if (this.currentIndex < this.data.length) {
            this.action.resetActionData(this.currentIndex++, this.data);
        }
    }

    public pause() {
        this.start = false;
    }

    public back() {
        if (this.currentIndex > 0) {
            this.action.resetActionData(this.currentIndex--, this.data);
        }
    }

    public next() {
        if (this.currentIndex < this.data.length) {
            this.action.resetActionData(this.currentIndex++, this.data);
        }
    }
}