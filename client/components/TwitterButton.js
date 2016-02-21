import React, {Component} from 'react'

import {connect} from 'react-redux'
import {intlable} from 'react-intlable'
import multidecorator from 'react-multidecorator'

const mapStateToProps = (state) => ({
    url: state.get(`url`),
    via: state.get(`via`),
    hashtag: state.get(`hashtag`)
})

const mergeProps = (stateProps, _, ownProps) => ({
    ...stateProps,
    text: ownProps.formatMessage(`text`)
})

class TwitterButton extends Component {

    render() {
        return (
            <a ref={ref => {
                this.button = ref
            }}
            />
        )
    }

    componentDidMount() {
        const {url, via, text, hashtag} = this.props

        window
            .twttr
            .widgets
            .createShareButton(
                url,
                this.button, {
                    via,
                    text,
                    hashtag
                }
            )
    }
}

export default multidecorator(
    intlable,
    connect(mapStateToProps, undefined, mergeProps)
)(TwitterButton)
