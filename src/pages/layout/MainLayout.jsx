import Navbar from './Navbar'

function MainLayout({ children }) {
    return (
        <div className='main-layout'>
            <Navbar></Navbar>
            <div className='content'>{children}</div>
        </div>
    )
}

export default MainLayout