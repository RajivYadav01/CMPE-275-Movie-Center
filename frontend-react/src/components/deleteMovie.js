import React,{Component} from 'react';
import Navbar from '../component/Navbar';
import {Link} from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import '../App.css';

class DeleteMovie extends Component{
    constructor(props){
        super(props);

        this.state = {
            movies : [
                {
                    "title" : "Title 1",
                    "genre" : "Comedy"
                },
                {
                    "title" : "Title 2",
                    "genre" : "Comedy"
                }
            ]
        }
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
                    <td >{m.title}</td>
                    <td >{m.genre}</td>
                </tr>
            )
        })
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
                            <Link to = "/admin/create" params={{movieID : -1}} class="btn btn-success"><i class="material-icons"><span class="glyphicon glyphicon-plus"></span></i> <span>Add New Movie</span></Link>
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
                        <tr>
                            <td>Rajiv Yadav</td>
                            <td>rajiv.yadav@gmail.com</td>
                            <td>89 Chiaroscuro Rd, Portland, USA</td>
                            <td>(171) 555-2222</td>
                            <td>(171) 555-2222</td>
                            <td>
                                <Link to="/admin/create" params={{movieID : "pGNjVTxSB62koss4ATnhSc0QCV4xu9"}} class="edit"><i className="material-icons"><span class="glyphicon glyphicon-pencil"></span></i></Link>
                                <a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Delete"><span class="glyphicon glyphicon-trash"></span></i></a>
                            </td>
                        </tr>
                        <tr>
                            <td>Venkatesh Devale</td>
                            <td>devale.venkatesh@mail.com</td>
                            <td>89 Chiaroscuro Rd, Portland, USA</td>
                            <td>(171) 555-2222</td>
                            <td>(171) 555-2222</td>
                            <td>
                                <a href="#editEmployeeModal" class="edit" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Edit"><span class="glyphicon glyphicon-pencil"></span></i></a>
                                <a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Delete"><span class="glyphicon glyphicon-trash"></span></i></a>
                            </td>
                        </tr>
                        <tr>
                            <td>Thomas Hardy</td>
                            <td>thomashardy@mail.com</td>
                            <td>89 Chiaroscuro Rd, Portland, USA</td>
                            <td>(171) 555-2222</td>
                            <td>(171) 555-2222</td>
                            <td>
                                <a href="#editEmployeeModal" class="edit" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Edit"><span class="glyphicon glyphicon-pencil"></span></i></a>
                                <a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Delete"><span class="glyphicon glyphicon-trash"></span></i></a>
                            </td>
                        </tr>
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