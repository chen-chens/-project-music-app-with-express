export interface RoutesType{
    path: string;
    element: JSX.Element;
    children?: RoutesType[]
}