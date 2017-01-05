import React from 'react'

export default class ActionButton extends React.Component {
    constructor(){
        super();
        this.state = {
            loading: false
        }
    }

    mount = true

    componentWillUnmount = () => {
        this.mount = false
    }

    render() {
        const {className, action, onSuccess, onError, ...props} = this.props
        return (
            <div>
                {!this.state.loading ? <button type='button' className={className} onClick={async ()=>{
                    try{
                        this.setState({
                            loading: true
                        })
                        const response = await action()
                        if(typeof (onSuccess) == 'function'){
                            onSuccess(response)
                        }
                        if(this.mount){
                            this.setState({
                                loading: false
                            })
                        }
                    }
                    catch (e){
                        if(this.mount){
                            this.setState({
                                loading: false,
                                e
                            })
                        }
                        if(typeof (onError) == 'function'){
                            onError(e)
                        }
                    }
                }} {...props}>
                    {this.props.children}
                </button>:
                    <div className='loader-wrap'>
                        <div className='loader'>
                        </div>
                    </div>
                }
            </div>
        )
    }
}