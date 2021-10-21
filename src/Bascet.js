import React, { Component } from 'react'
import {Button,Image,Card, Container,Modal,Form} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
const token = '2096495683:AAG6qReFqTNH6OfkppIiSaDvHBLkB9z0bPA'
export default class Bascet extends Component {
    
    state={
        about3:JSON.parse(localStorage.getItem('key')) || [],
        show:false,
        number:'',
        address:'',
        name:'',
        checkbox: [],
        remove:false,
        checked:false
    }

    butt = (h)=>{ 
      if(this.state.about3.find(v=>v.idMeal===h.idMeal)){
          const as =this.state.about3.filter(i=> i.idMeal !== h.idMeal)
          this.setState((p)=>{
              return{about3:as}
          })
         }else{
       this.setState(pre =>{
           const a = [...pre.about3, h]
           return{about3:a}
       })
    }   
    } 
    notify = () => toast("Wow so easy!");
    toShow(){ 
      this.setState({show:!this.state.show}) 
        } 
    to= () => {
      axios.get(`https://api.telegram.org/bot${token}/sendMessage`,{
        params:{
           parse_mode:"HTML",
           chat_id:'1197032811',
           text: `<b>Olders:</b>\n 
 <b>Name</b>: <i>${this.state.name}</i>\n <b>Number</b>: <i>${this.state.number}</i>\n <b>Address</b>: <i>${this.state.address}</i>\n
  <b>Food olders</b>: <i>${this.state.checkbox.map(a=>a.strMeal)}</i>`  
      }
      })
      this.toShow()
      this.notify()

    }
      asd=()=>{
      if(this.state.remove){
        this.setState(p => {
          const a = this.state.checkbox.filter(v =>!this.state.checkbox.find(l=>l.idMeal === this.state.about3.idMeal));
          this.setState({about3:a})
        })}
        this.to()}
    componentDidUpdate(prevProps, prevState){ 
      console.log(this.state.about3)
        if(this.state.about3 !== prevState.about3){ 
            localStorage.setItem('key',JSON.stringify(this.state.about3)) 
        }
        console.log(this.state.checkbox);
      }
    render(){
        return (
            <>
            <ToastContainer />
            <div className='d-flex justify-content-around flex-wrap'>
            {<h1>Basket({this.state.about3.length})</h1>}
            <Button variant="success" onClick={()=>this.toShow()}>
      <h4>Older({this.state.about3.length})</h4>
      </Button>
      </div>
             {!(this.state.about3.length > 0) && <div align='center'><Button as={Link} to={'/'}><h1>Назад</h1></Button>
         <div className='image'><Image src="https://a.d-cd.net/5b4338u/480.jpg" /></div></div>}
         <Container>
         <div className='d-flex justify-content-around flex-wrap'> 
        
      <Modal show={this.state.show} onHide={()=>{this.toShow()}}>
        <Modal.Header closeButton>
          <Modal.Title>Older Meals</Modal.Title>
        </Modal.Header>
        <Modal.Body> <Form>
                            <Form.Group  className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Your full name</Form.Label>
                            <Form.Control onChange={(e)=>{this.setState({name:e.target.value})}} type="text" placeholder="Full name" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Label>Contact phone number</Form.Label>
                            <Form.Control onChange={(e)=>{this.setState({number:e.target.value})}} type="text" placeholder="Phone number"/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Label>Address</Form.Label>
                            <Form.Control onChange={(e)=>{this.setState({address:e.target.value})}} type="text" placeholder="Address"/>
                            </Form.Group>
                            </Form></Modal.Body>
                            {this.state.about3.map((h)=>{
                    return(
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label={h.strMeal} onChange={(e)=>this.setState((prev)=>{
      const s = e.target.checked ? [...prev.checkbox,h] : prev.checkbox.filter(d=>d.idMeal !== h.idMeal)  
      return{checkbox:s}
    })}/>
  </Form.Group>
     )
    })} 
  <hr></hr>
  <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check onChange={(e)=>this.setState({remove:e.target.checked})}
     type="checkbox" label= "remove"/>
  </Form.Group>
                      
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{this.toShow()}}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{
            this.asd()
          }} 
          disabled={!this.state.name.length > 0 && !this.state.number.length > 0 && !this.state.address.length > 0}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
                       
               {this.state.about3.map((h)=>{
                    return(
                        <>
                        <Card className="p-2 m- " style={{ width: '15rem' }}>
                       <Card.Img variant="top"  src={h.strMealThumb} />
                        <Card.Body>
                          <Card.Title as={Link} to={`/about2/${h.idMeal}`}>{h.strMeal}</Card.Title> 
                          <Button  style={{borderRadius: 15,
                                          marginRight: 60,
                                          marginLeft: 25,
                                          marginTop: 8,
                                          paddingTop: 8,
                                          paddingBottom: 8,
                                        }}  className={this.state.about3.find(r => r.idMeal === h.idMeal) ? 'btn btn-danger w-75' : 'btn btn-warning w-75'}
                                         onClick={() =>this.butt(h)}>  
                                        {this.state.about3.find(r => r.idMeal === h.idMeal) ? 'Remove Bascet' : 'Add Bascet'}</Button>
                        </Card.Body>
                      </Card> 
                      </>
                    )
                })}
            </div>
            </Container>
            </>
        )
    }
}