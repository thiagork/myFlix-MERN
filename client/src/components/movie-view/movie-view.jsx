import React from 'react';
import { MainView } from '../main-view/main-view';

export class MovieView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const { movie, resetCallback } = this.props;

        if (!movie) return null;

        return (
            <div className='movie-view'>
                <div className='movie-title'>
                    <div className='label'>Title</div>
                    <div className='value'>{ movie.Title }</div>
                </div>
                <div className='movie-description'>
                    <div className='label'>Description</div>
                    <div className='value'>{ movie.Description }</div>
                </div>
                <div className='movie-genre'>
                    <div className='label'>Genre</div>
                    <div className='value'>{ movie.Genre.Name }</div>
                </div>
                <div className='movie-director'>
                    <div className='label'>Director</div>
                    <div className='value'>{ movie.Director.Name }</div>
                </div>
                <div className='return-button'>
                    <button id='return-button__movie-view' onClick={()=> {resetCallback()}}>Return</button>
                </div>
            </div>
        );
    }
}