import '../Auth/Auth.css';

const AuthForm = ({state, entryFn, setState, setLoggingIn, loggingIn}) => {
    const inputsArr = [
        {label: "first_name", type: "text"},
        {label: "last_name", type: "text"},
        {label: "phone_number", type: "tel"},
        {label: "email", type: "email"},
        {label: "username", type: "text"},
        {label: "password", type: "password"},
        {checkbox: true, name: "dm", label: "dm", type: "checkbox"},
        {checkbox: true, name: "online", label: "online", type: "checkbox"}
    ]

    const dynamicArr = loggingIn ? inputsArr.splice(4, 2) : inputsArr
    const inputsMapped = dynamicArr.map(input => (
        <div className="auth-inputs" key={input.label}>
            <label>{input.label}</label>
            {!input.checkBox ? <input name={input.label} type={input.type} placeholder={input.name} onChange={e => changeHandler(e)}/> 
            : <input placeholder={input.label} type="checkbox" name={input.name} onClick={e => changeHandler(e)} /> }
        </div>
    ))

    const changeHandler = e => setState({...state, [e.target.name]: e.target.value})

    return (
        <div className='Auth'>
            <form className="auth-form" onSubmit={e => entryFn(e)}>
                <h1>D&D Find Me</h1>
                <h2>{loggingIn ? "Login" : "Register" }</h2>
                <h3>{loggingIn ? null : "(Please enter your phone number as: +1XXXXXXXXXX)"}</h3>
                {inputsMapped}
                <button className="entry-button" type="submit">
                    {loggingIn ? "Login" : "Register"}
                </button>
            </form>
            <button className="view-button" onClick={() => setLoggingIn(!loggingIn)}>
                {loggingIn ? "Need an account?" : "Already Registered?"}
            </button>
        </div>
    )
}

export default AuthForm