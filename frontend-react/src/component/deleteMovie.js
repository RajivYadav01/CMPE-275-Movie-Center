import React,{Component} from 'react';
import Navbar from '../component/Navbar';
import {Link} from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import '../App.css';
import axios from 'axios';
import {api} from '../store/actions';

class DeleteMovie extends Component{
    constructor(props){
        super(props);

        this.state = {
            movies : [
                // {
                //     "title" : "Title 1",
                //     "genre" : "Comedy"
                // },
                // {
                //     "title" : "Title 2",
                //     "genre" : "Comedy"
                // }
            ]
        }
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
    handleChange = (e) => {
        var filter, table, tr, td, i, txtValue;
        filter = e.target.value.toUpperCase();
        console.log("Filter : ", filter);
        table = document.getElementById("myTable");
        console.log("Table : ", table);
        tr = table.getElementsByTagName("tr");
        console.log("TR : ", tr);
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
            }       
        }
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
        movieDetails = this.state.movies.map((m,index) => {
            return(
                <tr>
                    <td><Link to= {`/movieDetails/${m.movieId}`}>{m.title}</Link></td>
                    <td>{m.actors}</td>
                    <td>{m.actresses}</td>
                    <td>{m.director}</td>
                    <td>{m.price}</td>
                    <td>
                        <Link to= {`/admin/create/${m.movieId}`} class="edit"><i className="material-icons"><span class="glyphicon glyphicon-pencil"></span></i></Link>
                        <a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Delete"><span class="glyphicon glyphicon-trash"></span></i></a>
                    </td>
                </tr>
            )
        })
        let temp = 1;
        return(
            <div>
                <Navbar/>
                <br/><br/>
                
                <br/><br/>
                <div class="table-title">
                    <div class="row">
                        <div class="col-sm-6">
                            <h2>Manage Movies</h2>
                        </div>
                        <div class="col-sm-6">
                            <Link to = {`/admin/create/-1`}  class="btn btn-success"><i class="material-icons"><span class="glyphicon glyphicon-plus"></span></i> <span>Add New Movie</span></Link>
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
                                <th>Actresses</th>
                                <th>Director</th>
                                <th>Year of Release</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {movieDetails}
                        </tbody>
                    </table>
                    {/* <ReactPaginate previousLabel={"previous"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={this.state.pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"} /> */}
                </div>
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
                                    <input type="submit" class="btn btn-danger" value="Delete"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DeleteMovie;