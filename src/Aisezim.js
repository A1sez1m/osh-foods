import React, { Component } from 'react'
import axios from 'axios';
const id = '1197032811';
const token = '2096495683:AAG6qReFqTNH6OfkppIiSaDvHBLkB9z0bPA'

export default class Aisezim extends Component {
    componentDidMount(){
      axios.get(`https://api.telegram.org/bot${token}/getUpdates`)
         .then((f)=>{
            console.log(f)
         })
    axios.get(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${id}&text=hello bot`,)
    .then((f)=>{
    console.log(f)
     } )
    }
    render() {
        return (
            <>
                
            </>
        )
    }
}
