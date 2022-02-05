import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

PostFiltersForm.propTypes = {
    onsubmit: PropTypes.func,
};

PostFiltersForm.defaultProps = {
    onsubmit: null,
}
function PostFiltersForm(props) {
    const {onsubmit} = props;
    const [searchTerm, setSearchTerm] = useState('');
    const typingTimeoutRef = useRef(null);

    function handleSearchTermChange(e){
        const value = e.target.value;
        setSearchTerm(value);

        if(!onsubmit) return;

        if(typingTimeoutRef.current){
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
            const formValues = {
                searchTerm: value,
            };
            onsubmit(formValues);
        }, 300);
    }

    return (
        <form>
            <input type="text" 
            value={searchTerm}
            onChange={handleSearchTermChange}/>
        </form>
    );
}

export default PostFiltersForm;