// @flow

const React = require('react');

type ModalProps = {
    dispatch: PetShelterDispatch;
    pet: Pet;
};
type ModalState = {
    inquiry: ?PetInquiry;
};

class PetModal extends React.Component {

    props: ModalProps;
    state: ModalState;
    onSubmitClick: () => void;

    constructor(props: ModalProps) {
        super(props);

        this.state = { inquiry: null };

        this.onSubmitClick = () => {
            this.state.inquiry && props.dispatch({
                type: 'SEND_INQUIRY',
                action: props.pet.action || 'adopt',
                id: props.pet.id,
                inquiry: this.state.inquiry
            });
        };
    }

    render() {
        return (
            <div className='pet-shelter-modal-view'>
                <div className='pet-inquiry-form'>
                    <button type='button'
                            onClick={this.onSubmitClick}>
                        Send Inquiry
                    </button>
                </div>
            </div>
        );
    }
}

module.exports = PetModal;
