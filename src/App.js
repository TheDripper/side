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
	  console.log(press);
	  let $ = Cheerio.load(press);
	  let head = $('head').html();
	  let header = $('header').html();
	  let main = $('#main').html();
	  let footer = $('#footer').html();
    return (
      <div className="App">
        <Helmet>
		{Parser(head)}
        </Helmet>
	<div id="page">
      	<Header mark={header} />
      	<Main mark={main} />
	<Footer mark={footer} />
	</div>
      </div>
    );
  }
}

function Header(props) {
	return <header>{Parser(props.mark)}</header>
}
function Main(props) {
	return <main id="main">{(Parser(props.mark))}</main>
}
function Footer(props) {
	return <footer>{Parser(props.mark)}</footer>
}

export default App;
