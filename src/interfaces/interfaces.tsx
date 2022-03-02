import React from 'react';

export interface User {
    id: string;
    firstname: string;
    lastname: string;
    password: string;
    email: string;
    role: string;
    frozen: boolean;
    urlaubstage: string;
}
