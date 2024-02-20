import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { CreateComponent } from './create/create.component';

export const routes: Routes = [
    {
        path: '', component: UsersComponent
    },
    {
        path: 'create', component: CreateComponent
    },
    {
        path: 'edit/:id', component: CreateComponent
    }
];
