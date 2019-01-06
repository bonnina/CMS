import * as React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Wrapper from './Wrapper';
import Header from './Header';
import api from '../api';

interface State {
  data: Array<{id: string, title: string, order: number, path: string}>,
  loading: boolean
}

export default class Main extends React.Component<{}, State>  {
  public state: State = {
    data: [],
    loading: true
  };

  componentWillMount() {
    api()
    .then(result => {
      this.setState({
        data: result,
        loading: false
      })
    })
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
            {this.state.data.map(el => (
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
