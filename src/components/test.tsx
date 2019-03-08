import * as React from 'react';
import { Square } from './square';
import { TicTacToe } from './tic-tac-toe';
import { SuperTicTacToe } from './super-tic-tac-toe';

export interface testProps {
    compiler: string,
    framework: string
}

export class Test extends React.Component<testProps, {}> {
    render() {
        return <SuperTicTacToe></SuperTicTacToe>
    }

}