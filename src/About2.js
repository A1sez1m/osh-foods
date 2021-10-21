import React, { Component } from 'react'
import axios from 'axios'
import {Container,Card} from 'react-bootstrap'

export default class About2 extends Component {
    state={
       coment:[], 
    }
    componentDidMount(){
        const c = axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${this.props.match.params.id}`);
        c.then((f)=>{
            console.log(f)
            this.setState({coment:f.data.meals})
        })
    }
    render() {
        console.log(this.props.match.params.id)
        return (
            <Container>
            <div>
            {this.state.coment.map((p)=>{
                    return(
                        <>
                        <div><h1>{p.strMeal}</h1></div>
                        <Card  style={{ width: '15rem' }}>
                        <div className=" col-sm  p-4" >
                        <Card.Img variant="top" src={p.strMealThumb} />
                        </div>
                        </Card>
                        <div className=" p-4"><p>Category:<h4>{p.strCategory}</h4></p>
                        <p>Area:<h4>{p.strArea}</h4></p>
                        <p>{p.strInstructions}</p> 
                        </div>  
                        </>
                    )
                })}
            </div>
            </Container>
        )
    }
}
