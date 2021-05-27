export interface State {
    time: number;
    count: number;
    timerHasStarted: boolean;
    takeBreak: boolean;
}

export interface NewState {
    time?: number;
    count?: number;
    timerHasStarted?: boolean;
    takeBreak?: boolean;
}
