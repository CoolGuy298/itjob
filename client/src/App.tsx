// import "./App.css"
import {  useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { AxiosResponse } from 'axios'
// import { RootState } from './store'
// import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { getCurrentEmployee } from './services/api'
import { setToken, setEmployee } from '~/features/auth/employeeAuthSlice'
import Navbar from './components/layout/Navbar'
import { Outlet } from 'react-router-dom'


// import Navbar from './components/layout/Navbar'



const App = () => {
//    return (
//         <>
//           <div className='bg-white'>
//                 <div className='mx-auto w-2/3'>
//                     <Navbar />
//                 </div>
//             </div>

//         <Outlet/>
        
//         </>
        
//     )


//   const [age,setAge] = useState(0);
//   const isGreen = true;
//   const users = [
//     {name : "trung",age : 18},
//      {name: "tung", age :30},  
// ];
 
//   const increaseAge = () => {
//    setAge(age+1);
//   }

//   const [showText, setShowText] = useState(true);



//   const [todoList, setTodoList] = useState([]);
//   const [newTask, setNewTask] = useState("");

//   const handleChange = (event) => {
//     setNewTask(event.target.value);
//   }

//   const addTask = () => {
//     const newTodoList = [...todoList, newTask];
//     setTodoList(newTodoList);
//   }


const location = useLocation()
const isEmployeeCompanyDetail = location.pathname.includes('/companyAllDetail')
const isHome = location.pathname === '/'
// const user = useSelector((state: RootState) => state.employeeAuth.employee || state.employerAuth.company)


const dispatch = useDispatch()

    useEffect(() => {
        const token = localStorage.getItem('employeeToken')
        console.log('Get token', token)
        if (token) {
            dispatch(setToken(token))
            getCurrentEmployee(token).then((response: AxiosResponse<unknown, unknown> | undefined) => {
                if (response) {
                    dispatch(setEmployee(response.data))
                }
            })
        }
    }, [dispatch])


  return (
    <div className='App'>
        {/* {age >= 18 ? <h1> Over age</h1> : <h1>Under age</h1>}
        <h1 style={{color : isGreen ? "green" : "red"}}>This has a color </h1>
        {isGreen && <button>  This is a button </button>}
        {users.map((user,key) => {
            return <Users name={user.name} age ={user.age} />
        })}

        {age} <button onClick={increaseAge}  className='w-10000'> Increase age</button>

        <button onClick={ () => {
          setShowText(!showText);
        }}>
          Show/Hide
        </button>

        {showText && <h1> Click to show/hide text</h1>  } */}
          
        {/* <div className='addTask'>
          <input onChange={handleChange}/>
          <button onClick={addTask}> Add Task</button>
        </div>

        <div className='list'>
          {todoList}
        </div> */}

<div className='bg-beautiful'>
                <div className='mx-auto w-2/3'>
                    <Navbar />
                </div>
            </div>
            <div className={`mx-auto ${isEmployeeCompanyDetail ? 'w-full' : 'w-2/3'} ${isHome ? 'w-full' : 'w-2/3'}`}>
                <Outlet />
            </div>

      


    </div>
    
  );
}

// const Users = (props) => {
//     return <h1> {props.name} {props.age}</h1>;


// }
export default App
