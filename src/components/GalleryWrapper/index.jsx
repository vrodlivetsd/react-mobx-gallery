import React, { Component } from 'react';
import StackGrid from 'react-stack-grid';
import loader from '../../assets/svg/loader.svg';
import { Route, Link } from 'react-router-dom'

class GalleryWrapper extends Component {

    constructor(props) {
        super(props);

        this.state = {
            albumsList: [],
            searchInput: ''
        }
        
        this.updateSearch = this.updateSearch.bind(this);
    }

    componentWillMount() {
        fetch("https://jsonplaceholder.typicode.com/albums")
            .then(response => response.json())
            .then(json => {
                console.log(json);
                this.setState({
                    albumsList: json
                });
            })
    }

    generateColor () {
        return '#' +  Math.random().toString(16).substr(-6);
    }

    updateSearch(e){
        this.setState({
            searchInput: e.target.value
        }, () => this.grid.updateLayout());
    }

    render() {
        const { albumsList, searchInput } = this.state;
        return (
            <div>
                {
                    albumsList.length ? 
                        <div>
                            <h1 style={{
                                textAlign: 'center'
                            }}>Albums</h1>
                            <div style={{textAlign: 'center'}}>
                                <input
                                    value={searchInput}
                                    type="text"
                                    className="form-control"
                                    placeholder="Search albums by title..."
                                    onChange={this.updateSearch}
                                />
                            </div>
                            <div  style={{
                                padding: '2em'
                            }}>
                                <StackGrid
                                    columnWidth={250}
                                    gridRef={grid => this.grid = grid}
                                >
                                {
                                    albumsList.length ? albumsList.filter(el => el.title.includes(searchInput)).map( (el, index) => 
                                        
                                        <Link key={el.id} style={{
                                            color: 'white',
                                            textDecoration: 'none'
                                        }} to={`/photos/${el.id}`}>
                                            <div style={{
                                                padding: '2em',
                                                textAlign: 'center',
                                                background: this.generateColor(),
                                                margin: '0.5em',
                                                fontSize: '21px',
                                                borderRadius: '0.5em',
                                                cursor: 'pointer'
                                            }}
                                            >
                                                {el.title}
                                            </div>
                                        </Link>
                                    ) :
                                    null
                                }
                                </StackGrid>
                            </div>
                        </div> :
                    <img src={loader} alt="loader" style={{
                        width: '6em',
                        display: 'flex',
                        margin: 'auto',
                        height: '-webkit-fill-available'
                    }}/>
                }
            </div>
        );
    }
}

export default GalleryWrapper;