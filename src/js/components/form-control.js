import React from 'react';
import propTypes from 'prop-types'; 

export class FormGroup extends React.Component {
    render () {
        return (
            <div className='mb-3'>
                {this.props.children}
            </div>
        )
    }
}

export class Label extends React.Component {
    render() {
        let { children, className, htmlFor, isRequired } = this.props;

        if (isRequired) {
            className += 'input-required'.trim();
        }

        return <label htmlFor={htmlFor} className={className}>{children}</label>
    }
}

export class TextArea extends React.Component {
    static propTypes = {
        id: propTypes.string.isRequired,
        className: propTypes.string,
        
    };

    static defaultProps = {
        className: 'form-control'
    }

    render() {
        let { id, className, placeHolder, rows, isRequired, value, onChange } = this.props;

        return (
            <textarea id={id}
             className={className}
             value={value}
             rows={rows}
             placeholder={placeHolder}
             required={isRequired}
             onChange={(e) => onChange(e.target.value)}
            />
        )
    }
}