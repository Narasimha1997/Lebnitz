import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import CameraComponent from './CameraView'


class WelcomeScreen_Wiki extends Component{
  constructor(){
    super();
    this.state = {query: ''}
    this.getAnswer = this.getAnswer.bind(this)
  }

  getSpeech() {

  }
  getAnswer(){
    fetch("http://192.168.20.210:5000/getAnswer",
      {
        method: 'POST',
        headers :{
          'Content-Type':'application/json'
        },
      body : JSON.stringify({data: this.state.query})
    }
    ).then(data=>data.json())
    .then((data)=>{
      ReactDOM.render(<RenderResults bundle={data.data} />, document.getElementById('main'))
    }).catch((err)=>{
      console.log(err)
    })
    ReactDOM.render(<Progress />, document.getElementById('main'))
  }
  render(){
    let x = document.getElementById('main')
    x.style.backgroundColor = "#301860"
    return (<div>
      <img src="https://cdn.dribbble.com/users/326740/screenshots/2565144/warren.png" width="100%" height="300px"/>
      <div className="card recognition">
        <p>You can ask me anything</p>
       <input type="text" value={this.state.data} onChange={(event)=>{
           this.setState({query: event.target.value})
         }}/>
       <button className="btn btn-outline-success" onClick={this.getAnswer}>Go</button>
       <button className = "btn btn-outline-success" onClick = {
         () => {
           ReactDOM.render(<CameraComponent />, document.getElementById('main'))
         }
       } >Image search</button>
  </div></div>)
    }

}
class Progress extends Component{
  render(){
    let x = document.getElementById('main')
    x.style.backgroundColor = "#fff";
    return(
      <div className="loading">
        <img src="assets/thinking_art.gif"  width="100%" height="300px"/>
      </div>
    )
  }
}
class RenderResults extends Component{
  constructor(props) {
    super(props)
    this.state = {
      result : this.props.bundle,
      to_speech : this.props.bundle[2].plaintext
    }
  }

  getSpeech() {
    fetch('https://speech-net.herokuapp.com/API')
  }
  render(){
    let x = document.getElementById('main')
    x.style.backgroundColor = "#fff";
    x.style.textAlign = 'center'
    x.style.marginBottom = '30px'
    const data = this.props.bundle;
    console.log(this.state.to_speech)
    return(
      <div>
        <img src="https://cdn.dribbble.com/users/998555/screenshots/2534709/bonus_animation.gif" width="100%" height="300px"/>
        <div className="render_container">
        <div style = {{margin : '20px auto', width : '95%', padding : "20px 20px 20px 20px"}}>
            <button className = "btn btn-outline-success">Speak out</button>
        </div>
        {
          data.map((key,value)=>{
            return (
              <div className="card component">
                <img src={key.img['@src']} className ="render_image" width={key.img['@width']} height={key.img['@height']}/>
                <p>{key.plaintext}</p>
                <button className = "btn btn-outline-success" onClick={()=>{
                    if(navigator.share){
                      navigator.share({
                        'title':'Share information',
                        'text': key.plaintext
                      }).then((succ)=>{console.log('Shared')})
                      .catch((err)=>{console.log(err)})
                    }
                }}>Share</button>
              </div>
            )
          })
        }
      </div>
        <button className="btn btn-outline-success" onClick={()=>{
            ReactDOM.render(<WelcomeScreen_Wiki/>, document.getElementById('main'))
          }}>I have more to ask</button>
        <a className="btn btn-outline-success" href="http://m.me/664256763784927">View on messenger</a>
    </div>
    )
  }
}

export {WelcomeScreen_Wiki, RenderResults}
