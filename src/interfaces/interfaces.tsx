export interface User {
    id: string
    firstname: string
    lastname: string
    password: string
    email: string
    role: string
    frozen: boolean
    urlaubstage: string
}

export interface TimeTableDay {
    absenceStatus: string
    breakLength: number
    date: string
    employee: User
    endTime: string
    expectedHours: number
    finalized: boolean
    holidayHours: number
    project: Project
    sickHours: number
    startTime: string
    workdayId: string
}

export interface Project {
    id: string
    title: string
    start: string
    end: string
}

export interface Customer {
    id: string
    name: string
    address: string
    projects: Project[]
}