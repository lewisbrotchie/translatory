import React, { Component } from "react";
import "./App.css";
import Keyboard from "react-simple-keyboard";
import "simple-keyboard/build/css/index.css";
import layout from "simple-keyboard-layouts/build/layouts/russian";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueRus: "",
      translatedRus: "",
      valueEng: "",
      translatedEng: ""
    };
  }

  handleEnglishChange = e => {
    const valueEng = e.target.value;
    this.setState(prevState => ({ ...prevState, valueEng }));
    this.translate(valueEng);
  };

  onChange = input => {
    const valueRus = input;
    this.setState(prevState => ({ ...prevState, valueRus }));
    console.log(input);
    this.translateRus(input);
  };

  handleRussianChange = e => {
    const valueRus = e.target.value;
    this.setState(prevState => ({ ...prevState, valueRus }));
  };

  translate(text) {
    const apiKey =
      "trnsl.1.1.20181111T205010Z.da380e009414791e.33081328946bfb5aafec611465eb26142ff7b9d9";
    fetch(
      `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${apiKey}&text=${text}&lang=en-ru`
    )
      .then(response => response.json())
      .then(data => {
        const translatedEng = data.text;
        console.log("parsed json", translatedEng);
        this.setState(prevState => ({ ...prevState, translatedEng }));
      })
      .catch(ex => console.log("api error - ", ex));
  }

  translateRus(text) {
    const apiKey =
      "trnsl.1.1.20181111T205010Z.da380e009414791e.33081328946bfb5aafec611465eb26142ff7b9d9";
    fetch(
      `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${apiKey}&text=${text}&lang=ru-en`
    )
      .then(response => response.json())
      .then(data => {
        const translatedRus = data.text;
        console.log("parsed json", translatedRus);
        this.setState(prevState => ({ ...prevState, translatedRus }));
      })
      .catch(ex => console.log("api error - ", ex));
  }

  render() {
    return (
      <div className="App">
        <div className="App-div">
          <header>english</header>
          <input
            name="eng"
            type="text"
            placeholder="english text"
            value={this.state.value}
            onChange={this.handleEnglishChange}
          />
          <br />
          {this.state.translatedEng}
        </div>
        <div className="App-div">
          <header>russian</header>
          <input
            name="rus"
            type="text"
            placeholder="russian text"
            value={this.state.valueRus}
            onChange={this.handleRussianChange}
          />
          <br />
          {this.state.translatedRus}
        </div>
        <div className="App-div">
          <Keyboard layout={layout} onChange={input => this.onChange(input)} />
        </div>
      </div>
    );
  }
}

export default App;
