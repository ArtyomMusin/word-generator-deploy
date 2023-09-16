import { FC, ReactElement } from 'react'

interface IProps {
    children: ReactElement | ReactElement[]
}

const Layout: FC<IProps> = ({ children }) => {
    return (
        <div className="p-3">
            {children}
        </div>
    )
}

export default Layout
