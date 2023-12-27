import React from 'react';
import './header.css';

interface HeaderProps {
    
};

const Header: React.FC<HeaderProps> = () => {
    return(
        <header>
            <h1>
            Welcome to my app
            </h1>
        </header>
    )
}

export default Header