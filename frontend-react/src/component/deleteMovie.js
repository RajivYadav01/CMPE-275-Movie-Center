import React,{Component} from 'react';
import Navbar from '../component/Navbar';
import {Link} from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import {api} from '../store/actions';
import {connect} from 'react-redux';
import {DeleteMovieFunc} from '../store/actions';
import Pagination from './Pagination';


class DeleteMovie extends Component{
    constructor(props){
        super(props);

        this.state = {
            movies : [],
            deleteMovieId : null,
            pageOfItems: []
        }
        this.onChangePage = this.onChangePage.bind(this);
    }

    onChangePage(pageOfItems) {
        this.setState({ pageOfItems: pageOfItems});
    }
    handleDelete = (e) =>{
        this.props.onSubmitDeleteClicked(this.state.deleteMovieId);
    }

    componentWillMount(){
        console.log("API : ", api);
        var headers = new Headers();
        // axios.get(`${api}/movies`,{
            
        // })
        axios({
            method:'get',
            url: `${api}/movies/`,
            headers: headers,
        })
        .then((response) => {
            this.setState({
                movies : this.state.movies.concat(response.data)
            })
        })
    }
    handleMovieToDelete = (e,movieID) => {
        // document.getElementById("deleteModal").click();
        this.setState({
            deleteMovieId : movieID
        })
    }
    handleChange = (e) => {
        var flag = 0;
        var filter, table, tr, td, i, txtValue;
        filter = e.target.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    flag = 1;
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }       
        }
        if(flag == 0){
            for (i = 0; i < tr.length; i++) {
                td = tr[i].getElementsByTagName("td")[1];
                if (td) {
                    txtValue = td.textContent || td.innerText;
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        flag = 1;
                        tr[i].style.display = "";
                    } else {
                        tr[i].style.display = "none";
                    }
                }       
            }
        }
        if(flag == 0){
            for (i = 0; i < tr.length; i++) {
                td = tr[i].getElementsByTagName("td")[2];
                if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    flag = 1;
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
                }       
            }
        }
        if(flag == 0){
            for (i = 0; i < tr.length; i++) {
                td = tr[i].getElementsByTagName("td")[3];
                if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    flag = 1;
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
                }       
            }
        }
        if(flag == 0){
            for (i = 0; i < tr.length; i++) {
                td = tr[i].getElementsByTagName("td")[4];
                if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    flag = 1;
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
                }       
            }
        }
        if(flag == 0){
            for (i = 0; i < tr.length; i++) {
                td = tr[i].getElementsByTagName("td")[5];
                if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    flag = 1;
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
                }       
            }
        }
        
        // for (i = 0; i < tr.length; i++) {
        //     td = tr[i].getElementsByTagName("td")[3];
        //     if (td) {
        //     txtValue = td.textContent || td.innerText;
        //     if (txtValue.toUpperCase().indexOf(filter) > -1) {
        //         tr[i].style.display = "";
        //     } else {
        //         tr[i].style.display = "none";
        //     }
        //     }       
        // }
        // for (i = 0; i < tr.length; i++) {
        //     td = tr[i].getElementsByTagName("td")[4];
        //     if (td) {
        //     txtValue = td.textContent || td.innerText;
        //     if (txtValue.toUpperCase().indexOf(filter) > -1) {
        //         tr[i].style.display = "";
        //     } else {
        //         tr[i].style.display = "none";
        //     }
        //     }       
        // }
        // for (i = 0; i < tr.length; i++) {
        //     td = tr[i].getElementsByTagName("td")[5];
        //     if (td) {
        //     txtValue = td.textContent || td.innerText;
        //     if (txtValue.toUpperCase().indexOf(filter) > -1) {
        //         tr[i].style.display = "";
        //     } else {
        //         tr[i].style.display = "none";
        //     }
        //     }       
        // }
    }
    render(){
        console.log("Movies : ", this.state.movies);
        const inputStyle = {
            backgroundPosition: "10px 10px",
            backgroundRepeat: "no-repeat",
            width: "100%",
            fontSize: "16px",
            padding: "12px 20px 12px 40px",
            border: "1px solid #ddd",
            marginBottom: "12px"
        }
        let movieDetails = null;
        movieDetails = this.state.pageOfItems.map((m,index) => {
            return(
                <tr>
                    <td><Link to= {`/movieDetails/${m.movieId}`}>{m.title}</Link></td>
                    <td>{m.actors}</td>
                    <td>{m.director}</td>
                    <td>{m.genre}</td>
                    <td>{m.mpaaRating}</td>
                    <td>{m.yearOfRelease}</td>
                    <td>
                        <Link to= {`/admin/create/${m.movieId}`} class="edit"><i className="material-icons"><span class="glyphicon glyphicon-pencil"></span></i></Link>
                        <Link onClick={(e) => this.handleMovieToDelete(e,m.movieId)} to="#deleteEmployeeModal" class="delete" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Delete"><span class="glyphicon glyphicon-trash"></span></i></Link>
                    </td>
                </tr>
            )
        })
        let temp = 1;
        return(
            <div>
                <Navbar/>
                <br/><br/>
                <div class="bg-wrapper" style={{opacity : "0.25"}}> 
                    <img class="bg-img " src="https://assets.nflxext.com/ffe/siteui/vlv3/ce576f63-f84d-4d38-ba8c-2034ffd002f5/e048a956-ef72-45c7-b620-ad084eba25c3/US-en-20181126-popsignuptwoweeks-perspective_alpha_website_small.jpg" srcset="https://assets.nflxext.com/ffe/siteui/vlv3/ce576f63-f84d-4d38-ba8c-2034ffd002f5/e048a956-ef72-45c7-b620-ad084eba25c3/US-en-20181126-popsignuptwoweeks-perspective_alpha_website_small.jpg 1000w, https://assets.nflxext.com/ffe/siteui/vlv3/ce576f63-f84d-4d38-ba8c-2034ffd002f5/e048a956-ef72-45c7-b620-ad084eba25c3/US-en-20181126-popsignuptwoweeks-perspective_alpha_website_medium.jpg 1500w, https://assets.nflxext.com/ffe/siteui/vlv3/ce576f63-f84d-4d38-ba8c-2034ffd002f5/e048a956-ef72-45c7-b620-ad084eba25c3/US-en-20181126-popsignuptwoweeks-perspective_alpha_website_large.jpg 1800w" alt="" />
                </div>
                <br/><br/>
                <div class="table-title">
                    <div class="row">
                        <div class="col-sm-3">
                            <h2>Manage Movies & Users</h2>
                        </div>
                        <div class="col-sm-2" style={{width : "15%"}}>
                            <Link to = {`/admin/create/-1`}  class="btn btn-success"><i class="material-icons"><span class="glyphicon glyphicon-plus"></span></i> <span>Add New Movie</span></Link>
                        </div>
                        <div class="col-sm-2" style={{width : "15%"}}>
                            <Link to = {`/admin/useractivity`}  class="btn btn-success"><i class="material-icons"><span class="glyphicon glyphicon-plus"></span></i> <span>User Activity</span></Link>
                        </div>
                        <div class="col-sm-2" style={{width : "15%"}}>
                            <Link to = {`/admin/movieactivity`}  class="btn btn-success"><i class="material-icons"><span class="glyphicon glyphicon-plus"></span></i> <span>Movie Activity</span></Link>
                        </div>
                        <div class="col-sm-2" style={{width : "15%"}}>
                            <Link to = {`/admin/financialreporting`}  class="btn btn-success"><i class="material-icons"><span class="glyphicon glyphicon-plus"></span></i> <span>Financial Reporting</span></Link>
                        </div>
                        <div class="col-sm-2" style={{width : "15%"}}>
                            <Link to = {`/admin/manageuser`}  class="btn btn-success"><i class="material-icons"><span class="glyphicon glyphicon-plus"></span></i> <span>Users Details</span></Link>
                        </div>
                    </div>
                </div>
                <br/>
                <input style = {inputStyle} type="text" id="myInput" onKeyUp = {this.handleChange} placeholder="Search for Movies by any filter" title="Type in a name"></input>
                <br/><br/>
                <div className="table-responsive" style = {{backgroundColor : "white"}}>
                    <br/>
                    <table id="myTable"  class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Movie Title</th>
                                <th>Actors</th>
                                <th>Director</th>
                                <th>Genre</th>
                                <th>MPAA Rating</th>
                                <th>Year of Release</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {movieDetails}
                        </tbody>
                    </table>
                </div>
                <Pagination items={this.state.movies} onChangePage={this.onChangePage} />
                <div id="deleteEmployeeModal" class="modal fade">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <form>
                                <div class="modal-header">						
                                    <h4 class="modal-title">Delete Movie</h4>
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                </div>
                                <div class="modal-body">					
                                    <p>Are you sure you want to delete this Record?</p>
                                    <p class="text-warning"><small>This action cannot be undone.</small></p>
                                </div>
                                <div class="modal-footer">
                                    <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel"/>
                                    <input onClick={this.handleDelete} type="submit" class="btn btn-danger" value="Delete"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    console.log("Inside map dipatch to props");
    return{
        onSubmitDeleteClicked : (details) => dispatch(DeleteMovieFunc(details)),
    }
}


export default connect(null,mapDispatchToProps)(DeleteMovie);