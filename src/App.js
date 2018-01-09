import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import demo from "./demo.jpg"

import $ from "zeptojs"

import imgtreat from "./imgtreat/"

class App extends Component {

  constructor() {
    super();
    this.state = {
      img : undefined
    }
  }

  componentDidMount() {
    let comp = this;
    imgtreat.imageOpen(
      demo
    ).then(img => {
      return imgtreat.imageRotate(img, 45)
    }).then(img => {
      return imgtreat.create(
        img.width, img.height
      ).then((canvas) => {
        let context = canvas.getContext('2d');
        context.drawImage(img, 0, 0, img.width, img.height);
        return canvas;
      }).then(canvas => {
        imgtreat.textDraw(canvas, "这是一句话", 0, 0, {
          font : '20px 黑体',
          fillStyle : 'blue',
          lineSpacing : 1,
          wordSpacing : 1.5,
          isVertical : false
        })
        return canvas;
      })
    }).then(canvas => {
      return imgtreat.imageOpen(
        canvas.toDataURL("image/png")
      )
    }).then(img => {
      $(".App").append(img)
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
