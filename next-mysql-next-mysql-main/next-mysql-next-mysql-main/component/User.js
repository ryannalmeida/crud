import { useEffect , useContext, useState } from "react";
import CheckedUser from "context/checkedUser";

function User({user , setEditUser , handleDelete , checkedAll , setCheckedAll}){


    async function fetchUser(){
        var server = process.env.SERVER ;
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/users/`+user.id);
        const data = await response.json();
        // console.log(data);
        setEditUser(data);
    }    
    
    const value = useContext(CheckedUser);
    
    function handleChangeCheckbox(e,userId){
        const {checked}  = e.target ; 
        if(checkedAll && !checked){
            setCheckedAll(false);
        }
        if(checked){
            value.setCheckedUser([...value.checkedUser , userId])
        }else{
            const newValues = value.checkedUser.filter(value => {
                return value != userId 
            })
            value.setCheckedUser(newValues)
        }
    }
    return (

        <>
            <tr>
                <td>
                    <span className="custom-checkbox">
                        <input type="checkbox" id="data_checkbox" onChange={(e) => handleChangeCheckbox(e,user.id)} className="data_checkbox" name="data_checkbox" value="" />
                        <label htmlFor="data_checkbox"></label>
                    </span>
                </td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                    <a href="#editEmployeeModal" onClick = { () => fetchUser()} className="edit" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                    <a href="#deleteEmployeeModal" onClick = { () => handleDelete(user.id)} className="delete" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                </td>
            </tr>
        </>
    )
}

export default User;