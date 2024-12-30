import { configureStore } from '@reduxjs/toolkit'

import employeeAuthReducer from '~/features/auth/employeeAuthSlice'
import employerAuthReducer from '~/features/auth/employerAuthSlice'


export interface RootState {
    employeeAuth: {
        employeeToken: string
        employee: {
            _id: string
            isAdmin: boolean
            name: string
            description: string
            avatar: string
            email: string
            gender: string
            phoneNumber: string
            address: {
                country: string
            }
            experience: string
            skill: {
                technical: string[]
                soft: string[]
            }
            education: {
                _id: string
                nameSchool: string
                degree: string
                completeDate: string
            }[]
            certificates: {
                _id: string
                name: string
                issuedBy: string
                from: string
                to: string
            }[]
            joinDate: Date
        }
    }
    employerAuth: {
        employerToken: string
        company: {
            _id: string
            email: string
            phoneNumber: string | null
            companyName: string
            companyEmails: string[]
            companyWebsites: string[]
            companyPhoneNumbers: string[]
            companyLocations: string[]
            companyLogo: string
            description: string | null
        }
    }
    
    
}

export interface userData {
    email: string
    companyName: string
    companyLogo: string
    name: string
    avatar: string
    online: boolean
    _id: string
    users: userData[]
    createdBy: userData
    messages: [
        {
            _id: string
            employerId: string
            companyId: string
            message: string
            senderIsCompany: boolean
        }
    ]
}

const store = configureStore({
    reducer: {
        employeeAuth: employeeAuthReducer,
        employerAuth: employerAuthReducer,
       
    }
})

export default store