
function Alert({text , style , setAlertMessage}){

    // console.log("style is ",style);
    const handleAlert = (e) => {
        e.preventDefault();
        setAlertMessage("");
    }

    
    return (
        <>
            <div className="alert w-50 align-self-center alert-success alert-dismissible fade show" style = {{display : style}} role="alert">
                {text}
                <button type="button" className="close"  onClick = {handleAlert}>
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
        
        </>
    )
}

export default Alert;