import * as React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Wrapper from './Wrapper';
import Header from './Header';
import api from '../api';

interface IState {
  data: Array<{
    id   : string,
    path : string,
    title: string, 
    order: number,
  }>,
  loading: boolean
}

export default class Main extends React.Component<{}, IState>  {
  public state: IState = {
    data: [],
    loading: true
  };

  componentWillMount() {
    api()
    .then(result => result.sort((a: any, b: any) => a.order - b.order))
    .then(sorted => 
      this.setState({
        data   : sorted,
        loading: false
      })
    )
    .catch(err => console.log(err.message));
  }

  public render() {
    return (
      this.state.loading
      ? <p> Loading... </p>
      : <BrowserRouter>
        <div>
          <Header data={this.state.data}/>
          <Switch>
            {this.state.data.map((el: any) => (
              <Route
                key={el.order}
                path={`/${el.id}`}
                render={({match}) => <Wrapper imp={match && el.path} />}
              />
            ))}
            <Route exact path="/" render={() => <Wrapper imp={this.state.data[0].path} />} />  
            <Route component={({location: {}}) => (
              <p> 404 <br/> Page {location ? (location.pathname).slice(1) : ""} not found </p>
            )}/>
          </Switch>
        </div>
      </BrowserRouter>
      )
    }
}
