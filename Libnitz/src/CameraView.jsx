import React from 'react'
import ReactDOM from 'react-dom'
import {RenderResults} from './Knowledge'
var b64 = require('base64-img')

class CameraComponent extends React.Component {
    constructor() {
        super()
        this.state = {
            image_blob : null,
            file_path : null
        }
    }

    uploadFile(image){
        let file = new FormData()
        file.append('photo', image)
        console.log('Image uploading')
        fetch('http://192.168.20.210:5000/uploadImage', {
            method : 'POST',
            body : file
        }).then((data) => data.json()).then((json) => {
            if(json.success){
                console.log(json.prediction)
                fetch("http://192.168.20.210:5000/getAnswer",
                {
                method: 'POST',
                headers :{
                    'Content-Type':'application/json'
                },
                body : JSON.stringify({data: json.prediction})
                }).then((data) => data.json()).then((json) => {
                    ReactDOM.render(<RenderResults bundle={json.data} />, document.getElementById('main'))
                }
            ).catch((err) => {
                console.log(err)
            })
            }else{
                console.log('No predictions')
            }
        }).catch((err) => console.log(err))
    }
    render() {
        console.log(this.state.file_path)
        return(
            <div>
              <div className = "card" style = {{margin : '40px auto', width : '95%', padding : '20px 20px 20px 20px'}}>
                <h3>Upload an Image: </h3>
                <input type = "file" name = "file" onChange = {(event)=>{
                    //this.setState({file_path : event.target.files[0]})
                    this.uploadFile(event.target.files[0])
                }}/>
              </div>
            </div>
        )
    }
}



export default CameraComponent