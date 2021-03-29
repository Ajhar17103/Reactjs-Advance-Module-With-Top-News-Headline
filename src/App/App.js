import React, { Component } from 'react'
import Header from '../Component/Header'
import Loading from '../Component/Loading'
import NewsList from '../Component/NewsList'
import Pagination from '../Component/Pagination'
import News, {newsCategory} from '../news/index'
import axios from'axios';
 

let news =new News(newsCategory.technology);
 
class App extends Component {
    state={
        data:{},
        isLoading: true,
       
    }
      aboutResult=React.createRef();
      jumbortaonRef=React.createRef();
    
  

    componentDidMount(){
      news.getNews()
     .then((data)=>{
        
         this.setState({data, isLoading:false})
      })
     .catch(e=>{
        console.log(e);
        alert('something   went worng');
        this.setState({isLoading:false})
     })
    
     console.log(this.jumbortaonRef);
       
    }

    next =()=>{

        if(this.state.data.isNext){
            this.setState({isLoading:true})
        }
        news.next()
        .then(data=>{
            this.setState({data, isLoading:false});
        })
        .catch( e=>{
            console.log(e);
            alert('something Went Worng');
            this.setState({isLoading:false});
        }
        )
    }
    prev=()=>{
        if(this.state.data.isPrevious){
            this.setState({isLoading:true})
        }
        news.prev()
        .then(data=>{
            this.setState({data, isLoading:false});
        })
        .catch( e=>{
            console.log(e);
            alert('something Went Worng');
            this.setState({isLoading:false});
        }
        )
    }
    handlePageChange= (value) =>{
        this.setState({
            data:{
                ...this.state.data,
                currrentPage: Number.parseInt(value),

            } 
        })
    }
    gotoPage=()=>{
        this.setState({isLoading:true})
        news.setCurrentPage(this.state.data.currentPage)
        .then(data=>{
            this.setState({data, isLoading:false})
        })
        .catch(e=>{
            console.log(e);
            alert('sometings went to worng');
            this.setState({isLoading:false})
        })
    }
    changeCategory=(category)=>{
        this.setState({isLoading:true})
        news.changeCategory(category)
        .then(data=>{
            this.setState({data, isLoading:false})
        })
        .catch(e=>{
            console.log(e);
            alert('sometings went to worng');
            this.setState({isLoading:false})
        })

    }
    search=(searchTerm)=>{
        this.setState({isLoading:true})
        news.changeCategory(searchTerm)
        .then(data=>{
            this.setState({data, isLoading:false})
        })
        .catch(e=>{
            console.log(e);
            alert('sometings went to worng');
            this.setState({isLoading:false})
        })
    }
    gotoTop=()=>{
        window.scroll(0, this.aboutResult.current.scrollTop)
    }
    
    
    render( ){
      let {
          article,
          isPrevious,
          isNext,
          category,
          totalResults,
          currentPage,
          totalPage

      }=this.state.data
       console.log(this.aboutResult);
        return (
          
           
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-6 offset-md-3'>
                        <Header category={category} 
                      changeCategory={this.changeCategory}
                      search={this.search} />
 
                        <div ref={this.aboutResult}
                        className='d-flex'>
                            <p className='text-black-50 ml-auto'>
                                About {totalResults}   result found

                            </p>

                            <p className='text-black-50 ms-auto'>
                               {currentPage} page {totalPage}

                            </p>

                        </div>

                    {this.state.isLoading ? (
                        <Loading/>
                     ): (
                         <div> 
                         <NewsList news={article} />

                         <Pagination
                         next={this.next}
                         prev={this.prev}
                         isPrevious={isPrevious}
                         isNext={ isNext}
                         currentPage={currentPage}
                         totalPage={totalPage}
                         handlePageChange={this.handlePageChange}
                         gotoPage={this.gotoPage}
                         />
                         <button className='btn btn-success my-4  ml-auto' onClick={this.gotoTop}>Go to Top</button>
                         </div>
                     )}
                     
                     
                     
      
                    </div>
                </div>
            </div>
        );

    } 
        
}
export default App;