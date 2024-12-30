import { configureStore } from '@reduxjs/toolkit'



export interface RootState {
   
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


const store = configureStore({
    reducer: {
      
    }
})

export default store