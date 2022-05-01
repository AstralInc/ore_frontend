import propTypes from 'prop-types';
import React from 'react';
import Spinner from './spinner';

export default class Button extends React.Component {
    static defaultProps = {
        className: ['btn'],
        color: 'primary',
        isDisabled: false,
        isPending: false
    };

    static propTypes = {
        className: propTypes.arrayOf(propTypes.string),
        color: propTypes.oneOf([
            'primary', 'outline-primary',
            'secondary', 'outline-secondary',
            'success', 'outline-success',
            'danger', 'outline-danger',
            'warning', 'outline-warning',
            'info', 'outline-info',
            'light', 'outline-light',
            'dark', 'outline-dark'
        ]),
        size: propTypes.oneOf(['sm', 'lg'])
    };
    
    render() {
        let { className, children, color, size, type, isDisabled, isPending } = this.props;

        className.splice(1, 0, `btn-${color}`);
        if(!!size) className.splice(2, 0, `btn-${size}`);

        if (isPending) isDisabled = true;

        return <button className={className.join(' ')} type={type} disabled={isDisabled}>
            {!isPending ? children : <Spinner /> }
        </button>
    }
}