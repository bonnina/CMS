import * as React from 'react';

interface IProps {
  imp?: string;
}

interface IState {
  Module: Function | null;  
}

export default class Wrapper extends React.Component<IProps, IState> {
  public state: IState = {
    Module: null
  };

  componentDidMount() {
    import(`./${this.props.imp}`)
    .then(module => this.setState({
      Module: module.default
    }))
  }

  public render() {
    const { Module } = this.state;
    return Module && <Module />
  }
}