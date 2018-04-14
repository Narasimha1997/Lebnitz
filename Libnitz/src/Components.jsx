import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import {WelcomeScreen_Wiki} from './Knowledge'

class Welcome extends Component{
  render(){
    return(
      <div>
        <button className='btn btn-outline-success'
          onClick={()=>{
            ReactDOM.render(<WelcomePage2 />, document.getElementById('main'))
          }
        }>Let's solve</button>
      <button className='btn btn-outline-success'
        onClick={()=>{
          ReactDOM.render(<WelcomeScreen_Wiki />, document.getElementById('main'))
        }}
      >Learn</button>
      </div>
    )
  }
}

class WelcomePage2 extends Component{
  constructor(){
    super()
    this.state = {page: 0}
    this.startTimer2 = this.startTimer2.bind(this)
  }
  componentDidMount(){
    this.timer = setInterval(()=>{
      this.setState({page:1})
    },4000)
  }
  startTimer2(){
    this.timer = setInterval(()=>{
      this.setState({page:3})
    }, 10000)
  }
  componentWillUnmount(){
    clearInterval(this.timer)
  }
  render(){
    if(this.state.page==0){
      let x = document.getElementById('main')
      x.style.backgroundColor = "#f0f0f0";
      return(
        <div className="page1">
          <div className="Stick">
            <img src="assets/welcome.gif" width="100%" height="40%"/>
          </div>
          <div className = "intro">
            <p>I am a Math expert created by team BroCode;,
            Let me introduce myself, I live in a small viallge on Google cloud,
            The village is really cool and I'm glad to say that I live with some cool bunch of apps like me.</p>
          </div>
        </div>
      )
    }else{
        let y = document.getElementById('main')
        y.style.background = "#f0d8d8"
        return(
          <div className="page1">
            <div className="Stick">
              <img src="assets/bus-2.gif" width="100%" height="40%"/>
            </div>
            <div className = "intro">
              <p>So now as you called me for help, I am travelling back to earth at light speed,
               I know your address and I will be on your phone any time now, Click on the button below
               to start working with me.</p>
             <button className = "btn btn-sm btn-default" onClick={
                 ()=>{
                   ReactDOM.render(<AppPage/>, document.getElementById('main'))
                 }
             }>Let's solve</button>
            </div>
          </div>
        )
    }
  }
}

class AppPage extends Component{
  constructor(){
    super();
    this.state = {mode : '', expression : '', tag:''};
    this.getAnswer = this.getAnswer.bind(this)
  }

  getAnswer(){
    var url = `https://newton.now.sh/${this.state.mode}/${this.state.expression}`
    console.log(url)
    fetch(url , {method : 'get'}).then((response)=>response.json()).then((obj)=>{
      if(obj.result!=null || obj.result!='')
      ReactDOM.render(<Result bundle = {obj}/>,document.getElementById('main'))
      else{
        this.setState({tag:'invaild'})
      }
    })
  }

  render(){
    var message;
    if(this.state.tag=='') message = "select mode, type the expression and click on the button"
    else{ message = "Invalid expression, please make sure the expression mathes the grammar below" }
    return (
      <div className="card App">
        <h4>I'm here to help</h4>
        <select className='form-control sel' value={this.state.mode} onChange={
            (event)=>{
              this.setState({mode : event.target.value })
              console.log(this.state.mode)
            }
        }>
          <option value="simpilfy">Simplify</option>
          <option value="factor">Factor</option>
          <option value="derive">Derivative</option>
          <option value="integrate">Integrate</option>
          <option value="zeroes">Find roots</option>
          <option value="tangent">Tangent vector</option>
          <option value="area">Area under curve</option>
          <option value="cos">Cosine</option>
          <option value="sin">Sine</option>
          <option value="tan">Tangent</option>
          <option value="arccos">Inverse Cosine</option>
          <option value="arcsin">Inverse Sine</option>
          <option value="arctan">Inverse Tangent</option>
          <option value="abs">Abs value</option>
          <option value="log">Log</option>
        </select>
        <input type="text" onChange={
            (event)=>{
              this.setState({expression : event.target.value})
              console.log(this.state)
            }
          } value = {this.state.expression}/>
        <button className='btn btn-outline-success' onClick={this.getAnswer}>Solve</button>
        <p>{message}</p>
        <h5>Grammar for forming expressions: </h5>
        <p>Variable is always represented by x</p>
        <p>1.) Divison or '/' must be written using: (over) ex: 3(over)2</p>
        <p>2.) Represent pi as pi itself, dont use pi symbol ex: pi(over)2</p>
        <p>3.) Powers are represented using ^ operator ex: x^2</p>
        <p>4.) If you are finding log then use the format value|base ex: 4|2 calculates log(4) with base 2</p>
        <p>5.) Sine , cosine and tangent are represented as : sin, cos and tan</p>
        <h5>Example expressions:</h5>
        <p>sin(x)+2, x^3+2*x^2+3*x+4, tanh(x), (sin(x))^2+(cos(x))^2</p>
        <p>cos(pi(over)2), (sin(x)(over)cos(x)) etc</p>
      </div>
    )
  }
}

class Result extends Component{
  constructor(props){
    super(props)
    this.state = {mode: 'thinking'}
    this.come_back = this.come_back.bind(this)
    this.facebook_page = this.facebook_page.bind(this)
    }
  componentDidMount(){
    this.timer = setInterval(()=>{
      this.setState({mode:'display'})
    }, 13000)
  }
  come_back(){
    ReactDOM.render(<AppPage />, document.getElementById('main'))
  }
  facebook_page(){
    ReactDOM.render(<Facebook />, document.getElementById('main'))
  }
  render(){
    let x = document.getElementById('main')
    x.style.background = "#fff"
    const result = this.props.bundle.result
    if(this.state.mode!='thinking'){
      return(
        <div className="page1">
          <div className="Stick">
            <img src="assets/aeroplane.gif" width="100%" height="40%"/>
          </div>
          <div className = "intro">
            <p>Here!! I solved your problem!! Yay!</p>
            <h5>{result}</h5>
            <p className="para">And here! I am going back home, Had a good time with you!
            If you are interested or you have any problem, Call me! Don't forget :), And
          soon I will be available on Facebook Messenger!</p>
        <button className="btn btn-outline-success" onClick={this.come_back}>Hey!I have more problems</button>
        <button className="btn btn-outline-success" onClick={this.facebook_page}>Meet me on Facebook</button>
          </div>
        </div>
      )
    }else{
      return(
        <div className="think">
          <h5>I guess the answer is: {this.props.bundle.result}...Please wait while i confirm</h5>
          <img src="assets/thinking_art.gif" width="100%" height="60%"></img>
          <p>The problem was easy, Uk how electricity was invented long back? There was a man in prehistoric
          age, he was soo dumb, one day, this happened!!</p>
        </div>
      )
    }
  }
}

class Facebook extends Component{
  constructor(){
    super()
  }
  render(){
    let x = document.getElementById('main')
    x.style.background = "#4848a8";
    x.style.color = "#fff"
    return(
      <div className="facebook_img">
        <img src="assets/maintain.jpg" className="responsive-image" width="200px" height="150px"></img>
        <div className="facebook">
          <h4>Lebnitz is integrated with News Bot</h4>
          <h5></h5>
          <p>Lebnitz bot is integrated with News Bot, News Bot provides real time news and weather to all for free,
          We've integrated with News Bot, This allows us to call Lebnitz from the bot, There is no need to install
         any app, You can just add 'Leb!' tag followed by the query. Lebnitz will instantly answer your queries</p>
      <p>Thank you from team Goto;</p>
        </div>
        <a className="btn btn-outline-success" href="http://m.me/664256763784927"></a>
      </div>
    )
  }
}
export {Welcome, Facebook};
