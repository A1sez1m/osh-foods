import axios from 'axios'
import React, { Component } from 'react'
import { Card, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Button from '@restart/ui/esm/Button'

export default class Search extends Component {
    constructor(props){
        super(props)
        this.state={
            about3:[],
            lab:true
        }
    }
    request=()=>{
        this.setState({lad:true})
        const a = axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${this.props.match.params.id3}`)
        a.then((v)=>{
            this.setState({about3:v.data.meals})
            a.finally(()=>{
                this.setState({lad:false})
            })
        })
    }
    componentDidMount(){
        this.request()
    }
    componentDidUpdate(prevProps,prevState){
        if(this.props.match.params.id3 !== prevProps.match.params.id3 ){
            this.request()
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
        return (
            <Container>
            <div className='d-flex justify-content-around flex-wrap m-3'>
                {this.state.about3.map((v)=>{
                    return(
                        <Card style={{width:'15rem'}}>
                        <Card.Img variant="top" src={v.strMealThumb}/>
                        <Card.Body>
                        <Card.Title  as={Link} to={`/about2/${v.idMeal}`}>{v.strMeal}</Card.Title>
                        </Card.Body>
                        <Button  style={{borderRadius: 15,
                                          marginRight: 60,
                                          marginLeft: 25,
                                          marginTop: 8,
                                          paddingTop: 8,
                                          paddingBottom: 8,
                                        }}  className={this.state.about3.find(r => r.idMeal === v.idMeal) ? 'btn btn-danger w-75' : 'btn btn-warning w-75'}
                                         onClick={() =>this.butt(v)}>  
                                        {this.state.about3.find(r => r.idMeal === v.idMeal) ? 'Remove Bascet' : 'Add Bascet'}</Button>
                        </Card>
                    )
                })}
            </div>
            </Container>
        )
    }
}
