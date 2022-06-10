import React from 'react';
import Character from './Character';

const Section = (props) => {

    const source = props.source;
    const template = Array(props.answer.length).fill({
        value: '',
        color: ''
    });
    const fields = template.map((item, index) => source[index] ? source[index] : item);

    return (
        <div>
            {fields.map((item, index) => {
                return (
                    <Character key={index} color={item.color} value={item.value}/>
                );
            })}
        </div>
    );

};
export default Section;
