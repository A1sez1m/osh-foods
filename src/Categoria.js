import React, { Component } from 'react'
import axios from 'axios'
import {Card, Container,Navbar,Button,NavDropdown,Nav,Form,FormControl} from 'react-bootstrap'
import {Link} from  'react-router-dom'


export default class Categoria extends Component {
    state={
        categories:[],
        categor:[],
        input:"",
        searchs:[],
        lan: true, 
    }
    componentDidMount(){
        this.setState({ lan: true }) 
        const a = axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
        a.then((v)=>{
            console.log(v.data.categories)
            this.setState({categories:v.data.categories})
        })
        const t = axios.get(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`); 
        t.then((o) => { 
          console.log(o.data) 
          this.setState({ categor: o.data.meals }) 
        }) 
    }
  
      render() {
        const r = this.state.categor || []
          return (
              <>
                    <Navbar className="navbar navbar-dark bg-dark" expand="lg">
                    <Container>
                <Link style={{textDecoration: 'none'}}  to="/">Osh Food</Link>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className=" mr-auto my-2 my-lg-0 me-auto"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
            <Nav.Link as={Link} to="/" >Home</Nav.Link>
            <Nav.Link as={Link} to="/bascet" >Bascet</Nav.Link>
            <NavDropdown  href="#" title="Countries" id="navbarScrollingDropdown">
        {r.map((g)=>
            <NavDropdown.Item as={Link} to={`/countries/${g.strArea}`} href="#action3" value={g.strArea}>{console.log(g.idArea)}{g.strArea}</NavDropdown.Item> )}
            </NavDropdown>
        </Nav>
        <Form className="d-flex forms">
            <FormControl
            onChange={(e)=>this.setState({input: e.target.value})} 
            type="search"
            placeholder="Search"
            className="mr-2"
            aria-label="Search"
            />
            <Button variant="outline-success"  as={Link} to={`/search/${this.state.input}`}
      >Search</Button>
        </Form>
        </Navbar.Collapse>
    </Container>
    </Navbar>
                <Container className="shadow mt-5">
                <div className='d-flex justify-content-around flex-wrap'>
                    {this.state.categories.map((s)=>{
                        return(
                            <>
                            <Card  className="p-2 m-2 shadow text:center"  as={Link} to={`/about/${s.strCategory}`} style={{textDecoration: 'none', width: '15rem'}}>
                            <Card.Img  variant="top" src={s.strCategoryThumb} />
                            <Card.Body>
                            <Card.Title className="justifyContent: 'center', alignItems: 'center'">{s.strCategory}</Card.Title>
                            </Card.Body>
                        </Card> 
                        </>
                        )
                    })}
                </div>
                </Container>
        </>
     );
    }
}
