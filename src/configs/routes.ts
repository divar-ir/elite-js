import Home from '../views/Home';
import {ClassicComponentClass, FunctionComponent} from "react";

interface IRoute {
    component: FunctionComponent<any> | ClassicComponentClass<any>
}

const routes: IRoute[] = [
    {
        component: Home,
    },
];

export default routes;
