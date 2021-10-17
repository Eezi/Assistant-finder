export interface UserFormTypes {
    name: string,
    email: string,
    phone: string,
    region: string,
    gender?: string,
    userType: string,
    experience?: string,
    description?: string,
    busyStartDate?: string,
    busyEndDate?: string,
    password: string,
    confirmPassword: string,
}

export interface Message {
    message: string
    receiverHasRead: boolean
    createdBy: string
    createdAt: string
}

export interface ChatTypes {
    createdBy: string
    participatedUser: string
    createdAt: string
    messages: Message[]
    _id: string
}