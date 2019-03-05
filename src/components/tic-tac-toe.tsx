import * as React from 'react';

export interface TicTacToeProps {
    index: number;
}

export class TicTacToe extends React.Component<TicTacToeProps> {
    constructor(props: TicTacToeProps) {
        super(props);
    }
}