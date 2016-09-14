// @flow

const React = require('react');

class PetModal extends React.Component {

    props: PetModalProps;

    state: {
        inquiry: ?PetInquiry
    }

    onClick: () => void;
    onNameChange: (ev: Event) => void;
    onEmailChange: (ev: Event) => void;
    onZipChange: (ev: Event) => void;

    constructor(props: PetModalProps) {
        super(props);

        const self = this;

        this.state = {
            inquiry: null
        };

        function setQueryField(field: string, map: Function = (item) => item): (ev: Event) => void {
            return (ev: Event) => {
                if (ev.target && ev.target.value) {
                    self.setState({
                        inquiry: Object.assign({}, self.state.inquiry, {
                            [field]: map(ev.target.value)
                        })
                    });
                }
            };
        }

        this.onClick = () => {
            this.state.inquiry && props.dispatch({
                type: 'SEND_INQUIRY',
                action: props.pet.action || 'adopt',
                id: props.pet.id,
                inquiry: this.state.inquiry
            });
        };

        this.onNameChange = setQueryField('name');
        this.onEmailChange = setQueryField('email');
        this.onZipChange = setQueryField('zip', parseInt);
    }

    render() {
        const pet = this.props.pet;
        return (
            <div className='pet-shelter-pet-modal-view'>
                <div className='pet-profile-image' style={{ backgroundImage: 'url(/images/pet-' + pet.id + '.jpg)' }}/>
                <div className='pet-status'>
                    <div className='pet-name'>{ pet.name }</div>
                    <div className='pet-from'>
                        <span className='pet-from-label'>From: </span>
                        { pet.from }
                    </div>
                </div>
                <div className='pet-inquiry-form'>
                    <input
                        type='text'
                        placeholder='Name'
                        onChange={this.onNameChange}
                    />
                    <input
                        type='text'
                        placeholder='Email'
                        onChange={this.onEmailChange}
                    />
                    <input
                        type='number'
                        placeholder='Zip'
                        onChange={this.onZipChange}
                    />
                    <button type='button'
                            onClick={this.onClick}>
                        Send Inquiry
                    </button>
                </div>
            </div>
        );
    }
}

module.exports = function(pet: Pet, dispatch: PetShelterDispatch) {
    return <PetModal pet={pet} dispatch={dispatch}/>;
}
