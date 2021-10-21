import React, { Component } from 'react'
import axios from 'axios'
import {Card, Container,Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default class About extends Component {
    state={
        about:[],
        about3:JSON.parse(localStorage.getItem('key')) || [],
    }
    componentDidMount(){
        const b = axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${this.props.match.params.title}`);
        b.then((v)=>{
            console.log()
            if(v.data.meals == null){
                this.setState({about:[]})
            }else{
                this.setState({about: v.data.meals})
            }
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot){ 
        if(prevState.about3 !== this.state.about3){ 
          localStorage.setItem('key',JSON.stringify(this.state.about3))
        }
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
    render() {
       console.log(this.props.match.params.title)
        return (
            <Container>
            <div className='d-flex justify-content-around flex-wrap'>
               {this.state.about.map((h)=>{
                    return(
                        <Card className="p-2 m-2 " style={{ width: '15rem' }}>
                       <Card.Img variant="top" src={h.strMealThumb} />
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
                    )
                })}
            </div>
            </Container>
        )
    }
}
