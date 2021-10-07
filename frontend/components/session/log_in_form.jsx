import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

export default function LogInForm() {
  
  useEffect(() => {
    document.title = `Log In | Robinhodl`;
  });
  
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector((state) => state.session.currentUserId)
  // const currentUser = useSelector((state) => state.session.currentUser)
  const errors = useSelector((state) => state.errors.session);
  // const [user, setUser] = useState({email: "", password: ""});
  const [user, setUser] = useState({ email: "iamgroot@marvel.com", password: "password"});
  const [showDemo, setShowDemo] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(logIn(demo))
    .then(() => {
      history.push('/portfolio');
    })
  }
  
  const logInDemo = (e) => {
    e.preventDefault();
    const demo = {email: "iamgroot@marvel.com", password: "password"};
    setShowDemo(!showDemo)
    setTimeout(() => {
      dispatch(logIn(demo))
      .then(() => {
        history.push('/portfolio');
      })
    }, 1500);
  }

  return (
    <div id="log-in-container">

      <div id="image-container">
        <img src="https://cdn.robinhood.com/assets/generated_assets/632fcb3e7ed928b2a960f3e003d10b44.jpg" />
      </div>

      <div id="form-container">
        <div id="form-inner-container">
          <form onSubmit={handleSubmit}>
            <h3>Welcome to Robinhodl</h3>
            
            <label>
              <p>Email</p>
              <div className="inputs">
                <input type="email" className={showDemo ? "input-visibility" : "demo-placeholder"} onChange={(e) => setUser({...user, email: e.target.value})} value={user.email} required/>
              </div>
            </label>

            <label>
              <p>Password</p>
              <div className="inputs">
                <input type="password" className={showDemo ? "input-visibility" : "demo-placeholder"} onChange={(e) => setUser({ ...user, password: e.target.value })} value={user.password} required/>
              </div>
            </label>

            <p id="sign-up"><Link to="/signup">New to Robinhodl? Sign up instead.</Link></p>
            {/* {this.renderErrors()} */}

          <div id="session-btns">
            <button type="submit">Sign In</button>
            <button type="submit" onClick={logInDemo}>Demo</button>
          </div>
          </form>

        </div>
      </div>
    </div>
  )
}


// class LogInForm extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = { email: "", password: "" }
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.logInDemo = this.logInDemo.bind(this);
//     this.update = this.update.bind(this);
//   }

//   handleSubmit(e) {
//     e.preventDefault();
//     const user = Object.assign({}, this.state);
//     this.props.logIn(user)
//       .then(() => {
//         this.props.history.push('/')
//       })
//   }

//   logInDemo(e) {
//     e.preventDefault();
//     const user = { email: "iamgroot@marvel.com", password: "password" };
//     this.props.logIn(user)
//       .then(() => {
//         this.props.history.push('/portfolio')
//       })
//       .then(() => {
//         this.props.resetErrors
//       })
//   }

//   update(field) {
//     return (e) => this.setState({
//       [field]: e.currentTarget.value
//     });
//   }

//   // renderErrors() {
//   //     return (
//   //         <ul>
//   //             {this.props.errors.map((error, i) => (
//   //                 <li key={`error-${i}`}>
//   //                     {error}
//   //                 </li>
//   //             ))}
//   //         </ul>
//   //     );
//   // }

//   render() {
//     return (
//       <div className="log-in">
//         <div className="image">
//           <img src="https://cdn.robinhood.com/assets/generated_assets/632fcb3e7ed928b2a960f3e003d10b44.jpg" />
//         </div>
//         <div className="form-container">
//           <div className="form">
//             <div className="header">
//               <h3>Welcome to Robinhodl</h3>
//             </div>
//             <br />
//             <form onSubmit={this.handleSubmit}>
//               <label>
//                 <p>Email</p>
//                 <input
//                   type="email"
//                   required
//                   value={this.state.email}
//                   onChange={this.update('email')} />
//               </label>
//               <br />
//               <label>
//                 <p>Password</p>
//                 <input
//                   type="password"
//                   required
//                   value={this.state.password}
//                   onChange={this.update('password')} />
//               </label>
//               <br />
//               {/* <p>Forgot your email or password?</p> */}
//               {/* {this.renderErrors()} */}
//               <button>Log In</button>
//             </form>
//             <br />
//             <form onSubmit={this.logInDemo}>
//               <button>Demo</button>
//             </form>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }

// export default LogInForm;