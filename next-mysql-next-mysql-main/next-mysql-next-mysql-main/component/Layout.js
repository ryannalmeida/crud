import { useEffect,useState,useContext } from "react";
import Alert from "component/alert";
import Navbar from "component/navbar";
import UsersTable from "component/usersTable";
import {useRouter} from 'next/router';
import AppContext from "context/appContext";
import Pagination from "component/pagination";
import { Paginate } from "helpers/paginate";
import { SearchedResult } from "helpers/search";
import CheckedUser from 'context/checkedUser';

function Layout(){

    const router = useRouter();
    const value = useContext(AppContext);
    const [render , setRender] = useState(false);
    const [searchQuery , setSearchQuery] = useState("");
    const [checkedUser , setCheckedUser] = useState([]);

    const [alertMessage , setAlertMessage] = useState("");
    const [editUser , setEditUser] = useState({
        username : "",
        email : "",
        password : "",
        id : ""
    });
    const [saveUser , setSaveUser] = useState({
        username : "",
        email : "",
        password : ""
    });

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 3;

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    
    let paginatedPosts;
    let searchedResult ;
    if(searchQuery.length > 0){
        searchedResult = SearchedResult(value.state , searchQuery);
        paginatedPosts = Paginate(searchedResult , currentPage , pageSize);
    }else{
        paginatedPosts = Paginate(value.state, currentPage, pageSize);
    }
    


    useEffect(() => {
        // import("bootstrap/dist/js/bootstrap");
        // console.log("editUserArray",editUser);
    },[editUser])

    const handleEditChange = ({target : {name , value}}) => {
        setEditUser({...editUser , [name] : value});
    }

    const handleSaveChange = ({target : {name , value}}) => {
        setSaveUser({...saveUser , [name] : value});
    }

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        const requestOptions = {
            method : "PUT",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(editUser)
        }
        var server = process.env.SERVER ;
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/users/`+editUser.id,requestOptions);
        const data = await response.json();
        if(data){
            setAlertMessage("Data edited successfully");
            document.getElementsByClassName("editCancel")[0].click();
            const editedUser = data;
            const newMyUsers = value.state.filter(user => {
                return user.id != editUser.id
            });
            newMyUsers.push(editedUser);
            value.setMyUsers(newMyUsers);
        }

    }

    const handleAddSubmit = async (e) => {
        e.preventDefault();

        const requestOptions = {
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(saveUser)
        }
        var server = process.env.SERVER ;
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/users/`,requestOptions);
        const data = await response.json();
        // console.log(data);
        setSaveUser({
            username : "",
            email : "",
            password : ""
        })
        if(data){
            
            setAlertMessage("Data added successfully");
            document.getElementsByClassName("addCancel")[0].click();
            const newAddedUser = data;
            const newMyUsers = value.state;
            newMyUsers.push(newAddedUser);
            value.setMyUsers(newMyUsers);
            // console.log(value.state)
            setRender((prev) => !prev);
        }

    }

    const handleDelete = async (userId) => {

        const requestOptions = {
            method : "DELETE"
        }
        var server = process.env.SERVER ;
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/users/`+userId,requestOptions);
        const data = await response.json();
        if(data){
            setAlertMessage("Data deleted successfully");
            const newMyUsers = value.state.filter(value => {
                return value.id != userId;
            })

            value.setMyUsers(newMyUsers);

        }
    }
    return (
        <>
            <CheckedUser.Provider value = {{
                checkedUser : checkedUser ,
                setCheckedUser : setCheckedUser
            }} >
                <div id="addEmployeeModal" className="modal fade">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form onSubmit = {handleAddSubmit}>
                                <div className="modal-header">						
                                    <h4 className="modal-title">Add Employee</h4>
                                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                </div>
                                <div className="modal-body">					
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input type="text" value = {saveUser.username} onChange = {handleSaveChange} className="form-control" name="username" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="email" value = {saveUser.email} onChange = {handleSaveChange} className="form-control" name="email" required />
                                    </div>				
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type="password" value = {saveUser.password} onChange = {handleSaveChange} className="form-control" name="password" required />
                                    </div>				
                                </div>
                                <div className="modal-footer">
                                    <input type="button" className="btn btn-default addCancel" name="submit" data-dismiss="modal" value="Cancel" />
                                    <input type="submit" className="btn btn-success" value="Add" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div id="editEmployeeModal" className="modal fade">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form onSubmit = {handleEditSubmit}>
                                <div className="modal-header">						
                                    <h4 className="modal-title">Edit Employee</h4>
                                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                </div>
                                <div className="modal-body">
                                    <input type="hidden" name="updateId" className = "updateId" />					
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input type="text" value = {editUser.username} onChange = {handleEditChange} className="form-control" name = "username" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="email" value = {editUser.email} onChange = {handleEditChange} className="form-control" name = "email"  required />
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type="password" value = {editUser.password} onChange = {handleEditChange} className="form-control" name="password" required />
                                    </div>				
                                </div>
                                <div className="modal-footer">
                                    <input type="button" name = "submit" className="btn btn-default editCancel" data-dismiss="modal" value="Cancel" />
                                    <input type="submit" className="btn btn-info" value="Save" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="container-xl">
                    <div className="table-responsive d-flex flex-column">
                    
                        <Alert text = {alertMessage} setAlertMessage = {setAlertMessage} style = {alertMessage.length > 0 ? "block" : "none"}  />
                        
                        <div className="table-wrapper">
                            <Navbar setAlertMessage = {setAlertMessage} searchQuery = {searchQuery} setSearchQuery = {setSearchQuery} />
                            <UsersTable paginatedPosts = {paginatedPosts} setEditUser = {setEditUser} handleDelete = {handleDelete} />
                            <Pagination itemCount = {searchQuery.length > 0 ? searchedResult.length : value.state.length} pageSize = {pageSize} currentPage = {currentPage} onPageChange= {onPageChange} />
                        </div>
                    </div>
                </div>
            </CheckedUser.Provider>
            
        </>
    )
}

export default Layout ;