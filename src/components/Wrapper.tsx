import * as React from 'react';

interface Props {
  imp?: string;
}

interface State {
  Module: Function | null;  
}

export default class Wrapper extends React.Component<Props, State> {
  public state: State = {
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