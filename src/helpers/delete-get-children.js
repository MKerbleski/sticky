// import axios from 'axios'

// export const getChildren = (children) => {

//     if(localStorage.getItem('JWT')){
//         const token = localStorage.getItem('JWT')
//         const authHeader = {
//             headers: { Authorization: token }
//         }
//         axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/notes/children`, ({children}), authHeader).then(res => {
//             console.log(res.data.children)
//             return res.data.children
//         }).catch(err => {
//             console.log(err)
//             return null
//         })
//     } else {
//         console.log('there was no token found')      
//     }
// }