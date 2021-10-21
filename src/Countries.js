import React, { Component } from 'react' 
import axios from 'axios' 
import { Card, Container} from 'react-bootstrap' 
import Button from '@restart/ui/esm/Button'
import { Link } from 'react-router-dom'

 
export default class Countries extends Component {
    constructor(props){
        super(props)
        this.state = { 
            meals: [], 
        about3:JSON.parse(localStorage.getItem('key')) || [],
           
        } 
         
        const a = axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${this.props.match.params.id2}`) 
        a.then((s) => { 
            console.log(s) 
            this.setState({ meals: s.data.meals }) 
        }) 
    }
    
    componentDidUpdate(prevProps, prevState, snapshot){ 
        if(prevProps !== this.props.match.params.id2){
            const a = axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${this.props.match.params.id2}`) 
        a.then((s) => { 
            console.log(s) 
            this.setState({ meals: s.data.meals }) 
        }) 
        }
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
 
            return ( 
                <> 
                 
                    <div className='d-flex justify-content-around flex-wrap w-0 container shadow'> 
                         
                        {this.state.meals.map((k) => { 
                            return ( 
                                <div> 
                                    <Container>
                                    <Card className="mt-5 mb-2 shadow"  style={{  width: '15rem' }}> 
                                        <Card.Img variant="top"  src={k.strMealThumb} />
                                        <Card.Title as={Link} to={`/about2/${k.idMeal}`}> {k.strMeal}</Card.Title> 
                                        <Button  style={{borderRadius: 15,
                                          marginRight: 60,
                                          marginLeft: 25,
                                          marginTop: 8,
                                          paddingTop: 8,
                                          paddingBottom: 8,
                                        }}  className={this.state.about3.find(r => r.idMeal === k.idMeal) ? 'btn btn-danger w-75' : 'btn btn-warning w-75'}
                                         onClick={() =>this.butt(k)}>  
                                        {this.state.about3.find(r => r.idMeal === k.idMeal) ? 'Remove Bascet' : 'Add Bascet'}</Button>
                                         </Card>
                                        </Container> 
                                </div> 
                            ) 
                        })} 
                    </div> 
                </> 
            ) 
        } 
 
    }