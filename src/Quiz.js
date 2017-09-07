import React, {Component} from 'react';
import QuizOptions from './QuizOptions';

class Quiz extends Component {

  constructor(props) {
    super(props);

    let riddle = this.playGame();

    this.state = {riddle};

    this.renderOptions = this.renderOptions.bind(this);
    this.checkResults = this.renderOptions.bind(this);
  }

  randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generateRandomOptions(sum) {
    let result = sum;
    let resultsArray = [];
    let randomNumberArray = [];

    while (randomNumberArray.length < 4) {
      let randomNumber = this.randomNumber(1, 19);
      if (randomNumberArray.indexOf(randomNumber) > -1) {
        continue;
      }
      randomNumberArray.push(randomNumber);
    }

    for (let i = 0;i < 3;i++) {
      let addSubtract = this.randomNumber(0, 1);
      let anchor = result;
      if (addSubtract === 1) {
        // add the number to the result;
        result += randomNumberArray[i];
      } else {
        // subtract the number from the result
        result -= randomNumberArray[i];
      }
      resultsArray.push(result);
      result = anchor;
    }
    resultsArray.push(result);

    return resultsArray;
  }

  playGame() {

    let field1 = this.randomNumber(20, 50);
    let field2 = this.randomNumber(20, 50);
    let result = field1 + field2;
    let resultsArray = this.generateRandomOptions(result);
    resultsArray.sort(function(a, b) {return 0.5 - Math.random()});
    let riddle = {
      resultsArray: resultsArray,
      field1: field1,
      field2: field2,
      answer: result
    };

    return riddle;

  }

  checkResults(option) {
    console.log("Reached here!");
    if (this.state.riddle.answer === option) {
      window.alert("Congratulations!");
    } else {
      window.alert("Wrong answer!");
    }
  }

  renderOptions() {
    return(
      <div className="options">
        {this.state.riddle.resultsArray.map((option, i) =>
          <QuizOptions option={option} key={i} 
            checkResults={(option) => this.checkResults(option)}/>
        )}
      </div> 
    );
  }

  render() {
  	return (
      <div className="quiz">
  	    <div className="quiz-content">
          <p className="question">
            What is the sum of  
            <span className="text-info"> 
              {this.state.riddle.field1}
            </span> 
              and 
            <span className="text-info"> 
              {this.state.riddle.field2}
            </span> ?
          </p>
          {this.renderOptions()}         
  	    </div>
  	    <div className="play-again">
  	      <a className="button">Play Again</a>
  	    </div>
  	  </div>	
  	);
  }

}

export default Quiz;