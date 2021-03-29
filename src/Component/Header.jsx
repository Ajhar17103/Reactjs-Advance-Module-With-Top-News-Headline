import React, { Component, createRef } from 'react'
import {newsCategory} from '../news';

 class Header extends Component {
    state={
        searchTerm:''
    }
    searchFocus=createRef();
    handleChange=(e)=>{
        this.setState({searchTerm: e.target.value})
    }
    onkeypress=(e)=>{
        if(e.key=='Enter'){
            this.props.search(this.state.searchTerm)
        }
    }
    componentDidMount(){
         this.searchFocus.current.focus();
    }
    render() {
        let {category,changeCategory}=this.props
         
         
        return (
            <div className='my-4'>
                <h1 className=' mb-4 ' style={{fontWeight:'300'}}>
                    Block Buster Headline
                </h1>
                <input
                ref={this.searchFocus}
                type='search'
                className='form-control'
                placeholder='Type Anythings & Press Enter For Search'
                value={this.state.searchTerm}
                onChange={this.handleChange}
                onKeyPress={this.onkeypress}
                />
                <div className='my-4'>
                    {newsCategory && Object.keys(newsCategory).map(item=>{
                        if(category==newsCategory[item]){
                            return(
                            <button 
                            onClick={()=>
                                changeCategory(newsCategory[item])
                           } 
                            className='btn btn-sm btn-warning mr-2 mb-2'
                            >
                             {`#${newsCategory[item]}`}

                            </button>
                            );
                        }
                        return(
                            <button 
                            onClick={()=>
                                changeCategory(newsCategory[item])
                           } 
                           
                            className='btn btn-sm btn-light mr-2 mb-2'
                            >
                                {`#${newsCategory[item]}`}

                            </button>
                        );
                    })
                    }

                </div>
                
            </div>
        )
    }
}

export default Header;
