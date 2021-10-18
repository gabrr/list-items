import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { SignIn, Home } from 'pages'
import { ComponentWithTitle } from "routes/ComponentWithTitle";

const routes = [
    { title: 'Sign In', component: SignIn, path: '/signin', isProtected: false },
    { title: 'Home', component: Home, path: '/' , isProtected: true },
]

export const Routes: React.FC<{}> = () => {

    return (
        <BrowserRouter>
            <Switch>
                {
                    routes.map(({ component, path, title, isProtected  }) => {
                        
                        return (
                            <Route path={path}>
                                {ComponentWithTitle({ component, title })}
                            </Route>
                        )
                    })
                }
            </Switch>
        </BrowserRouter>
    )
}
