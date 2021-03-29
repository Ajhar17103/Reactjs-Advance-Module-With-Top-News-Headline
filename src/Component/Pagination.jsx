import React, { Component } from 'react'

class Pagination extends Component {
    state={
        isEditable:false,

    }
    render() {
        let {
            currentPage,
            totalPage,
            next,
            prev,
            isPrevious,
            isNext,
            handlePageChange,
           gotoPage

        }=this.props
        return (
            <div className='d-flex my-5 align-items-center'>
                <button className='btn btn-warning' /*disabled={!isPrevious} */ onClick={()=>{
                    prev();
                }}>
                    Previous
                </button>
                <div className='flex-grow-1 text-center'>
                {this.state.isEditable ? (
                    <input type='number' value={currentPage} onChange={e=> handlePageChange(e.target.value)} onKeyPress={e=>{
                        if(e.key =='Enter'){
                            gotoPage();
                          this.setState({isEditable: false})  
                        }
                    }
                }
                    />
                ):(<p style={{userSelect:'none', lineHeight:'1.1'}} 
                title='Double Tap To Jum Page'
                onDoubleClick={()=>{
                    this.setState({isEditable: !this.state.isEditable})
                }}
                
                >
                    {currentPage} of {totalPage}
                    <br/>
                    <small>Double Tap to Edit</small>
                </p>
                )}
                </div>
                <button className='btn btn-warning ml-5' disabled={!isNext} onClick={()=>{
                    next();
                }}>
                    Next
                </button>
                
            </div>
        )
    }
}

export default Pagination;
