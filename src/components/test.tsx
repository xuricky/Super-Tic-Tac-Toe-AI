import * as React from 'react';

export interface testProps {
    compiler: string,
    framework: string
}

export class Test extends React.Component<testProps, {}> {
    render() {
        return <h1>Test from {this.props.compiler} and {this.props.framework}!</h1>
    }
}