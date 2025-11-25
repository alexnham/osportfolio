import React from 'react';

type IconProps = {
    name: string;
    onClick: () => void;
    component?: string;
}


const Icon: React.FC<IconProps> = ({ name, onClick }) => {
    return (
        <div className="icon" onClick={onClick}>
            <img src={`/${name}.png`} alt={`${name} icon`} />
            <span>{name}</span>
        </div>
    );
};

export default Icon;