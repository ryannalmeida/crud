import User from "component/user";
import {useEffect , useState} from 'react';
import { useContext } from "react";
import AppContext from "context/appContext";
import CheckedUser from "context/checkedUser";

function UsersTable({setEditUser , handleDelete , paginatedPosts}){

	const [checkedAll , setCheckedAll] = useState(false);


	// useEffect(() => {
	// 	const fetchUsers = async () => {
	// 		const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/users`);
	// 		const data = await response.json();
	// 		setUsers(data);
	// 	}
	// 	fetchUsers() ;
	// },[])


	const value = useContext(AppContext);
	const checkedUserCont = useContext(CheckedUser);
	let checkedUser = [];

	function handleSelectAllChange(e){
		const checkboxes = document.querySelectorAll("table tbody input[type='checkbox']");
		if(e.target.checked){
			setCheckedAll(true);
			checkboxes.forEach(checkbox => {
				checkbox.checked = true;
			})		
			paginatedPosts.map(post => {
				checkedUser.push(post.id)
			})

		}else{
			setCheckedAll(false);
			checkboxes.forEach(checkbox => {
				checkbox.checked = false;
			})
			checkedUser = [];
		}

		checkedUserCont.setCheckedUser(checkedUser);
	}
	// console.log("checked user : ",checkedUserCont.checkedUser)
	

	const userGenerator = () => {
		return (
			<>
				{
					paginatedPosts.map(user => {
						return (
							<User key={user.id} checkedAll = {checkedAll} setCheckedAll = {setCheckedAll} user = {user} setEditUser = {setEditUser} handleDelete = {handleDelete} />
						)
					})
				}
			</>
		)
	}
	
    return (

        <>
            <table className="table table-striped table-hover">
				<thead>
					<tr>
						<th>
							<span className="custom-checkbox">
								<input type="checkbox" id="selectAll" onChange = {(e) => handleSelectAllChange(e)} checked={checkedAll} />
								<label htmlFor="selectAll"></label>
							</span>
						</th>
						<th>Name</th>
						<th>Email</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{userGenerator()}
				</tbody>
			</table>
        </>
    )
}

export default UsersTable ; 