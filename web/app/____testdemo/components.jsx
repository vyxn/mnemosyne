// @flow

import React, { Component } from 'react';

export class BeerListContainer extends Component {
  state: {
    beers: string[]
  }
  constructor(props: {}) {
    super(props);
    this.state = {
      beers: []
    };
  }
  addItem = (name: string) => {
    this.setState({
      beers: [
        ...this.state.beers,
        name
      ]
    });
  }
  render() {
    return (
      <div>
        <InputArea text="" onSubmit={this.addItem}/>
        <BeerList items={this.state.beers}/>
      </div>
    );
  }
}

type Props = {
  text: string,
  onSubmit(string): void
};
type State = {
  text: string,
  onSubmit: (string) => void
};

export class InputArea extends Component<void, Props, State> {
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      text: '',
      onSubmit: props.onSubmit
    };
  }

  setText = (event: { target: { value: string }}) => this.setState({ text: event.target.value });

  handleKeyDown = (e: KeyboardEvent) => {
    let key = 'which' in e ? e.which : e.keyCode;
    if (key == 13) {
      e.preventDefault();
      this.props.onSubmit(this.state.text);
      this.setState({ text: '' });
    }
  }

  handleClick = () => {
    this.props.onSubmit(this.state.text);
    this.setState({ text: '' });
  }

  render() {
    return (
      <div>
        <input value={this.state.text} onKeyDown={this.handleKeyDown} onChange={this.setText}/>
        <button onClick={this.handleClick}>Add</button>
      </div>
    );
  }
}

export class BeerList extends Component {
  props: {
    items: string[]
  }
  render() {
    return this.props.items ?
      (
        <ul>
          {this.props.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )
      : null;
  }
}