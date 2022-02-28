import React from 'react';

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    role: string;
    frozen: boolean;
    urlaubstage: string;
}
