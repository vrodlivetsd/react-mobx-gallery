import React, { Component } from 'react';
import StackGrid from 'react-stack-grid';
import loader from '../../assets/svg/loader.svg';
import backBtn from '../../assets/png/backBtn.png';
import {Link} from 'react-router-dom';

class PhotosWrapper extends Component {

    constructor(props) {
        super(props);

        this.state = {
            photosList: [],
            searchInput: ''
        }

        this.updateSearch = this.updateSearch.bind(this);
    }

    componentDidMount() {
        console.log(this.props)
        const { match } = this.props;
        fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${match.params.id}`)
            .then(response => response.json())
            .then(json => {
                console.log(json);
                this.setState({
                    photosList: json
                })
            })
    }

    generateColor() {
        return '#' + Math.random().toString(16).substr(-6);
    }

    updateSearch(e) {
        this.setState({
            searchInput: e.target.value
        }, () => this.grid.updateLayout());
    }

    render() {
        const { photosList, searchInput } = this.state;
        return (
            <div>
                {
                    photosList.length ?
                        <div>
                            <div style={{
                                position: 'relative'
                            }}>
                                    <Link to='/'>    
                                        <img src={backBtn} 
                                            alt='homeBtn' 
                                            style={{
                                                width: '24px',
                                                position: 'absolute',
                                                top: '50%',
                                                left: '32px',
                                                transform: 'translateY(-50%)'
                                            }}
                                        />
                                    </Link>
                                    <h1 style={{
                                        textAlign: 'center'
                                    }}>Photos</h1>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <input
                                    value={searchInput}
                                    type="text"
                                    className="form-control"
                                    placeholder="Search albums by title..."
                                    onChange={this.updateSearch}
                                />
                            </div>
                            <div style={{
                                padding: '2em'
                            }}>
                                <StackGrid
                                    columnWidth={150}
                                    gridRef={grid => this.grid = grid}
                                    monitorImagesLoaded={true}
                                >
                                    {
                                        photosList.filter(el => el.title.includes(searchInput)).map((el, index) =>
                                        <div key={el.id}>
                                            <img src={el.thumbnailUrl} alt={el.title}/>
                                            <span style={{
                                                position: 'absolute',
                                                left: 0,
                                                bottom: '4px',
                                                fontSize: '14px',
                                                padding: '2px',
                                                background: 'rgba(0,0,0,.4)',
                                                color: 'white',
                                                width: 'calc(100% - 4px)',
                                                textOverflow: 'ellipsis',
                                                overflow: 'hidden',
                                                whiteSpace: 'nowrap'
                                            }}>{el.title}</span>
                                        </div>
                                        )
                                    }
                                </StackGrid>
                            </div>
                        </div> :
                        <img src={loader} alt="loader" style={{
                            width: '6em',
                            display: 'flex',
                            margin: 'auto',
                            height: '-webkit-fill-available'
                        }} />
                }
            </div>
        );
    }
}

export default PhotosWrapper;