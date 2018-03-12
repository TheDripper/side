import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Axios from 'axios';
import Cheerio from 'cheerio';
import Parser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import {Helmet} from "react-helmet";


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			press: ''
		}
	}
	async componentDidMount() {
		let press = await Axios('http://localhost');
		press = press.data;
		this.setState({press:press});
	}
  render() {
	  let press = this.state.press;
	  let $ = Cheerio.load(press);
	  let head = $('head').html();
	  let header = $('header').html();
	  let page = $('#page').html();
	  let footer = $('footer').html();
	  console.log(typeof head);
    return (
      <div className="App">
        <Helmet>
		{Parser(head)}
        </Helmet>
      	<Header mark={header} />
      </div>
    );
  }
}

function Header(props) {
	return <header>{Parser(props.mark)}</header>
}

export default App;
