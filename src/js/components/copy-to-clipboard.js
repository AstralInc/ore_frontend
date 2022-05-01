import React from 'react';
import propTypes from 'prop-types';
import toast from 'react-hot-toast';
// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from "regenerator-runtime";

export default class ToClipboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = { copied: false }
    }

    static propTypes = {
        children:       propTypes.string.isRequired,
        clipboardVal:   propTypes.string
    };

    setStateAsync(state) {
      return new Promise((resolve) => {
        this.setState(state, resolve)
      });
    }

    async exeCpy() {
        navigator.clipboard.writeText(this.props.clipboardVal ?? this.props.children);
        await this.setStateAsync({ copied: true });
        toast.success('Copied to Clipboard!');
        setTimeout(async () => await this.setStateAsync({copied: false}), 3*1000);
    }

    render() {
        const { children } = this.props;

        return (
            <>
                <span className='copy-to-clipboard' onClick={() => this.exeCpy()}>
                    {children} 
                </span>
                <span onClick={() => this.exeCpy()}>
                    { this.state.copied ? <i className="bi bi-check"/> : <i className="bi bi-clipboard"/>}
                </span>
            </>
        );
    }
}